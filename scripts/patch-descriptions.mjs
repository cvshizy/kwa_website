/**
 * 补丁脚本：为已导入的展览补充描述
 *
 * 使用方法:
 *   SANITY_WRITE_TOKEN=你的Token node scripts/patch-descriptions.mjs
 */

import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';
import https from 'https';
import http from 'http';

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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        const get = url.startsWith('https') ? https.get : http.get;
        get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                fetchHTML(res.headers.location).then(resolve).catch(reject);
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
            res.on('error', reject);
        }).on('error', reject);
    });
}

function extractDescription(html) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // 旧网站的内容在 div.single-content 里
    const contentEl = doc.querySelector('.single-content');
    if (!contentEl) return '';

    const paragraphs = contentEl.querySelectorAll('p');
    const texts = [];
    for (const p of paragraphs) {
        const text = p.textContent.trim().replace(/\u00a0/g, ' ');
        // 跳过太短的、页脚内容、日期行
        if (text.length < 5) continue;
        if (text.includes('扫描二维码') || text.includes('订阅') || text.includes('关注我们')) continue;
        texts.push(text);
    }

    return texts.join('\n\n');
}

// 展览 slug → 中文页面 URL 映射
const slugToUrl = {
    'kwm-closure-announcement': 'https://kwmartcenter.com/zh/2025/09/10/%e9%87%91%e6%9d%9c%e8%89%ba%e6%9c%af%e4%b8%ad%e5%bf%83%e9%97%ad%e9%a6%86%e5%85%ac%e5%91%8a/',
    'light-etchings-michael-kenna': 'https://kwmartcenter.com/zh/2025/06/27/%e3%80%8c%e8%9a%80%e5%85%89%e9%9b%86%e3%80%8d-%e8%bf%88%e5%85%8b%e5%b0%94%c2%b7%e8%82%af%e7%ba%b3%e6%91%84%e5%bd%b1%e4%bd%9c%e5%93%81%e5%b1%95/',
    'zhang-wei-afterglow': 'https://kwmartcenter.com/zh/2025/05/14/%e5%bc%a0%e4%bc%9f%ef%bc%9a%e3%80%8c%e4%bd%99%e5%85%b4%e3%80%8d/',
    'poetry-womens-art-exhibition': 'https://kwmartcenter.com/zh/2025/03/20/%e3%80%8c%e8%af%97%e3%80%8d-%e5%a5%b3%e6%80%a7%e8%89%ba%e6%9c%af%e5%b1%95/',
    'resonance-and-renewal-8th-anniversary': 'https://kwmartcenter.com/zh/2025/01/02/%e3%80%8c%e5%85%b1%e9%b8%a3%e4%b8%8e%e6%96%b0%e7%94%9f%e3%80%8d-%e9%87%91%e6%9d%9c%e8%89%ba%e6%9c%af%e4%b8%ad%e5%bf%83%e5%85%ab%e5%91%a8%e5%b9%b4%e7%89%b9%e5%b1%95/',
    'polyphony-and-soliloquy': 'https://kwmartcenter.com/zh/2025/01/02/%e3%80%8c%e5%a4%8d%e8%b0%83%e4%b8%8e%e7%8b%ac%e8%af%ad%e3%80%8d-%e5%bd%93%e4%bb%a3%e8%89%ba%e6%9c%af%e4%bd%9c%e5%93%81%e5%b1%95/',
    'the-blue-room-ai-art': 'https://kwmartcenter.com/zh/2024/09/19/%e3%80%8c%e8%93%9d%e8%89%b2%e6%88%bf%e9%97%b4%e3%80%8d-%e4%ba%ba%e5%b7%a5%e6%99%ba%e8%83%bd%e7%9a%84%e8%89%ba%e6%9c%af%e6%8e%a2%e7%b4%a2/',
    'yggdrasill-world-tree': 'https://kwmartcenter.com/zh/2024/07/27/%e3%80%8c%e4%b8%96%e7%95%8c%e6%a0%91%e3%80%8d-%e5%b0%a4%e5%85%8b%e7%89%b9%e6%8b%89%e5%b8%8c%e5%b0%94/',
    'prix-pictet-humanity': 'https://kwmartcenter.com/zh/2024/05/23/%e5%8d%b3%e5%b0%86%e5%b1%95%e5%87%ba%ef%bc%9a%e7%91%9e%e5%a3%ab%e7%99%be%e8%be%be%e6%91%84%e5%bd%b1%e5%a5%96-%e3%80%8c%e4%ba%ba%e3%80%8d%e4%b8%bb%e9%a2%98%e5%85%a8%e7%90%83%e5%b7%a1/',
    'interpretation-of-dreams': 'https://kwmartcenter.com/zh/2024/04/18/%e6%a2%a6%e7%9a%84%e8%a7%a3%e6%9e%90-%e4%bb%a5%e7%b2%be%e7%a5%9e%e5%88%86%e6%9e%90%e6%8e%a2%e7%b4%a2%e7%bb%98%e7%94%bb%e6%80%a7%e7%9a%84%e5%b0%9d%e8%af%95-%e6%af%95%e7%bb%b4%e7%bb%b4/',
    'dimensions-of-mind-jiang-miao': 'https://kwmartcenter.com/zh/2024/03/12/%e5%bf%83%e7%bb%b4%e4%b9%8b%e5%a2%83-%e5%a7%9c%e6%b7%bc%e4%b8%aa%e5%b1%95/',
    'transcendental-self': 'https://kwmartcenter.com/zh/2024/02/01/%e3%80%8c%e8%b6%85%e9%aa%8c%e8%87%aa%e6%88%91%e3%80%8d-%e5%bd%93%e4%bb%a3%e8%89%ba%e6%9c%af%e5%ae%b6%e7%be%a4%e5%b1%95/',
    'sound-life-duo-exhibition': 'https://kwmartcenter.com/zh/2023/12/23/%e5%a3%b0%e7%94%9f-%e7%bf%81%e9%9b%aa%e6%9d%be-x-%e8%8c%83%e5%a7%9c%e6%98%8e%e9%81%93%e5%8f%8c%e4%b8%aa%e5%b1%95/',
    'through-the-looking-glass': 'https://kwmartcenter.com/zh/2023/11/21/%e5%b1%b1%e6%b5%b7%e9%95%9c%e8%8a%b1-%e7%89%9f%e6%9e%97%e7%ab%a5-%e5%91%a8%e5%90%8d%e5%be%b7%e5%8f%8c%e4%ba%ba%e5%b1%95/',
    'cao-jun-beauty-of-china': 'https://kwmartcenter.com/zh/2023/10/19/%e8%ae%a9%e4%b8%96%e7%95%8c%e7%9c%8b%e5%88%b0%e4%b8%ad%e5%9b%bd%e7%9a%84%e7%be%8e-%e6%9b%b9%e4%bf%8a%e7%b2%be%e5%93%81%e5%b1%95/',
    'feng-jianguo-photography': 'https://kwmartcenter.com/zh/2023/08/18/2717/',
    'wang-zhongjun-traveler': 'https://kwmartcenter.com/zh/2023/07/29/%e8%a1%8c%e8%80%85-%e7%8e%8b%e4%b8%ad%e5%86%9b%e4%b8%aa%e5%b1%95/',
    'weaving-light-12-female-artists': 'https://kwmartcenter.com/zh/2023/03/10/%e7%bb%87%e6%a2%ad%e5%85%89%e6%99%af-12%e4%bd%8d%e5%a5%b3%e6%80%a7%e8%89%ba%e6%9c%af%e5%ae%b6%e7%9a%84%e7%bb%98%e7%94%bb/',
    'spring-rhapsody': 'https://kwmartcenter.com/zh/2022/03/09/%e6%98%a5%e5%a4%a9%e7%8b%82%e6%83%b3%e6%9b%b2/',
    'hands-of-memory': 'https://kwmartcenter.com/zh/2021/12/24/%e8%ae%b0%e5%bf%86%e7%9a%84%e6%89%8b-%e7%ba%b8%e4%b8%8a%e4%bd%9c%e5%93%81%e5%b1%95/',
    'hearing-flowers-bloom': 'https://kwmartcenter.com/zh/2021/08/26/%e5%90%ac%e8%a7%81%e8%8a%b1%e5%bc%80-%e4%bd%95%e5%a4%9a%e8%8b%93%e5%b8%88%e7%94%9f%e5%b1%95/',
    'chen-dazhi-empty-mountain': 'https://kwmartcenter.com/zh/2021/07/26/%e9%99%88%e5%a4%a7%e5%bf%97%e6%91%84%e5%bd%b1%e8%89%ba%e6%9c%af%e5%b1%95%e7%a9%ba%e5%b1%b1%c2%b7%e9%95%9c/',
    'perspective-ma-shuqing': 'https://kwmartcenter.com/zh/2021/06/14/%e3%80%8c%e9%80%8f%c2%b7%e8%a7%86%e3%80%8d-%e9%a9%ac%e6%a0%91%e9%9d%92%e5%b8%88%e7%94%9f%e6%8a%bd%e8%b1%a1%e7%be%a4%e5%b1%95/',
    'revelations': 'https://kwmartcenter.com/zh/2020/08/15/%e5%90%af%e7%a4%ba%e5%bd%95/',
    'this-too-is-guo-fengyi': 'https://kwmartcenter.com/zh/2020/05/30/this-too-is-guo-fengyi/',
    'a-knife-on-the-moon': 'https://kwmartcenter.com/zh/2020/03/18/a-knife-on-the-moon/',
    'where-are-the-fantastic-beasts': 'https://kwmartcenter.com/zh/2019/12/11/where-are-the-fantastic-beasts/',
    'chen-ying-solo-exhibition': 'https://kwmartcenter.com/zh/2019/08/23/chen-ying-solo-exhibition/',
    'four-types-of-summer': 'https://kwmartcenter.com/zh/2019/07/30/four-types-of-summer/',
    'secondary': 'https://kwmartcenter.com/zh/2019/05/24/secondary/',
    'rinus-van-de-velde-the-colony': 'https://kwmartcenter.com/zh/2019/03/15/the-colony/',
    'rachel-maclean': 'https://kwmartcenter.com/zh/2018/09/19/rachel-maclean/',
    'post-southern-song-dynasty': 'https://kwmartcenter.com/zh/2018/09/07/the-post-southern-song-dynasty/',
    'zhang-ding-safe-house': 'https://kwmartcenter.com/zh/2018/07/19/zhang-ding-safe-house/',
    'sun-shining-on-zhujiajiao': 'https://kwmartcenter.com/zh/2018/05/10/sun-shining-on-zhujiajiao/',
    'huan-zhong-nature-follows-abstraction': 'https://kwmartcenter.com/zh/2018/03/18/huan-zhong-nature-follows-abstraction/',
    'amalia-ulman-privilege': 'https://kwmartcenter.com/zh/2018/03/17/privilege/',
    'beauty-without-beards': 'https://kwmartcenter.com/zh/2017/03/17/beauty-without-beards/',
    'somewhere-only-we-know': 'https://kwmartcenter.com/zh/2016/03/17/en-somewhere-only-we-know/',
};

