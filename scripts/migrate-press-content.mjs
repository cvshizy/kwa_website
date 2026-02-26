/**
 * 迁移脚本：将新闻的摘要和正文从纯文本（string）转换为 Portable Text（block array）
 *
 * SANITY_WRITE_TOKEN=xxx node scripts/migrate-press-content.mjs
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

function textToPortableText(text) {
    if (!text || typeof text !== 'string') return [];
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
    return paragraphs.map(paragraph => ({
        _type: 'block',
        _key: randomUUID().replace(/-/g, '').substring(0, 12),
        style: 'normal',
        markDefs: [],
        children: [{
            _type: 'span',
            _key: randomUUID().replace(/-/g, '').substring(0, 12),
            text: paragraph.replace(/\n/g, ' '),
            marks: [],
        }],
    }));
}

async function migrate() {
    console.log('\n🔄 开始迁移新闻摘要和正文到 Portable Text...\n');

    const pressItems = await client.fetch(
        `*[_type == "press"]{
      _id,
      title_zh,
      summary_en,
      summary_zh,
      content_en,
      content_zh
    }`
    );

    console.log(`📋 找到 ${pressItems.length} 条新闻\n`);

    let migrated = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < pressItems.length; i++) {
        const item = pressItems[i];
        const progress = `[${i + 1}/${pressItems.length}]`;

        try {
            const fields = ['summary_en', 'summary_zh', 'content_en', 'content_zh'];
            const patch = {};
            let needsMigration = false;

            for (const field of fields) {
                const val = item[field];
                if (typeof val === 'string') {
                    patch[field] = textToPortableText(val);
                    needsMigration = true;
                } else if (Array.isArray(val)) {
                    // Already Portable Text
                }
            }

            if (!needsMigration) {
                console.log(`${progress} ⏭  已是 Portable Text 或为空: ${item.title_zh}`);
                skipped++;
                continue;
            }

            await client.patch(item._id).set(patch).commit();
            console.log(`${progress} ✅ 已迁移: ${item.title_zh}`);
            migrated++;
        } catch (error) {
            console.error(`${progress} ❌ 失败: ${item.title_zh} - ${error.message}`);
            failed++;
        }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 迁移完成！`);
    console.log(`   ✅ 已迁移: ${migrated}`);
    console.log(`   ⏭  跳过: ${skipped}`);
    console.log(`   ❌ 失败: ${failed}`);
    console.log(`${'='.repeat(50)}\n`);
}

migrate();
