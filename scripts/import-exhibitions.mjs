/**
 * 从旧网站 (kwmartcenter.com) 批量导入展览到 Sanity
 * 包括：中英文标题、艺术家、描述、封面图片、展览图集
 *
 * 使用方法:
 *   1. 先安装依赖: npm install cheerio node-fetch@2
 *   2. 设置 Token: export SANITY_WRITE_TOKEN=你的Token
 *   3. 运行: node scripts/import-exhibitions.mjs
 */

import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';
import https from 'https';
import http from 'http';
import { Buffer } from 'buffer';
import path from 'path';

// ============================================================
// Sanity 客户端配置
// ============================================================
const client = createClient({
    projectId: 'qiafoam7',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
});

if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ 请设置 SANITY_WRITE_TOKEN 环境变量！');
    console.error('   export SANITY_WRITE_TOKEN=你的Token');
    process.exit(1);
}

// ============================================================
// 工具函数
// ============================================================

// 延迟函数，避免请求过快
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 抓取网页 HTML
async function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            }
        }, (res) => {
            // 处理重定向
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

// 下载图片并上传到 Sanity
async function uploadImageToSanity(imageUrl) {
    if (!imageUrl) return null;

    try {
        // 确保 URL 是绝对路径
        if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;
        if (imageUrl.startsWith('/')) imageUrl = 'https://kwmartcenter.com' + imageUrl;

        const imageBuffer = await new Promise((resolve, reject) => {
            const client = imageUrl.startsWith('https') ? https : http;
            client.get(imageUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            }, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    // Handle redirect for images
                    const redirectUrl = res.headers.location.startsWith('http') ? res.headers.location : 'https://kwmartcenter.com' + res.headers.location;
                    const redirectClient = redirectUrl.startsWith('https') ? https : http;
                    redirectClient.get(redirectUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
                        const chunks = [];
                        res2.on('data', chunk => chunks.push(chunk));
                        res2.on('end', () => resolve(Buffer.concat(chunks)));
                        res2.on('error', reject);
                    }).on('error', reject);
                    return;
                }
                const chunks = [];
                res.on('data', chunk => chunks.push(chunk));
                res.on('end', () => resolve(Buffer.concat(chunks)));
                res.on('error', reject);
            }).on('error', reject);
        });

        // 获取文件名
        const filename = path.basename(new URL(imageUrl).pathname) || 'image.jpg';

        // 上传到 Sanity
        const asset = await client.assets.upload('image', imageBuffer, { filename });
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id,
            },
        };
    } catch (error) {
        console.error(`   ⚠️  图片上传失败: ${imageUrl.substring(0, 80)}... - ${error.message}`);
        return null;
    }
}

// 从展览页面提取数据
function extractExhibitionData(html, url) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // 提取所有图片 URL
    const images = [];
    const imgElements = doc.querySelectorAll('.entry-content img, .post-content img, article img, .wp-block-image img, figure img');
    imgElements.forEach(img => {
        let src = img.getAttribute('src') || img.getAttribute('data-src') || '';
        // 取最大分辨率的图
        const srcset = img.getAttribute('srcset');
        if (srcset) {
            const parts = srcset.split(',').map(s => s.trim());
            const lastPart = parts[parts.length - 1];
            if (lastPart) {
                src = lastPart.split(' ')[0];
            }
        }
        if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('wechat') && !src.includes('qr')) {
            images.push(src);
        }
    });

    // 提取描述文本
    let description = '';
    const contentEl = doc.querySelector('.entry-content, .post-content, article .content');
    if (contentEl) {
        // 获取所有段落文本
        const paragraphs = contentEl.querySelectorAll('p');
        const texts = [];
        paragraphs.forEach(p => {
            const text = p.textContent.trim();
            if (text && text.length > 10 && !text.includes('扫描二维码') && !text.includes('订阅')) {
                texts.push(text);
            }
        });
        description = texts.join('\n\n');
    }

    // 如果没找到段落，尝试直接获取内容文本
    if (!description && contentEl) {
        description = contentEl.textContent.trim().substring(0, 2000);
    }

    return { images, description };
}

// ============================================================
// 展览列表（中英文配对）
// ============================================================

