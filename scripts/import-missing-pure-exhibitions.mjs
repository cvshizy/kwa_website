/**
 * 补导入：原站展览分类中缺失的 7 个“纯展览”到 Sanity
 *
 * 使用：
 *   SANITY_WRITE_TOKEN=xxx node scripts/import-missing-pure-exhibitions.mjs
 */

import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';
import { Buffer } from 'buffer';
import path from 'path';

const client = createClient({
  projectId: 'qiafoam7',
  dataset: 'production',
  apiVersion: '2025-02-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ 请设置 SANITY_WRITE_TOKEN');
  process.exit(1);
}

const targets = [
  {
    slug: 'shanshui-group-exhibition',
    url: 'https://kwmartcenter.com/2023/07/29/%e5%b1%b1%e6%b0%b4-%e8%89%ba%e6%9c%af%e5%ae%b6%e8%81%94%e5%b1%95/',
    title_en: 'Landscape - Group Exhibition',
    artist_zh: '群展',
    artist_en: 'Group Exhibition',
  },
  {
    slug: 'golden-notebook-group-exhibition',
    url: 'https://kwmartcenter.com/2023/07/29/%e9%87%91%e8%89%b2%e7%ac%94%e8%ae%b0-%e8%89%ba%e6%9c%af%e5%ae%b6/',
    title_en: 'The Golden Notebook - Group Exhibition',
    artist_zh: '群展',
    artist_en: 'Group Exhibition',
  },
  {
    slug: 'crossing-non-figurative-research-exhibition',
    url: 'https://kwmartcenter.com/2023/07/29/%e6%b8%a1-%e9%9d%9e%e5%85%b7%e8%b1%a1%e7%a0%94%e7%a9%b6%e5%b1%95/',
    title_en: 'Crossing - Non-Figurative Research Exhibition',
    artist_zh: '群展',
    artist_en: 'Group Exhibition',
  },
  {
    slug: 'changing-realms-zou-cao-solo-exhibition',
    url: 'https://kwmartcenter.com/2023/07/29/%e6%8d%a2%e5%a2%83-%e9%82%b9%e6%93%8d%e4%b8%aa%e5%b1%95/',
    title_en: 'Changing Realms - Zou Cao Solo Exhibition',
    artist_zh: '邹操',
    artist_en: 'Zou Cao',
  },
  {
    slug: 'autumn-harvest-post-90s-female-artists',
    url: 'https://kwmartcenter.com/2021/10/16/%e7%a7%8b%e5%ae%9e-90%e5%90%8e%e5%a5%b3%e6%80%a7%e8%89%ba%e6%9c%af%e5%ae%b6%e7%be%a4/',
    title_en: 'Autumn Harvest - Post-90s Female Artists Group Exhibition',
    artist_zh: '群展',
    artist_en: 'Group Exhibition',
  },
  {
    slug: 'zhao-gang-comfortably-dumb-kwm-collection',
    url: 'https://kwmartcenter.com/2018/03/18/zhao-gang-comfortably-dumb-works-from-the-kwm-collection/',
    title_en: 'Comfortably Dumb - Works from the KWM Collection',
    artist_zh: '赵刚',
    artist_en: 'Zhao Gang',
  },
  {
    slug: 'plants-balloons-and-bell-jars',
    url: 'https://kwmartcenter.com/2018/03/18/plants-balloons-and-bell-jars/',
    title_en: 'Plants, Balloons and Bell Jars',
    artist_zh: '茹小凡',
    artist_en: 'Ru Xiaofan',
  },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeHtmlEntities(str = '') {
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(html = '') {
  return decodeHtmlEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[[^\]]+\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseDate(dateStr) {
  // 支持：2023年04月14日 / 2021.10.23 / 2017-12-15
  const m = dateStr.match(/(20\d{2})[.\-/年](\d{1,2})[.\-/月](\d{1,2})/);
  if (!m) return null;
  const y = m[1];
  const mo = m[2].padStart(2, '0');
  const d = m[3].padStart(2, '0');
  return `${y}-${mo}-${d}`;
}

function extractDateRange(text, fallbackDate) {
  const candidates = [];

  const cn = [...text.matchAll(/(20\d{2}年\d{1,2}月\d{1,2}日)/g)].map((m) => m[1]);
  const dot = [...text.matchAll(/(20\d{2}\.\d{1,2}\.\d{1,2})/g)].map((m) => m[1]);
  const dash = [...text.matchAll(/(20\d{2}-\d{1,2}-\d{1,2})/g)].map((m) => m[1]);
  candidates.push(...cn, ...dot, ...dash);

  const parsed = candidates.map(parseDate).filter(Boolean);
  if (parsed.length >= 2) {
    return { startDate: parsed[0], endDate: parsed[1] };
  }

  const fallback = (fallbackDate || '').slice(0, 10);
  return { startDate: fallback, endDate: fallback };
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            Accept: 'application/json',
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            fetchJSON(res.headers.location).then(resolve).catch(reject);
            return;
          }
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          });
          res.on('error', reject);
        }
      )
      .on('error', reject);
  });
}

