/**
 * 迁移脚本：将首页 Hero 与 About 模块文案写入 Sanity 单例 homePage
 *
 * 用法：
 * SANITY_WRITE_TOKEN=xxx node scripts/migrate-home-content.mjs
 */

import { createClient } from '@sanity/client';

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

async function migrate() {
  console.log('\n🔄 开始迁移首页文案到 Sanity 单例 homePage...\n');

  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroTitle_zh: '在城市中心，观看当代艺术最安静的力量',
    heroTitle_en: 'A quiet force of contemporary art\nin the center of the city',
    heroSubtitle_zh: 'KWA金杜艺术中心持续呈现具有思想深度与时代感的展览与公共项目。',
    heroSubtitle_en: 'K&W Art Center presents exhibitions and public programs\nwith critical depth and contemporary relevance.',
    aboutTitle_zh: '关于 KWA金杜艺术中心',
    aboutTitle_en: 'About K&W Art Center',
    aboutSubtitle_zh: '自2016年以来，我们在北京CBD持续推动当代艺术的展示、研究与公共对话。',
    aboutSubtitle_en: 'Since 2016, we have advanced contemporary art presentation, research, and public dialogue\nin Beijing CBD.',
  });

  console.log('✅ 迁移完成：homePage 已写入/更新');
  console.log('👉 你现在可以在 Studio 的“首页内容”单例中继续编辑文案。\n');
}

migrate().catch((error) => {
  console.error('❌ 迁移失败：', error.message);
  process.exit(1);
});
