/**
 * 迁移脚本：将 aboutPage 从纯文本升级为 Portable Text（保留现有内容）
 *
 * 用法：
 * SANITY_WRITE_TOKEN=xxx node scripts/migrate-about-content.mjs
 */

import { createClient } from '@sanity/client';
import { randomUUID } from 'crypto';

const client = createClient({
  projectId: 'qiafoam7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ 请设置 SANITY_WRITE_TOKEN');
  process.exit(1);
}

const aboutContent = {
  zh: `KWA金杜艺术中心于2016年10月20日在北京CBD环球金融中心正式开幕，由金杜律师事务所鼎力支持创建。

艺术中心致力于呈现专业的当代艺术展览，并支持金杜基金会收藏国内外优秀艺术家的作品。我们通过跨学科合作，涉足时尚、设计和建筑等领域，开展多元化的艺术教育项目和课程，培养艺术爱好者，推广高品质的美学鉴赏。

作为中国当代文化的有力传播者，KWA金杜艺术中心通过在全球办公室举办展览，以及与国际艺术机构合作，不断提升中国当代艺术的国际影响力。

地址：北京市朝阳区东三环中路1号环球金融中心东楼201室 100020
营业时间：周二至周六 10:00-19:00；周日及周一闭馆
联系方式：+86 10 56612254 | info@kwmartcenter.com`,
  en: `K&W Art Center officially opened on October 20, 2016, in the Global Financial Center within Beijing's CBD. The institution was founded with support from King & Wood Mallesons law firm.

The center is dedicated to presenting professional contemporary art exhibitions and supporting the K&W Foundation's collection of outstanding domestic and international artists' works. Through cross-disciplinary collaboration in fashion, design, and architecture, we conduct diverse educational programs and courses to cultivate art enthusiasts and promote high-quality aesthetic appreciation.

As a strong communicator of Chinese contemporary culture internationally, K&W Art Center enhances the global influence of Chinese contemporary art through exhibitions at our worldwide offices and collaborations with international art institutions.

Address: Room 201, East Tower, Global Financial Center, No. 1 East Third Ring Road, Chaoyang District, Beijing 100020
Hours: Tuesday-Saturday 10:00-19:00; Closed Sunday-Monday
Contact: +86 10 56612254 | info@kwmartcenter.com`,
};

function textToPortableText(text) {
  if (!text || typeof text !== 'string') return [];
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
  return paragraphs.map((paragraph) => ({
    _type: 'block',
    _key: randomUUID().replace(/-/g, '').slice(0, 12),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: randomUUID().replace(/-/g, '').slice(0, 12),
        text: paragraph.replace(/\n/g, ' '),
        marks: [],
      },
    ],
  }));
}

function normalizePortableText(value, fallbackText) {
  if (Array.isArray(value) && value.length > 0) return value;
  if (typeof value === 'string' && value.trim()) return textToPortableText(value);
  return textToPortableText(fallbackText);
}

async function migrate() {
  console.log('\n🔄 开始迁移 About 页到 Portable Text（aboutPage 单例）...\n');

  const existing = await client.fetch(
    `*[_type == "aboutPage" && _id == "aboutPage"][0]{
      _id,
      content_zh,
      content_en
    }`
  );

  const payload = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    content_zh: normalizePortableText(existing?.content_zh, aboutContent.zh),
    content_en: normalizePortableText(existing?.content_en, aboutContent.en),
  };

  await client.createOrReplace(payload);

  console.log('✅ 迁移完成：aboutPage 已升级为 Portable Text，并保留原有文案。');
  console.log('👉 你现在可以在 Studio 的“关于页面”单例中继续编辑内容。\n');
}

migrate().catch((error) => {
  console.error('❌ 迁移失败：', error.message);
  process.exit(1);
});