const exhibitions = [
    // 2025
    {
        title_zh: '金杜艺术中心闭馆公告',
        title_en: 'KWM Art Center Closure Announcement',
        artist_zh: '', artist_en: '',
        slug: 'kwm-closure-announcement',
        startDate: '2025-09-10', endDate: '2025-09-30', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2025/09/10/%e9%87%91%e6%9d%9c%e8%89%ba%e6%9c%af%e4%b8%ad%e5%bf%83%e9%97%ad%e9%a6%86%e5%85%ac%e5%91%8a/',
    },
    {
        title_zh: '「蚀光集」-迈克尔·肯纳摄影作品展',
        title_en: 'Light Etchings — The Photography Exhibition of Michael Kenna',
        artist_zh: '迈克尔·肯纳', artist_en: 'Michael Kenna',
        slug: 'light-etchings-michael-kenna',
        startDate: '2025-07-11', endDate: '2025-08-09', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2025/06/27/%e3%80%8c%e8%9a%80%e5%85%89%e9%9b%86%e3%80%8d-%e8%bf%88%e5%85%8b%e5%b0%94%c2%b7%e8%82%af%e7%ba%b3%e6%91%84%e5%bd%b1%e4%bd%9c%e5%93%81%e5%b1%95/',
    },
    {
        title_zh: '张伟：「余兴」',
        title_en: 'Zhang Wei: Afterglow',
        artist_zh: '张伟', artist_en: 'Zhang Wei',
        slug: 'zhang-wei-afterglow',
        startDate: '2025-05-14', endDate: '2025-06-22', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2025/05/14/%e5%bc%a0%e4%bc%9f%ef%bc%9a%e3%80%8c%e4%bd%99%e5%85%b4%e3%80%8d/',
    },
    {
        title_zh: '「诗」– 女性艺术展',
        title_en: 'Poetry – Women\'s Art Exhibition',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'poetry-womens-art-exhibition',
        startDate: '2025-03-20', endDate: '2025-05-10', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2025/03/20/%e3%80%8c%e8%af%97%e3%80%8d-%e5%a5%b3%e6%80%a7%e8%89%ba%e6%9c%af%e5%b1%95/',
    },
    {
        title_zh: '「共鸣与新生」– 金杜艺术中心八周年特展',
        title_en: 'Resonance and Renewal – The 8th Anniversary Exhibition',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'resonance-and-renewal-8th-anniversary',
        startDate: '2025-01-02', endDate: '2025-03-15', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2025/01/02/%e3%80%8c%e5%85%b1%e9%b8%a3%e4%b8%8e%e6%96%b0%e7%94%9f%e3%80%8d-%e9%87%91%e6%9d%9c%e8%89%ba%e6%9c%af%e4%b8%ad%e5%bf%83%e5%85%ab%e5%91%a8%e5%b9%b4%e7%89%b9%e5%b1%95/',
    },
    {
        title_zh: '「复调与独语」– 当代艺术作品展',
        title_en: 'Polyphony and Soliloquy – Contemporary Art Group Exhibition',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'polyphony-and-soliloquy',
        startDate: '2025-01-02', endDate: '2025-03-15', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2025/01/02/%e3%80%8c%e5%a4%8d%e8%b0%83%e4%b8%8e%e7%8b%ac%e8%af%ad%e3%80%8d-%e5%bd%93%e4%bb%a3%e8%89%ba%e6%9c%af%e4%bd%9c%e5%93%81%e5%b1%95/',
    },
    // 2024
    {
        title_zh: '「蓝色房间」—— 人工智能的艺术探索',
        title_en: 'The Blue Room – Artistic Exploration of Artificial Intelligence',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'the-blue-room-ai-art',
        startDate: '2024-09-19', endDate: '2024-12-20', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2024/09/19/%e3%80%8c%e8%93%9d%e8%89%b2%e6%88%bf%e9%97%b4%e3%80%8d-%e4%ba%ba%e5%b7%a5%e6%99%ba%e8%83%bd%e7%9a%84%e8%89%ba%e6%9c%af%e6%8e%a2%e7%b4%a2/',
    },
    {
        title_zh: '「世界树」——尤克特拉希尔',
        title_en: 'Yggdrasill – The World Tree',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'yggdrasill-world-tree',
        startDate: '2024-07-27', endDate: '2024-09-15', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2024/07/27/%e3%80%8c%e4%b8%96%e7%95%8c%e6%a0%91%e3%80%8d-%e5%b0%a4%e5%85%8b%e7%89%b9%e6%8b%89%e5%b8%8c%e5%b0%94/',
    },
    {
        title_zh: '瑞士百达摄影奖——「人」主题全球巡展',
        title_en: 'Prix Pictet – Humanity Global Tour',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'prix-pictet-humanity',
        startDate: '2024-05-23', endDate: '2024-07-20', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2024/05/23/%e5%8d%b3%e5%b0%86%e5%b1%95%e5%87%ba%ef%bc%9a%e7%91%9e%e5%a3%ab%e7%99%be%e8%be%be%e6%91%84%e5%bd%b1%e5%a5%96-%e3%80%8c%e4%ba%ba%e3%80%8d%e4%b8%bb%e9%a2%98%e5%85%a8%e7%90%83%e5%b7%a1/',
    },
    {
        title_zh: '梦的解析——以精神分析探索绘画性的尝试',
        title_en: 'The Interpretation of Dreams',
        artist_zh: '毕维维', artist_en: 'Bi Weiwei',
        slug: 'interpretation-of-dreams',
        startDate: '2024-04-18', endDate: '2024-05-19', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2024/04/18/%e6%a2%a6%e7%9a%84%e8%a7%a3%e6%9e%90-%e4%bb%a5%e7%b2%be%e7%a5%9e%e5%88%86%e6%9e%90%e6%8e%a2%e7%b4%a2%e7%bb%98%e7%94%bb%e6%80%a7%e7%9a%84%e5%b0%9d%e8%af%95-%e6%af%95%e7%bb%b4%e7%bb%b4/',
    },
    {
        title_zh: '心维之境——姜淼个展',
        title_en: 'Dimensions of Mind – Jiang Miao Solo Exhibition',
        artist_zh: '姜淼', artist_en: 'Jiang Miao',
        slug: 'dimensions-of-mind-jiang-miao',
        startDate: '2024-03-12', endDate: '2024-04-14', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2024/03/12/%e5%bf%83%e7%bb%b4%e4%b9%8b%e5%a2%83-%e5%a7%9c%e6%b7%bc%e4%b8%aa%e5%b1%95/',
    },
    {
        title_zh: '「超验自我」—— 当代艺术家群展',
        title_en: 'Transcendental Self – Contemporary Artists Group Exhibition',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'transcendental-self',
        startDate: '2024-02-01', endDate: '2024-03-08', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2024/02/01/%e3%80%8c%e8%b6%85%e9%aa%8c%e8%87%aa%e6%88%91%e3%80%8d-%e5%bd%93%e4%bb%a3%e8%89%ba%e6%9c%af%e5%ae%b6%e7%be%a4%e5%b1%95/',
    },
    // 2023
    {
        title_zh: '声生——翁雪松 x 范姜明道双个展',
        title_en: 'Sound · Life: Weng Xuesong & Fanjiang Mingdao Duo Exhibition',
        artist_zh: '翁雪松、范姜明道', artist_en: 'Weng Xuesong, Fanjiang Mingdao',
        slug: 'sound-life-duo-exhibition',
        startDate: '2023-12-23', endDate: '2024-01-28', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2023/12/23/%e5%a3%b0%e7%94%9f-%e7%bf%81%e9%9b%aa%e6%9d%be-x-%e8%8c%83%e5%a7%9c%e6%98%8e%e9%81%93%e5%8f%8c%e4%b8%aa%e5%b1%95/',
    },
    {
        title_zh: '山海镜花——牟林童 周名德双人展',
        title_en: 'Through the Looking-Glass: Mu Lintong & Zhou Mingde',
        artist_zh: '牟林童、周名德', artist_en: 'Mu Lintong, Zhou Mingde',
        slug: 'through-the-looking-glass',
        startDate: '2023-11-21', endDate: '2023-12-17', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2023/11/21/%e5%b1%b1%e6%b5%b7%e9%95%9c%e8%8a%b1-%e7%89%9f%e6%9e%97%e7%ab%a5-%e5%91%a8%e5%90%8d%e5%be%b7%e5%8f%8c%e4%ba%ba%e5%b1%95/',
    },
    {
        title_zh: '让世界看到中国的美——曹俊精品展',
        title_en: 'Let the World See the Beauty of China – Cao Jun',
        artist_zh: '曹俊', artist_en: 'Cao Jun',
        slug: 'cao-jun-beauty-of-china',
        startDate: '2023-10-19', endDate: '2023-11-17', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2023/10/19/%e8%ae%a9%e4%b8%96%e7%95%8c%e7%9c%8b%e5%88%b0%e4%b8%ad%e5%9b%bd%e7%9a%84%e7%be%8e-%e6%9b%b9%e4%bf%8a%e7%b2%be%e5%93%81%e5%b1%95/',
    },
    {
        title_zh: '"澄怀观道"——冯建国摄影艺术收藏展',
        title_en: 'Contemplation of the Way – Feng Jianguo Photography',
        artist_zh: '冯建国', artist_en: 'Feng Jianguo',
        slug: 'feng-jianguo-photography',
        startDate: '2023-08-18', endDate: '2023-10-15', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2023/08/18/2717/',
    },
    {
        title_zh: '行者——王中军个展',
        title_en: 'The Traveler – Wang Zhongjun Solo Exhibition',
        artist_zh: '王中军', artist_en: 'Wang Zhongjun',
        slug: 'wang-zhongjun-traveler',
        startDate: '2023-07-29', endDate: '2023-08-14', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2023/07/29/%e8%a1%8c%e8%80%85-%e7%8e%8b%e4%b8%ad%e5%86%9b%e4%b8%aa%e5%b1%95/',
    },
    {
        title_zh: '织梭光景——12位女性艺术家的绘画',
        title_en: 'Weaving Light – Paintings by 12 Female Artists',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'weaving-light-12-female-artists',
        startDate: '2023-03-10', endDate: '2023-05-10', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2023/03/10/%e7%bb%87%e6%a2%ad%e5%85%89%e6%99%af-12%e4%bd%8d%e5%a5%b3%e6%80%a7%e8%89%ba%e6%9c%af%e5%ae%b6%e7%9a%84%e7%bb%98%e7%94%bb/',
    },
    // 2022
    {
        title_zh: '春天狂想曲',
        title_en: 'Spring Rhapsody',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'spring-rhapsody',
        startDate: '2022-03-09', endDate: '2022-06-10', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2022/03/09/%e6%98%a5%e5%a4%a9%e7%8b%82%e6%83%b3%e6%9b%b2/',
    },
    // 2021
    {
        title_zh: '记忆的手——纸上作品展',
        title_en: 'Hands of Memory – Works on Paper',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'hands-of-memory',
        startDate: '2021-12-24', endDate: '2022-02-28', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2021/12/24/%e8%ae%b0%e5%bf%86%e7%9a%84%e6%89%8b-%e7%ba%b8%e4%b8%8a%e4%bd%9c%e5%93%81%e5%b1%95/',
    },
    {
        title_zh: '听见花开——何多苓师生展',
        title_en: 'Hearing Flowers Bloom – He Duoling and Students',
        artist_zh: '何多苓', artist_en: 'He Duoling',
        slug: 'hearing-flowers-bloom',
        startDate: '2021-08-26', endDate: '2021-10-10', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2021/08/26/%e5%90%ac%e8%a7%81%e8%8a%b1%e5%bc%80-%e4%bd%95%e5%a4%9a%e8%8b%93%e5%b8%88%e7%94%9f%e5%b1%95/',
    },
    {
        title_zh: '陈大志摄影艺术展"空山·镜"',
        title_en: 'Chen Dazhi "Empty Mountain · Mirror"',
        artist_zh: '陈大志', artist_en: 'Chen Dazhi',
        slug: 'chen-dazhi-empty-mountain',
        startDate: '2021-07-26', endDate: '2021-08-22', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2021/07/26/%e9%99%88%e5%a4%a7%e5%bf%97%e6%91%84%e5%bd%b1%e8%89%ba%e6%9c%af%e5%b1%95%e7%a9%ba%e5%b1%b1%c2%b7%e9%95%9c/',
    },
    {
        title_zh: '「透·视」–马树青师生抽象群展',
        title_en: 'Perspective – Ma Shuqing Abstract Group Exhibition',
        artist_zh: '马树青', artist_en: 'Ma Shuqing',
        slug: 'perspective-ma-shuqing',
        startDate: '2021-06-14', endDate: '2021-07-20', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2021/06/14/%e3%80%8c%e9%80%8f%c2%b7%e8%a7%86%e3%80%8d-%e9%a9%ac%e6%a0%91%e9%9d%92%e5%b8%88%e7%94%9f%e6%8a%bd%e8%b1%a1%e7%be%a4%e5%b1%95/',
    },
    // 2020
    {
        title_zh: '启示录',
        title_en: 'Revelations',
        artist_zh: '张鼎', artist_en: 'Zhang Ding',
        slug: 'revelations',
        startDate: '2020-08-15', endDate: '2020-10-15', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2020/08/15/%e5%90%af%e7%a4%ba%e5%bd%95/',
    },
    {
        title_zh: '也是郭凤怡',
        title_en: 'This Too Is Guo Fengyi',
        artist_zh: '郭凤怡', artist_en: 'Guo Fengyi',
        slug: 'this-too-is-guo-fengyi',
        startDate: '2020-05-30', endDate: '2020-08-10', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2020/05/30/this-too-is-guo-fengyi/',
    },
    {
        title_zh: '月球与刀',
        title_en: 'A Knife on the Moon',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'a-knife-on-the-moon',
        startDate: '2020-03-18', endDate: '2020-05-20', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2020/03/18/a-knife-on-the-moon/',
    },
    // 2019
    {
        title_zh: '山海不惊',
        title_en: 'Where are the Fantastic Beasts?',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'where-are-the-fantastic-beasts',
        startDate: '2019-12-11', endDate: '2020-03-10', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2019/12/11/where-are-the-fantastic-beasts/',
    },
    {
        title_zh: '陈英个展',
        title_en: 'Chen Ying Solo Exhibition',
        artist_zh: '陈英', artist_en: 'Chen Ying',
        slug: 'chen-ying-solo-exhibition',
        startDate: '2019-08-23', endDate: '2019-10-20', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2019/08/23/chen-ying-solo-exhibition/',
    },
    {
        title_zh: '四种夏天',
        title_en: 'Four Types of Summer',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'four-types-of-summer',
        startDate: '2019-07-30', endDate: '2019-08-18', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2019/07/30/four-types-of-summer/',
    },
    {
        title_zh: '次生',
        title_en: 'Secondary',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'secondary',
        startDate: '2019-05-24', endDate: '2019-07-25', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2019/05/24/secondary/',
    },
    {
        title_zh: '瑞纳斯·凡·德·维尔德 丨 殖民地',
        title_en: 'Rinus Van de Velde | The Colony',
        artist_zh: '瑞纳斯·凡·德·维尔德', artist_en: 'Rinus Van de Velde',
        slug: 'rinus-van-de-velde-the-colony',
        startDate: '2019-03-15', endDate: '2019-05-19', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2019/03/15/the-colony/',
    },
    // 2018
    {
        title_zh: '蕾切尔·麦克莱恩',
        title_en: 'Rachel Maclean',
        artist_zh: '蕾切尔·麦克莱恩', artist_en: 'Rachel Maclean',
        slug: 'rachel-maclean',
        startDate: '2018-09-19', endDate: '2018-11-18', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2018/09/19/rachel-maclean/',
    },
    {
        title_zh: '后南宋王朝',
        title_en: 'The Post Southern Song Dynasty',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'post-southern-song-dynasty',
        startDate: '2018-09-07', endDate: '2018-11-04', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2018/09/07/the-post-southern-song-dynasty/',
    },
    {
        title_zh: '张鼎：安全屋',
        title_en: 'Zhang Ding: Safe House',
        artist_zh: '张鼎', artist_en: 'Zhang Ding',
        slug: 'zhang-ding-safe-house',
        startDate: '2018-07-19', endDate: '2018-09-02', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2018/07/19/zhang-ding-safe-house/',
    },
    {
        title_zh: '日照朱家角',
        title_en: 'Sun Shining on Zhujiajiao',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'sun-shining-on-zhujiajiao',
        startDate: '2018-05-10', endDate: '2018-07-15', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2018/05/10/sun-shining-on-zhujiajiao/',
    },
    {
        title_zh: '环中——自然追随抽象',
        title_en: 'Huan Zhong – Nature Follows Abstraction',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'huan-zhong-nature-follows-abstraction',
        startDate: '2018-03-18', endDate: '2018-05-06', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2018/03/18/huan-zhong-nature-follows-abstraction/',
    },
    {
        title_zh: '阿马利娅·乌尔曼: 优越',
        title_en: 'Amalia Ulman: Privilege',
        artist_zh: '阿马利娅·乌尔曼', artist_en: 'Amalia Ulman',
        slug: 'amalia-ulman-privilege',
        startDate: '2018-03-17', endDate: '2018-05-06', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2018/03-17/privilege/',
    },
    {
        title_zh: '无须之美',
        title_en: 'Beauty Without Beards',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'beauty-without-beards',
        startDate: '2017-03-17', endDate: '2017-06-17', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2017/03/17/beauty-without-beards/',
    },
    {
        title_zh: '不足为外人道也',
        title_en: 'Somewhere Only We Know',
        artist_zh: '群展', artist_en: 'Group Exhibition',
        slug: 'somewhere-only-we-know',
        startDate: '2016-03-17', endDate: '2016-06-17', status: 'past',
        url_zh: 'https://kwmartcenter.com/zh/2016/03/17/en-somewhere-only-we-know/',
    },
];