// 英文页面 URL（路径用 /en/ 前缀）
function getEnUrl(zhUrl) {
    return zhUrl.replace('/zh/', '/en/');
}

async function patchDescriptions() {
    // 获取所有已导入的展览
    const exhibitions = await client.fetch(
        `*[_type == "exhibition"] | order(startDate desc) { _id, "slug": slug.current, title_zh }`
    );

    console.log(`\n🔧 开始为 ${exhibitions.length} 个展览补充描述...\n`);

    let updated = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < exhibitions.length; i++) {
        const ex = exhibitions[i];
        const progress = `[${i + 1}/${exhibitions.length}]`;
        const zhUrl = slugToUrl[ex.slug];

        if (!zhUrl) {
            console.log(`${progress} ⏭  无 URL，跳过: ${ex.title_zh}`);
            skipped++;
            continue;
        }

        try {
            console.log(`${progress} 📥 抓取: ${ex.title_zh}`);

            // 抓取中文描述
            let description_zh = '';
            try {
                const zhHtml = await fetchHTML(zhUrl);
                description_zh = extractDescription(zhHtml);
            } catch (err) {
                console.log(`       ⚠️  中文页面失败: ${err.message}`);
            }

            await delay(300);

            // 抓取英文描述
            let description_en = '';
            const enUrl = getEnUrl(zhUrl);
            try {
                const enHtml = await fetchHTML(enUrl);
                description_en = extractDescription(enHtml);
            } catch (err) {
                console.log(`       ⚠️  英文页面失败: ${err.message}`);
            }

            await delay(300);

            if (!description_zh && !description_en) {
                console.log(`${progress} ⏭  无描述内容: ${ex.title_zh}`);
                skipped++;
                continue;
            }

            // 更新 Sanity 文档
            const patch = {};
            if (description_zh) patch.description_zh = description_zh;
            if (description_en) patch.description_en = description_en;

            await client.patch(ex._id).set(patch).commit();

            console.log(`${progress} ✅ 已更新: ${ex.title_zh} (中文: ${description_zh.length}字, 英文: ${description_en.length}字)\n`);
            updated++;

        } catch (error) {
            console.error(`${progress} ❌ 失败: ${ex.title_zh} - ${error.message}\n`);
            failed++;
        }

        await delay(300);
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 描述补充完成！`);
    console.log(`   ✅ 已更新: ${updated}`);
    console.log(`   ⏭  跳过: ${skipped}`);
    console.log(`   ❌ 失败: ${failed}`);
    console.log(`${'='.repeat(50)}\n`);
}

patchDescriptions();
