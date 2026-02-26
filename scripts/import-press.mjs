/**
 * 从旧网站批量导入新闻稿到 Sanity
 * 包含中英文标题、PDF链接、封面图片（复用对应展览图片）、日期
 *
 * 使用方法:
 *   SANITY_WRITE_TOKEN=你的Token node scripts/import-press.mjs
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 96);
}

// ============================================================
// 新闻稿数据（从旧网站中英文页面整理）
// ============================================================

const pressItems = [
    {
        title_zh: '国际艺术家电影系列放映 9',
        title_en: 'Artists\' Film International Screening 9',
        publishDate: '2020-08-13',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/09/20200813-%E5%9B%BD%E9%99%85%E8%89%BA%E6%9C%AF%E5%AE%B6%E7%94%B5%E5%BD%B1%E7%B3%BB%E5%88%97%E6%94%BE%E6%98%A0-9-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/09/20200813-Artists%E2%80%99-Film-International-9-Press-Release-EN.pdf',
    },
    {
        title_zh: '张弓：启示录',
        title_en: 'Zhang Gong: Revelations',
        publishDate: '2020-08-13',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/08/20200813-%E5%BC%A0%E5%BC%93%E4%B8%AA%E5%B1%95-%E5%90%AF%E7%A4%BA%E5%BD%95-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/08/20200813-Zhang-Gong-Revelations-Press-Release-EN.pdf',
    },
    {
        title_zh: '国际艺术家电影系列放映 8',
        title_en: 'Artists\' Film International Screening 8',
        publishDate: '2020-07-07',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/09/20200707-%E5%9B%BD%E9%99%85%E8%89%BA%E6%9C%AF%E5%AE%B6%E7%94%B5%E5%BD%B1%E7%B3%BB%E5%88%97%E6%94%BE%E6%98%A0-8-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/09/20200707-Artists%E2%80%99-Film-International-8-Press-Release-EN.pdf',
    },
    {
        title_zh: '也是郭凤怡',
        title_en: 'This Too Is Guo Fengyi',
        publishDate: '2020-06-03',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/05/20200603-%E4%B9%9F%E6%98%AF%E9%83%AD%E5%87%A4%E6%80%A1-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/05/20200603-This-Too-is-Guo-Fengyi-Press-Release-EN.pdf',
    },
    {
        title_zh: '国际艺术家电影系列放映 7',
        title_en: 'Artists\' Film International Screening 7',
        publishDate: '2020-05-18',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/09/20200518-%E5%9B%BD%E9%99%85%E8%89%BA%E6%9C%AF%E5%AE%B6%E7%94%B5%E5%BD%B1%E7%B3%BB%E5%88%97%E6%94%BE%E6%98%A07-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/09/20200518-Artists%E2%80%99-Film-International-7-Press-Release-EN.pdf',
    },
    {
        title_zh: '国际艺术家电影系列放映 6',
        title_en: 'Artists\' Film International Screening 6',
        publishDate: '2020-04-27',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/09/20200427-%E5%9B%BD%E9%99%85%E8%89%BA%E6%9C%AF%E5%AE%B6%E7%94%B5%E5%BD%B1%E7%B3%BB%E5%88%97%E6%94%BE%E6%98%A06-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/09/20200427-Artists%E2%80%99-Film-International-6-Press-Release-EN.pdf',
    },
    {
        title_zh: '虚拟影院《联级防御》',
        title_en: 'Online Cinema Defence Cascade',
        publishDate: '2020-04-14',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/04/20200414-%E5%93%88%E9%87%8C%E6%A3%AE%C2%B7%E7%9A%AE%E5%B0%94%E6%96%AF%E3%80%8A%E8%81%94%E7%BA%A7%E9%98%B2%E5%BE%A1%E3%80%8B-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/04/20200414-Harrison-Pearce-Defence-Cascade-Press-Release-EN.pdf',
    },
    {
        title_zh: '月球与刀',
        title_en: 'A Knife on the Moon',
        publishDate: '2020-03-18',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/03/20200318-%E8%BE%BE%E9%87%8C%E5%A5%A5%C2%B7%E5%8F%A4%E5%A5%87%E6%AC%A7-%E6%9C%88%E7%90%83%E4%B8%8E%E5%88%80-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/03/20200318-Dario-Guccio-A-Knife-on-the-moon-Press-Release-EN.pdf',
    },
    {
        title_zh: '虚拟影院《密封二极管》',
        title_en: 'Online Cinema Hermetic Diode',
        publishDate: '2020-03-08',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/03/20200308-%E9%99%86%E6%B5%A9%E6%98%8E%E3%80%8A%E5%AF%86%E5%B0%81%E4%BA%8C%E6%9E%81%E7%AE%A1%E3%80%8B-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/03/20200308-Andrew-Luk-Hermetic-Diode-Press-Release-EN.pdf',
    },
    {
        title_zh: '线上项目 152020',
        title_en: 'Online Project 152020',
        publishDate: '2020-03-07',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2020/03/152020-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2020/03/152020-Press-Release-EN.pdf',
    },
    {
        title_zh: '国际艺术家电影系列放映 5',
        title_en: 'Artists\' Film International Screening 5',
        publishDate: '2019-12-24',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/12/20191224-%E5%9B%BD%E9%99%85%E8%89%BA%E6%9C%AF%E5%AE%B6%E7%94%B5%E5%BD%B1%E7%B3%BB%E5%88%97%E6%94%BE%E6%98%A05-%E6%96%B0%E9%97%BB%E7%A8%BFCN.docx',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/12/20191224-Artists%E2%80%99-Film-International-5-Press-Release-EN.docx',
    },
    {
        title_zh: '吴俊勇：山海不惊',
        title_en: 'Wu Junyong: Where are the Fantastic Beasts?',
        publishDate: '2019-12-13',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/12/20191213-%E5%90%B4%E4%BF%8A%E5%8B%87%E3%80%8A%E5%B1%B1%E6%B5%B7%E4%B8%8D%E6%83%8A%E3%80%8B-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/12/20191213-Wu-Junyong-Solo-Exhibition-Press-Release-EN.pdf',
    },
    {
        title_zh: '2019年伦敦电影贾曼奖艺术电影展映',
        title_en: 'Film London Jarman Award 2019',
        publishDate: '2019-10-31',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/10/20191031-%E4%BC%A6%E6%95%A6%E7%94%B5%E5%BD%B1%E8%B4%BE%E6%9B%BC%E5%A5%96%E8%89%BA%E6%9C%AF%E7%94%B5%E5%BD%B1%E5%B1%95%E6%98%A0-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/10/20191031-Film-London-Jarman-Award-2019-Press-Release-EN-1.pdf',
    },
    {
        title_zh: '国际艺术家电影系列放映 4',
        title_en: 'Artists\' Film International Screening 4',
        publishDate: '2019-09-05',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/09/20190905-%E5%9B%BD%E9%99%85%E8%89%BA%E6%9C%AF%E5%AE%B6%E7%94%B5%E5%BD%B1%E7%B3%BB%E5%88%97%E6%94%BE%E6%98%A04-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/09/20190905-Artists%E2%80%99-Film-International-4-Press-Release-EN.pdf',
    },
    {
        title_zh: '陈英个展',
        title_en: 'Chen Ying Solo Exhibition',
        publishDate: '2019-08-28',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/08/20190828-%E9%99%88%E8%8B%B1-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/08/20190828-Chen-Ying-Solo-Exhibition-Press-Release-EN.pdf',
    },
    {
        title_zh: '四种夏天',
        title_en: 'Four Types of Summer',
        publishDate: '2019-08-01',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/07/20190801-%E5%9B%9B%E7%A7%8D%E5%A4%8F%E5%A4%A9-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/07/20190801-Four-Types-of-Summer-Press-Release-EN.pdf',
    },
    {
        title_zh: '李涛：次生',
        title_en: 'Li Tao: Secondary',
        publishDate: '2019-05-29',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/05/20190529%E6%9D%8E%E6%B6%9B%E4%B8%AA%E5%B1%95-%E6%AC%A1%E7%94%9F-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/05/20190529-Li-Tao-Secondary-Press-Release-EN.pdf',
    },
    {
        title_zh: '国际艺术家电影系列放映 2',
        title_en: 'Artists\' Film International Screening 2',
        publishDate: '2019-04-18',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/04/20190418-%E5%9B%BD%E9%99%85%E8%89%BA%E6%9C%AF%E5%AE%B6%E7%94%B5%E5%BD%B1%E7%B3%BB%E5%88%97%E6%94%BE%E6%98%A02-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/04/20190418-Artists%E2%80%99-Film-International-2-Press-Release-EN.pdf',
    },
    {
        title_zh: '瑞纳斯·凡·德·维尔德 丨 殖民地',
        title_en: 'Rinus Van de Velde | The Colony',
        publishDate: '2019-03-20',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/03/20190320%E7%91%9E%E7%BA%B3%E6%96%AF%C2%B7%E5%87%A1%C2%B7%E5%BE%B7%C2%B7%E7%BB%B4%E5%B0%94%E5%BE%B7-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/03/20190320-Rinus-Van-de-Velde-Press-Release-EN.pdf',
    },
    {
        title_zh: '国际艺术家电影系列放映 1',
        title_en: 'Artists\' Film International Screening 1',
        publishDate: '2019-02-26',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2019/02/20190226-%E5%9B%BD%E9%99%85%E8%89%BA%E6%9C%AF%E5%AE%B6%E7%94%B5%E5%BD%B1%E7%B3%BB%E5%88%97%E6%94%BE%E6%98%A0-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2019/02/20190226-Artists%E2%80%99-Film-International-Press-Release-EN.pdf',
    },
    {
        title_zh: '蕾切尔·麦克莱恩',
        title_en: 'Rachel Maclean',
        publishDate: '2018-11-15',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/11/20181115-%E8%95%BE%E5%88%87%E5%B0%94%C2%B7%E9%BA%A6%E5%85%8B%E8%8E%B1%E6%81%A9-%E9%87%91%E6%9D%9C%E8%89%BA%E6%9C%AF%E4%B8%AD%E5%BF%83-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/11/20181115-Rachel-Maclean-Press-Release-EN-1.pdf',
    },
    {
        title_zh: '后南宋王朝',
        title_en: 'The Post Southern Song Dynasty',
        publishDate: '2018-09-15',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/09/20180915-%E5%90%8E%E5%8D%97%E5%AE%8B%E7%8E%8B%E6%9C%9D%E6%96%B0%E9%97%BB%E7%A8%BFCN-1.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/09/20180915-The-Post-Southern-Song-Dynasty-EN.pdf',
    },
    {
        title_zh: '张鼎：安全屋',
        title_en: 'Zhang Ding: Safe House',
        publishDate: '2018-08-04',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/07/20180804-%E5%BC%A0%E9%BC%8E%EF%BC%9A%E5%AE%89%E5%85%A8%E5%B1%8B%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/07/20180804-Zhang-Ding-Safe-House-Press-Release-EN.pdf',
    },
    {
        title_zh: '郑皓中：日照朱家角',
        title_en: 'Zheng Haozhong: Sun Shining on Zhujiajiao',
        publishDate: '2018-06-06',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/06/20180606-%E9%83%91%E7%9A%93%E4%B8%AD%EF%BC%9A%E6%97%A5%E7%85%A7%E6%9C%B1%E5%AE%B6%E8%A7%92-%E6%96%B0%E9%97%BB%E7%A8%BF-CN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/06/20180606-Zhen-Haozhong-Sun-shining-on-Zhujiajiao-Press-Release-EN.pdf',
    },
    {
        title_zh: '阿马利娅·乌尔曼：优越',
        title_en: 'Amalia Ulman: Privilege',
        publishDate: '2018-03-08',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20180308-%E9%98%BF%E9%A9%AC%E5%88%A9%E5%A8%85%C2%B7%E4%B9%8C%E5%B0%94%E6%9B%BC%EF%BC%9A%E4%BC%98%E8%B6%8A-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20180308-Amalia-Ulman-Privilege-Press-Release-EN.pdf',
    },
    {
        title_zh: '赵刚：若愚 – 金杜收藏展',
        title_en: 'Zhao Gang: Comfortably Dumb',
        publishDate: '2017-12-15',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20171215%E8%B5%B5%E5%88%9A%EF%BC%9A%E8%8B%A5%E6%84%9A-%E9%87%91%E6%9D%9C%E6%94%B6%E8%97%8F%E5%B1%95%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20171215Zhao-Gang-Comfortably-Dumb-PR-EN.pdf',
    },
    {
        title_zh: '植物、气球与钟形罩',
        title_en: 'Plants, Balloons and Bell Jars',
        publishDate: '2017-10-27',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20171027%E6%A4%8D%E7%89%A9%E3%80%81%E6%B0%94%E7%90%83%E4%B8%8E%E9%92%9F%E5%BD%A2%E7%BD%A9%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20171027Plants-Balloons-and-Bell-Jars-PR-EN.pdf',
    },
    {
        title_zh: '影像上海艺博会焦点版块 – 任航',
        title_en: 'PFSH Spotlight – Ren Hang',
        publishDate: '2017-09-06',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20170906%E5%BD%B1%E5%83%8F%E4%B8%8A%E6%B5%B7%E8%89%BA%E5%8D%9A%E4%BC%9A%E7%84%A6%E7%82%B9%E7%89%88%E5%9D%97-%E4%BB%BB%E8%88%AA-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20170906PFSH-Spotlight-Renhang-EN.pdf',
    },
    {
        title_zh: '环中 – 自然追随抽象',
        title_en: 'Huan Zhong – Nature Follows Abstraction',
        publishDate: '2017-08-03',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20170803%E7%8E%AF%E4%B8%AD%E2%80%94%E8%87%AA%E7%84%B6%E8%BF%BD%E9%9A%8F%E6%8A%BD%E8%B1%A1%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20170803Huan-Zhong-Nature-Follows-Abstraction-PR-EN.pdf',
    },
    {
        title_zh: '无须之美',
        title_en: 'Beauty Without Beards',
        publishDate: '2017-01-06',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20170106-%E6%97%A0%E9%A1%BB%E4%B9%8B%E7%BE%8E-%E6%96%B0%E9%97%BB%E7%A8%BFCN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20170106-Beauty-Without-Beards-Press-Release-EN.pdf',
    },
    {
        title_zh: '不足为外人道也',
        title_en: 'Somewhere Only We Know',
        publishDate: '2016-10-21',
        pdfUrl_zh: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20161021%E4%B8%8D%E8%B6%B3%E4%B8%BA%E5%A4%96%E4%BA%BA%E9%81%93%E4%B9%9F-%E6%96%B0%E9%97%BB%E7%A8%BF-CN.pdf',
        pdfUrl_en: 'http://kwmartcenter.com/wp-content/uploads/2018/03/20161021Somewhere-Only-We-Know-Press-Release-EN.pdf',
    },
];

// ============================================================
// 主导入函数
// ============================================================

async function importPress() {
    console.log(`\n🚀 开始导入 ${pressItems.length} 个新闻稿到 Sanity...\n`);

    // 获取已有展览的封面图片，用于复用
    const exhibitions = await client.fetch(
        `*[_type == "exhibition"]{ title_zh, "coverImageRef": coverImage.asset._ref }`
    );
    const exhibitionImageMap = {};
    exhibitions.forEach(ex => {
        if (ex.title_zh && ex.coverImageRef) {
            exhibitionImageMap[ex.title_zh] = ex.coverImageRef;
        }
    });
    console.log(`📎 找到 ${Object.keys(exhibitionImageMap).length} 个可复用的展览封面\n`);

    let success = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < pressItems.length; i++) {
        const item = pressItems[i];
        const progress = `[${i + 1}/${pressItems.length}]`;
        const slug = slugify(item.title_en);

        try {
            // 检查是否已存在
            const exists = await client.fetch(
                `*[_type == "press" && slug.current == $slug][0]`,
                { slug }
            );
            if (exists) {
                console.log(`${progress} ⏭  已存在: ${item.title_zh}`);
                skipped++;
                continue;
            }

            // 尝试从对应展览复用封面图片
            let coverImage = null;
            // 尝试精确和模糊匹配
            for (const [exTitle, imageRef] of Object.entries(exhibitionImageMap)) {
                if (item.title_zh.includes(exTitle) || exTitle.includes(item.title_zh) ||
                    item.title_zh.replace(/[：:]/g, '').includes(exTitle.replace(/[：:]/g, ''))) {
                    coverImage = {
                        _type: 'image',
                        asset: { _type: 'reference', _ref: imageRef },
                    };
                    break;
                }
            }

            const doc = {
                _type: 'press',
                title_en: item.title_en,
                title_zh: item.title_zh,
                slug: { _type: 'slug', current: slug },
                summary_zh: `${item.title_zh} 新闻稿`,
                summary_en: `${item.title_en} Press Release`,
                content_zh: `请查看 PDF 新闻稿获取完整内容。`,
                content_en: `Please refer to the PDF press release for full content.`,
                pdfUrl_zh: item.pdfUrl_zh || '',
                pdfUrl_en: item.pdfUrl_en || '',
                publishDate: item.publishDate,
            };

            if (coverImage) doc.coverImage = coverImage;

            await client.create(doc);
            console.log(`${progress} ✅ 已导入: ${item.title_zh} ${coverImage ? '(封面 ✓)' : '(无封面)'}`);
            success++;
        } catch (error) {
            console.error(`${progress} ❌ 失败: ${item.title_zh} - ${error.message}`);
            failed++;
        }

        await delay(300);
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 新闻稿导入完成！`);
    console.log(`   ✅ 成功: ${success}`);
    console.log(`   ⏭  跳过: ${skipped}`);
    console.log(`   ❌ 失败: ${failed}`);
    console.log(`   📝 总计: ${pressItems.length}`);
    console.log(`${'='.repeat(50)}\n`);
}

importPress();