// ============================================================
// 主导入函数
// ============================================================

async function importAll() {
    console.log(`\n🚀 开始导入 ${exhibitions.length} 个展览（含图片）到 Sanity...\n`);
    console.log('⏳ 每个展览大约需要 10-30 秒（包含图片下载和上传）\n');

    let success = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < exhibitions.length; i++) {
        const ex = exhibitions[i];
        const progress = `[${i + 1}/${exhibitions.length}]`;

        try {
            // 检查是否已存在
            const exists = await client.fetch(
                `*[_type == "exhibition" && slug.current == $slug][0]`,
                { slug: ex.slug }
            );

            if (exists) {
                console.log(`${progress} ⏭  已存在，跳过: ${ex.title_zh}`);
                skipped++;
                continue;
            }

            console.log(`${progress} 📥 正在处理: ${ex.title_zh}`);

            // 抓取展览页面获取描述和图片
            let description_zh = '';
            let images = [];

            if (ex.url_zh) {
                try {
                    console.log(`       🌐 抓取页面...`);
                    const html = await fetchHTML(ex.url_zh);
                    const pageData = extractExhibitionData(html, ex.url_zh);
                    description_zh = pageData.description;
                    images = pageData.images;
                    console.log(`       📝 获取到描述 (${description_zh.length} 字)`);
                    console.log(`       🖼️  发现 ${images.length} 张图片`);
                } catch (err) {
                    console.log(`       ⚠️  页面抓取失败: ${err.message}`);
                }
                await delay(500); // 避免请求过快
            }

            // 上传封面图片（使用第一张图片作为封面）
            let coverImage = null;
            if (images.length > 0) {
                console.log(`       📤 上传封面图片...`);
                coverImage = await uploadImageToSanity(images[0]);
                await delay(300);
            }

            // 上传展览图集（最多 10 张，跳过封面）
            const galleryImages = [];
            const galleryUrls = images.slice(1, 11); // 最多取 10 张
            if (galleryUrls.length > 0) {
                console.log(`       📤 上传展览图集 (${galleryUrls.length} 张)...`);
                for (const imgUrl of galleryUrls) {
                    const img = await uploadImageToSanity(imgUrl);
                    if (img) galleryImages.push(img);
                    await delay(300);
                }
            }

            // 创建展览文档
            const doc = {
                _type: 'exhibition',
                title_en: ex.title_en,
                title_zh: ex.title_zh,
                slug: { _type: 'slug', current: ex.slug },
                artist_en: ex.artist_en || '',
                artist_zh: ex.artist_zh || '',
                description_zh: description_zh || '',
                description_en: '', // 英文描述可以之后补充
                startDate: ex.startDate,
                endDate: ex.endDate,
                status: ex.status,
                featured: false,
            };

            if (coverImage) doc.coverImage = coverImage;
            if (galleryImages.length > 0) doc.images = galleryImages;

            await client.create(doc);
            console.log(`${progress} ✅ 已导入: ${ex.title_zh} (封面: ${coverImage ? '✓' : '✗'}, 图集: ${galleryImages.length}张)\n`);
            success++;

        } catch (error) {
            console.error(`${progress} ❌ 导入失败: ${ex.title_zh} - ${error.message}\n`);
            failed++;
        }

        await delay(500);
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 导入完成！`);
    console.log(`   ✅ 成功: ${success}`);
    console.log(`   ⏭  跳过: ${skipped}`);
    console.log(`   ❌ 失败: ${failed}`);
    console.log(`   📝 总计: ${exhibitions.length}`);
    console.log(`${'='.repeat(50)}\n`);
}

importAll();
