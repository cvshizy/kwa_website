#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

REMOTE_HOST="${CN_DEPLOY_HOST:-39.105.201.253}"
REMOTE_USER="${CN_DEPLOY_USER:-root}"
REMOTE_PORT="${CN_DEPLOY_PORT:-22}"
REMOTE_APP_NAME="${CN_DEPLOY_APP_NAME:-kwa_website}"
REMOTE_PM2_NAME="${CN_DEPLOY_PM2_NAME:-kwa-cn}"
REMOTE_SITE_HOST="${CN_DEPLOY_SITE_HOST:-kwartcenter.com}"
REMOTE_RELEASES_DIR="${CN_DEPLOY_RELEASES_DIR:-/var/www/releases}"
REMOTE_CURRENT_LINK="${CN_DEPLOY_CURRENT_LINK:-/var/www/kwa_current}"
REMOTE_COMPAT_LINK="${CN_DEPLOY_COMPAT_LINK:-/var/www/kwa_website}"
REMOTE_SHARED_DIR="${CN_DEPLOY_SHARED_DIR:-/var/www/shared/kwa_website}"
REMOTE_KEEP_RELEASES="${CN_DEPLOY_KEEP_RELEASES:-5}"
DEPLOY_REF="${DEPLOY_REF:-HEAD}"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree has uncommitted changes. Commit or stash before deploying." >&2
  exit 1
fi

if ! git -c http.version=HTTP/1.1 fetch origin main --quiet; then
  echo "Warning: failed to refresh origin/main, using local origin/main ref." >&2
fi

local_sha="$(git rev-parse "$DEPLOY_REF")"
origin_sha="$(git rev-parse --verify origin/main)"

if [[ "$DEPLOY_REF" == "HEAD" && "$local_sha" != "$origin_sha" ]]; then
  echo "HEAD does not match origin/main. Push main before deploying CN." >&2
  exit 1
fi

short_sha="$(git rev-parse --short "$local_sha")"
timestamp="$(date +%Y%m%d%H%M%S)"
release_id="${timestamp}-${short_sha}"
archive_path="$(mktemp "/tmp/${REMOTE_APP_NAME}-${release_id}.XXXXXX.tar.gz")"
control_path="$(mktemp -u "/tmp/${REMOTE_APP_NAME}-ssh-${release_id}.XXXXXX")"
remote_archive="/tmp/${REMOTE_APP_NAME}-${release_id}.tar.gz"
ssh_target="${REMOTE_USER}@${REMOTE_HOST}"

cleanup() {
  rm -f "$archive_path"
  ssh -S "$control_path" -O exit -p "$REMOTE_PORT" "$ssh_target" >/dev/null 2>&1 || true
}
trap cleanup EXIT

git archive --format=tar.gz --output "$archive_path" "$local_sha"

ssh \
  -o StrictHostKeyChecking=no \
  -o ControlMaster=yes \
  -o ControlPersist=60 \
  -o ControlPath="$control_path" \
  -p "$REMOTE_PORT" \
  "$ssh_target" \
  -fN

scp \
  -o StrictHostKeyChecking=no \
  -o ControlPath="$control_path" \
  -P "$REMOTE_PORT" \
  "$archive_path" \
  "${ssh_target}:${remote_archive}"

ssh \
  -o StrictHostKeyChecking=no \
  -o ControlPath="$control_path" \
  -p "$REMOTE_PORT" \
  "$ssh_target" \
  "DEPLOY_APP_NAME='$REMOTE_APP_NAME' \
   DEPLOY_PM2_NAME='$REMOTE_PM2_NAME' \
   DEPLOY_SITE_HOST='$REMOTE_SITE_HOST' \
   DEPLOY_RELEASE_ID='$release_id' \
   DEPLOY_ARCHIVE='$remote_archive' \
   DEPLOY_RELEASES_DIR='$REMOTE_RELEASES_DIR' \
   DEPLOY_CURRENT_LINK='$REMOTE_CURRENT_LINK' \
   DEPLOY_COMPAT_LINK='$REMOTE_COMPAT_LINK' \
   DEPLOY_SHARED_DIR='$REMOTE_SHARED_DIR' \
   DEPLOY_KEEP_RELEASES='$REMOTE_KEEP_RELEASES' \
   bash -s" <<'REMOTE'
set -euo pipefail

release_dir="$DEPLOY_RELEASES_DIR/${DEPLOY_APP_NAME}-${DEPLOY_RELEASE_ID}"
shared_env="$DEPLOY_SHARED_DIR/.env.local"
current_env="$DEPLOY_CURRENT_LINK/.env.local"

mkdir -p "$DEPLOY_RELEASES_DIR" "$DEPLOY_SHARED_DIR"

if [[ ! -f "$shared_env" ]]; then
  if [[ -f "$current_env" ]]; then
    cp "$current_env" "$shared_env"
  else
    echo "Missing shared env file at $shared_env" >&2
    exit 1
  fi
fi

rm -rf "$release_dir"
mkdir -p "$release_dir"
tar xzf "$DEPLOY_ARCHIVE" -C "$release_dir"
rm -f "$DEPLOY_ARCHIVE"

cp "$shared_env" "$release_dir/.env.local"

cd "$release_dir"
NPM_CONFIG_FUND=false NPM_CONFIG_AUDIT=false npm ci
npm run build

ln -sfn "$release_dir" "$DEPLOY_CURRENT_LINK"
ln -sfn "$DEPLOY_CURRENT_LINK" "$DEPLOY_COMPAT_LINK"

pm2 delete "$DEPLOY_PM2_NAME" >/dev/null 2>&1 || true
pm2 start npm --name "$DEPLOY_PM2_NAME" --cwd "$DEPLOY_CURRENT_LINK" -- start
pm2 save >/dev/null

for _ in $(seq 1 20); do
  if curl -fsSI --max-time 8 http://127.0.0.1:3000/zh >/dev/null; then
    break
  fi
  sleep 1
done

curl -fsSI --max-time 8 http://127.0.0.1:3000/zh >/dev/null
curl -fsSI -k --max-time 8 https://127.0.0.1/zh -H "Host: $DEPLOY_SITE_HOST" >/dev/null

mapfile -t releases < <(find "$DEPLOY_RELEASES_DIR" -maxdepth 1 -mindepth 1 -type d -name "${DEPLOY_APP_NAME}-*" | sort)

if (( ${#releases[@]} > DEPLOY_KEEP_RELEASES )); then
  remove_count=$(( ${#releases[@]} - DEPLOY_KEEP_RELEASES ))
  for ((i = 0; i < remove_count; i++)); do
    if [[ "${releases[$i]}" != "$release_dir" ]]; then
      rm -rf "${releases[$i]}"
    fi
  done
fi

echo "Release $DEPLOY_RELEASE_ID deployed to $DEPLOY_CURRENT_LINK"
REMOTE

echo "CN deploy complete: $release_id"
