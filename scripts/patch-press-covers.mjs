/**
 * 补丁：为新闻稿补充海报封面图片
 *
 * SANITY_WRITE_TOKEN=xxx node scripts/patch-press-covers.mjs
 */

import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';
import { Buffer } from 'buffer';
import path from 'path';

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

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const get = url.startsWith('https') ? https.get : http.get;
        get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                downloadImage(res.headers.location).then(resolve).catch(reject);
                return;
            }
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', reject);
        }).on('error', reject);
    });
}

// 新闻稿 slug → 海报图片 URL（按顺序从旧网站提取）
// 使用原始高清图（去掉 -500x750 缩略后缀）
const pressCovers = [
    { slug: 'artists-film-international-screening-9', img: 'https://kwmartcenter.com/wp-content/uploads/2020/09/海报.jpg' },
    { slug: 'zhang-gong-revelations', img: 'https://kwmartcenter.com/wp-content/uploads/2020/08/张弓-启示录-海报.jpg' },
    { slug: 'artists-film-international-screening-8', img: 'https://kwmartcenter.com/wp-content/uploads/2020/09/海报副本-2.jpg' },
    { slug: 'this-too-is-guo-fengyi', img: 'https://kwmartcenter.com/wp-content/uploads/2020/05/也是郭凤怡-金杜艺术中心副本.jpg' },
    { slug: 'artists-film-international-screening-7', img: 'https://kwmartcenter.com/wp-content/uploads/2020/09/海报副本-1.jpg' },
    { slug: 'artists-film-international-screening-6', img: 'https://kwmartcenter.com/wp-content/uploads/2020/09/海报副本.jpg' },
    { slug: 'online-cinema-defence-cascade', img: 'https://kwmartcenter.com/wp-content/uploads/2020/04/Harrison-Pearce-poster副本.jpg' },
    { slug: 'a-knife-on-the-moon', img: 'https://kwmartcenter.com/wp-content/uploads/2020/03/Dario-poster.png' },
    { slug: 'online-cinema-hermetic-diode', img: 'https://kwmartcenter.com/wp-content/uploads/2020/03/poster.png' },
    { slug: 'online-project-152020', img: 'https://kwmartcenter.com/wp-content/uploads/2020/03/poste.jpg' },
    { slug: 'artists-film-international-screening-5', img: 'https://kwmartcenter.com/wp-content/uploads/2019/12/国际影像5-01.jpg' },
    { slug: 'wu-junyong-where-are-the-fantastic-beasts', img: 'https://kwmartcenter.com/wp-content/uploads/2019/12/Wu-Junyong-solo-exhibition-poster.jpg' },
    { slug: 'film-london-jarman-award-2019', img: 'https://kwmartcenter.com/wp-content/uploads/2019/10/Jarman-Award-Screening-Poster_vertical.jpeg' },
    { slug: 'artists-film-international-screening-4', img: 'https://kwmartcenter.com/wp-content/uploads/2019/09/AFI4-poster.jpg' },
    { slug: 'chen-ying-solo-exhibition', img: 'https://kwmartcenter.com/wp-content/uploads/2019/08/陈英个展海报.jpg' },
    { slug: 'four-types-of-summer', img: 'https://kwmartcenter.com/wp-content/uploads/2019/07/四种夏天-01.jpg' },
    { slug: 'li-tao-secondary', img: 'https://kwmartcenter.com/wp-content/uploads/2019/05/海报-KWM.jpeg' },
    { slug: 'artists-film-international-screening-2', img: 'https://kwmartcenter.com/wp-content/uploads/2019/04/afi2-poster.jpg' },
    { slug: 'rinus-van-de-velde-the-colony', img: 'https://kwmartcenter.com/wp-content/uploads/2019/03/Rinus-van-de-Velde-poster.jpg' },
    { slug: 'artists-film-international-screening-1', img: 'https://kwmartcenter.com/wp-content/uploads/2019/02/AFI-Poster1.jpg' },
    { slug: 'rachel-maclean', img: 'https://kwmartcenter.com/wp-content/uploads/2018/11/Rachel-Maclean-poster.jpg' },
    { slug: 'the-post-southern-song-dynasty', img: 'https://kwmartcenter.com/wp-content/uploads/2018/09/后南宋王朝-竖版海报.jpg' },
    { slug: 'zhang-ding-safe-house', img: 'https://kwmartcenter.com/wp-content/uploads/2018/07/zp.jpg' },
    { slug: 'zheng-haozhong-sun-shining-on-zhujiajiao', img: 'https://kwmartcenter.com/wp-content/uploads/2018/06/Zheng-Haozhong-Sun-shining-on-Zhujiajiao-Poster.jpg' },
    { slug: 'amalia-ulman-privilege', img: 'https://kwmartcenter.com/wp-content/uploads/2018/03/Amalia-Ulman-Privilege-Poster.jpg' },
    { slug: 'zhao-gang-comfortably-dumb', img: 'https://kwmartcenter.com/wp-content/uploads/2018/03/Zhao-Gang-Comfortably-Dumb-Poster.jpg' },
    { slug: 'plants-balloons-and-bell-jars', img: 'https://kwmartcenter.com/wp-content/uploads/2018/03/RuXiaofan-Solo-Show-Poster.jpg' },
    { slug: 'pfsh-spotlight-ren-hang', img: 'https://kwmartcenter.com/wp-content/uploads/2018/03/PFSH-poster.jpg' },
    { slug: 'huan-zhong-nature-follows-abstraction', img: 'https://kwmartcenter.com/wp-content/uploads/2018/03/Nature-Follows-Abstraction-Poster.jpg' },
    { slug: 'beauty-without-beards', img: 'https://kwmartcenter.com/wp-content/uploads/2018/03/任航-无须之美-海报.jpg' },
    { slug: 'somewhere-only-we-know', img: 'https://kwmartcenter.com/wp-content/uploads/2018/03/海报竖版.jpg' },
];

async function patchCovers() {
    console.log(`\n🖼️  开始为 ${pressCovers.length} 个新闻稿补充海报封面...\n`);

    let updated = 0, skipped = 0, failed = 0;

    for (let i = 0; i < pressCovers.length; i++) {
        const { slug, img } = pressCovers[i];
        const progress = `[${i + 1}/${pressCovers.length}]`;

        try {
            const doc = await client.fetch(
                `*[_type == "press" && slug.current == $slug][0]{ _id, title_zh, "hasCover": defined(coverImage) }`,
                { slug }
            );

            if (!doc) {
                console.log(`${progress} ⏭  未找到: ${slug}`);
                skipped++;
                continue;
            }

            console.log(`${progress} 📤 上传海报: ${doc.title_zh}`);
            const buf = await downloadImage(img);
            const filename = path.basename(new URL(img).pathname);
            const asset = await client.assets.upload('image', buf, { filename });

            await client.patch(doc._id).set({
                coverImage: {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: asset._id },
                },
            }).commit();

            console.log(`${progress} ✅ 已更新: ${doc.title_zh}`);
            updated++;
        } catch (error) {
            console.error(`${progress} ❌ 失败: ${slug} - ${error.message}`);
            failed++;
        }
        await delay(500);
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 海报封面补充完成！`);
    console.log(`   ✅ 已更新: ${updated}`);
    console.log(`   ⏭  跳过: ${skipped}`);
    console.log(`   ❌ 失败: ${failed}`);
    console.log(`${'='.repeat(50)}\n`);
}

patchCovers();