function fetchBinary(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod
      .get(
        url,
        {
          headers: { 'User-Agent': 'Mozilla/5.0' },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            const redirectUrl = res.headers.location.startsWith('http')
              ? res.headers.location
              : `https://kwmartcenter.com${res.headers.location}`;
            fetchBinary(redirectUrl).then(resolve).catch(reject);
            return;
          }
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => resolve(Buffer.concat(chunks)));
          res.on('error', reject);
        }
      )
      .on('error', reject);
  });
}

async function uploadImageToSanity(imageUrl) {
  if (!imageUrl) return null;
  let finalUrl = imageUrl;
  if (finalUrl.startsWith('//')) finalUrl = `https:${finalUrl}`;
  if (finalUrl.startsWith('/')) finalUrl = `https://kwmartcenter.com${finalUrl}`;

  const imageBuffer = await fetchBinary(finalUrl);
  const filename = path.basename(new URL(finalUrl).pathname) || 'image.jpg';
  const asset = await client.assets.upload('image', imageBuffer, { filename });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  };
}

function extractImageUrls(contentHTML = '') {
  const urls = new Set();
  const imgRe = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = imgRe.exec(contentHTML)) !== null) {
    const src = m[1];
    if (!src) continue;
    if (src.includes('logo') || src.includes('icon') || src.includes('wechat') || src.includes('qr')) {
      continue;
    }
    urls.add(src);
  }
  return [...urls];
}

async function fetchPostByUrl(postUrl) {
  const slugRaw = postUrl.replace(/\/+$/, '').split('/').pop();
  const encodedSlug = encodeURIComponent(slugRaw);
  const apiUrl = `https://kwmartcenter.com/wp-json/wp/v2/posts?slug=${encodedSlug}&_embed=1`;
  const arr = await fetchJSON(apiUrl);
  return arr?.[0] || null;
}

async function main() {
  console.log(`\n🚀 开始补导入 ${targets.length} 个纯展览...\n`);

  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const progress = `[${i + 1}/${targets.length}]`;
    try {
      const exists = await client.fetch(
        `*[_type == "exhibition" && slug.current == $slug][0]{_id}`,
        { slug: t.slug }
      );
      if (exists?._id) {
        console.log(`${progress} ⏭️  已存在，跳过: ${t.slug}`);
        skipped++;
        continue;
      }

      const post = await fetchPostByUrl(t.url);
      if (!post) {
        console.log(`${progress} ❌ 未找到原站文章: ${t.url}`);
        failed++;
        continue;
      }

      const title_zh = decodeHtmlEntities(post.title?.rendered || '').trim();
      const contentHTML = post.content?.rendered || '';
      const plainText = stripTags(contentHTML);
      const { startDate, endDate } = extractDateRange(plainText, post.date);

      const description_zh = plainText
        ? [
            {
              _type: 'block',
              style: 'normal',
              children: [{ _type: 'span', text: plainText.slice(0, 2000) }],
            },
          ]
        : [];

      const description_en = [];

      const imageUrls = extractImageUrls(contentHTML);
      const featuredUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || imageUrls[0] || null;
      const coverImage = await uploadImageToSanity(featuredUrl);

      if (!coverImage) {
        console.log(`${progress} ❌ 封面图上传失败，跳过: ${title_zh}`);
        failed++;
        continue;
      }

      const gallery = [];
      for (const img of imageUrls.slice(0, 8)) {
        try {
          const uploaded = await uploadImageToSanity(img);
          if (uploaded) gallery.push(uploaded);
        } catch {
          // ignore single image failure
        }
        await delay(150);
      }

      const doc = {
        _type: 'exhibition',
        title_zh,
        title_en: t.title_en,
        slug: { _type: 'slug', current: t.slug },
        artist_zh: t.artist_zh,
        artist_en: t.artist_en,
        description_zh,
        description_en,
        startDate,
        endDate,
        status: 'past',
        coverImage,
        images: gallery,
        featured: false,
      };

      await client.create(doc);
      imported++;
      console.log(`${progress} ✅ 已导入: ${title_zh} (${startDate} ~ ${endDate})`);
      await delay(300);
    } catch (e) {
      failed++;
      console.log(`${progress} ❌ 失败: ${t.slug} - ${e.message}`);
    }
  }

  console.log('\n=================================');
  console.log('🎉 补导入完成');
  console.log(`✅ 成功: ${imported}`);
  console.log(`⏭️  跳过: ${skipped}`);
  console.log(`❌ 失败: ${failed}`);
  console.log('=================================\n');
}

main().catch((e) => {
  console.error('❌ 脚本异常:', e);
  process.exit(1);
});

