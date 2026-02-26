/**
 * 迁移脚本：将展览描述从纯文本（string）转换为 Portable Text（block array）
 * 这样就不会丢失已有的描述数据
 *
 * SANITY_WRITE_TOKEN=xxx node scripts/migrate-descriptions.mjs
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

/**
 * 将纯文本字符串转换为 Portable Text block array
 * 每个段落（空行分隔）变成一个 block，每行变成 children span
 */
function textToPortableText(text) {
    if (!text || typeof text !== 'string') return [];

    // 按段落分割（两个换行或一个换行）
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim());

    return paragraphs.map(paragraph => ({
        _type: 'block',
        _key: randomUUID().replace(/-/g, '').substring(0, 12),
        style: 'normal',
        markDefs: [],
        children: paragraph.split('\n').flatMap((line, i, arr) => {
            const result = [{
                _type: 'span',
                _key: randomUUID().replace(/-/g, '').substring(0, 12),
                text: line,
                marks: [],
            }];
            // 段内换行不需要额外处理，Portable Text 会自动处理
            return result;
        }),
    }));
}

async function migrate() {
    console.log('\n🔄 开始迁移展览描述到 Portable Text...\n');

    // 获取所有展览的描述字段（原始格式）
    const exhibitions = await client.fetch(
        `*[_type == "exhibition"]{
      _id,
      title_zh,
      description_en,
      description_zh
    }`
    );

    console.log(`📋 找到 ${exhibitions.length} 个展览\n`);

    let migrated = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < exhibitions.length; i++) {
        const ex = exhibitions[i];
        const progress = `[${i + 1}/${exhibitions.length}]`;

        try {
            const descEn = ex.description_en;
            const descZh = ex.description_zh;

            // 检查是否已经是 array 格式（已迁移过）
            if (Array.isArray(descEn) || Array.isArray(descZh)) {
                console.log(`${progress} ⏭  已是 Portable Text: ${ex.title_zh}`);
                skipped++;
                continue;
            }

            // 如果描述为空，跳过
            if (!descEn && !descZh) {
                console.log(`${progress} ⏭  无描述: ${ex.title_zh}`);
                skipped++;
                continue;
            }

            const patch = {};
            if (typeof descEn === 'string') {
                patch.description_en = textToPortableText(descEn);
            }
            if (typeof descZh === 'string') {
                patch.description_zh = textToPortableText(descZh);
            }

            await client.patch(ex._id).set(patch).commit();
            console.log(`${progress} ✅ 已迁移: ${ex.title_zh}`);
            migrated++;
        } catch (error) {
            console.error(`${progress} ❌ 失败: ${ex.title_zh} - ${error.message}`);
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
