/**
 * 迁移脚本：将当前联系页默认内容写入 Sanity 单例 contactPage
 *
 * 用法：
 * SANITY_WRITE_TOKEN=xxx node scripts/migrate-contact-content.mjs
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
  console.log('\n🔄 开始迁移联系页内容到 Sanity 单例 contactPage...\n');

  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    address_zh: '北京市朝阳区东三环中路1号\n环球金融中心东楼201',
    address_en: 'Room 201, East Tower,\nGlobal Financial Center,\nNo. 1 East Third Ring Road,\nChaoyang District, Beijing 100020',
    hours_zh: '周二至周六: 10:00 - 19:00\n周日及周一: 闭馆',
    hours_en: 'Tuesday - Saturday: 10:00 - 19:00\nSunday & Monday: Closed',
    phone: '+86 10 56612254',
    email: 'info@kwartcenter.com',
    wechatDescription_zh: '请扫描二维码来关注我们的微信公众号\n或者在微信中搜索我们的公众号名称：KWA金杜艺术中心',
    wechatDescription_en: 'Scan the QR code to follow our WeChat account\nor search for: KWA艺术中心',
    xiaohongshuUrl: 'https://www.xiaohongshu.com/user/profile/631072a1000000000f004e85',
    douyinUrl: 'https://www.douyin.com/user/MS4wLjABAAAAJUfo6FESVKP4HTbA1VIwtxkA-VCoFvTyCWKxDf5M6NuCmJxZuhXMXYU7A8WrLzcg',
    weiboUrl: 'https://weibo.com/u/6029611887',
  });

  console.log('✅ 迁移完成：contactPage 已写入/更新');
  console.log('👉 你现在可以在 Studio 的“联系页面”单例中继续编辑内容。\n');
}

migrate().catch((error) => {
  console.error('❌ 迁移失败：', error.message);
  process.exit(1);
});
