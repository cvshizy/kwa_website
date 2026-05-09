/**
 * 迁移脚本：将 contactPage 的文本字段升级为 Portable Text，并保留现有内容。
 *
 * 用法：
 * SANITY_WRITE_TOKEN=xxx node scripts/migrate-contact-richtext.mjs
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

const fallbackContactContent = {
  address_zh: '北京市朝阳区东三环中路1号\n环球金融中心东楼201',
  address_en: 'Room 201, East Tower,\nGlobal Financial Center,\nNo. 1 East Third Ring Road,\nChaoyang District, Beijing 100020',
  hours_zh: '周一至周六: 10:00 - 19:00\n周日: 闭馆',
  hours_en: 'Monday - Saturday: 10:00 - 19:00\nSunday: Closed',
  wechatDescription_zh: '请扫描二维码来关注我们的微信公众号\n或者在微信中搜索我们的公众号名称：KWA金杜艺术中心',
  wechatDescription_en: 'Scan the QR code to follow our WeChat account\nor search for: KWA Art Center',
};

const richTextFields = [
  'address_zh',
  'address_en',
  'hours_zh',
  'hours_en',
  'wechatDescription_zh',
  'wechatDescription_en',
];

function key() {
  return randomUUID().replace(/-/g, '').slice(0, 12);
}

function textToPortableText(text) {
  if (!text || typeof text !== 'string') return [];

  return text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: key(),
          text: paragraph.replace(/\n/g, '\n'),
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
  console.log('\n🔄 开始升级联系页字段为支持对齐方式的 Portable Text...\n');

  const existing = await client.fetch(
    `*[_type == "contactPage" && _id == "contactPage"][0]{
      _id,
      address_zh,
      address_en,
      hours_zh,
      hours_en,
      wechatDescription_zh,
      wechatDescription_en
    }`
  );

  if (!existing?._id) {
    console.error('❌ 未找到 contactPage 单例，请先运行 scripts/migrate-contact-content.mjs');
    process.exit(1);
  }

  const patch = {};
  for (const field of richTextFields) {
    patch[field] = normalizePortableText(existing[field], fallbackContactContent[field]);
  }

  await client.patch('contactPage').set(patch).commit();

  console.log('✅ 迁移完成：联系页地址、营业时间、微信说明已升级为 Portable Text。');
  console.log('👉 现在可以在 Studio 中给这些段落设置左对齐 / 居中 / 右对齐 / 两端对齐。\n');
}

migrate().catch((error) => {
  console.error('❌ 迁移失败：', error.message);
  process.exit(1);
});
