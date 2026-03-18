import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const locales = ['en', 'zh'] as const;

type WebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
  document?: {
    _type?: string;
    slug?: { current?: string } | string;
  };
};

function localizedPath(path: string) {
  return locales.map((locale) => `/${locale}${path}`);
}

function revalidateMany(paths: string[], sink: Set<string>) {
  for (const path of paths) {
    revalidatePath(path);
    sink.add(path);
  }
}

function extractTypeAndSlug(body: WebhookBody) {
  const type = body._type || body.document?._type;
  const directSlug =
    typeof body.slug === 'string' ? body.slug : body.slug?.current;
  const nestedSlug =
    typeof body.document?.slug === 'string'
      ? body.document.slug
      : body.document?.slug?.current;

  return {
    type,
    slug: directSlug || nestedSlug,
  };
}

function revalidateAllCorePaths(sink: Set<string>) {
  revalidateMany(localizedPath(''), sink);
  revalidateMany(localizedPath('/about'), sink);
  revalidateMany(localizedPath('/contact'), sink);
  revalidateMany(localizedPath('/our-team'), sink);
  revalidateMany(localizedPath('/exhibitions'), sink);
  revalidateMany(localizedPath('/press'), sink);
  revalidatePath('/sitemap.xml');
  sink.add('/sitemap.xml');
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: 'SANITY_REVALIDATE_SECRET is not set' },
      { status: 500 }
    );
  }

  const incomingSecret =
    request.nextUrl.searchParams.get('secret') ||
    request.headers.get('x-revalidate-secret');

  if (incomingSecret !== secret) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 });
  }

  let body: WebhookBody = {};
  try {
    body = await request.json();
  } catch {
    // Allow empty payloads; we'll fallback to broad revalidation.
  }

  const { type, slug } = extractTypeAndSlug(body);
  const revalidated = new Set<string>();

  switch (type) {
    case 'homePage':
      revalidateMany(localizedPath(''), revalidated);
      break;
    case 'aboutPage':
      revalidateMany(localizedPath('/about'), revalidated);
      break;
    case 'contactPage':
      revalidateMany(localizedPath('/contact'), revalidated);
      break;
    case 'teamMember':
      revalidateMany(localizedPath('/our-team'), revalidated);
      break;
    case 'exhibition':
      revalidateMany(localizedPath('/exhibitions'), revalidated);
      revalidateMany(localizedPath(''), revalidated);
      if (slug) {
        revalidateMany(localizedPath(`/exhibitions/${slug}`), revalidated);
      }
      revalidatePath('/sitemap.xml');
      revalidated.add('/sitemap.xml');
      break;
    case 'press':
      revalidateMany(localizedPath('/press'), revalidated);
      if (slug) {
        revalidateMany(localizedPath(`/press/${slug}`), revalidated);
      }
      revalidatePath('/sitemap.xml');
      revalidated.add('/sitemap.xml');
      break;
    default:
      revalidateAllCorePaths(revalidated);
      break;
  }

  return NextResponse.json({
    ok: true,
    type: type || null,
    slug: slug || null,
    revalidated: [...revalidated],
  });
}

