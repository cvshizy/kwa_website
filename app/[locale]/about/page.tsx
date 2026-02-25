import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations('about');

  // Content from KWM Art Center website
  const content = locale === 'zh'
    ? `金杜艺术中心于2016年10月20日在北京CBD环球金融中心正式开幕，由金杜律师事务所鼎力支持创建。

艺术中心致力于呈现专业的当代艺术展览，并支持金杜基金会收藏国内外优秀艺术家的作品。我们通过跨学科合作，涉足时尚、设计和建筑等领域，开展多元化的艺术教育项目和课程，培养艺术爱好者，推广高品质的美学鉴赏。

作为中国当代文化的有力传播者，金杜艺术中心通过在全球办公室举办展览，以及与国际艺术机构合作，不断提升中国当代艺术的国际影响力。

地址：北京市朝阳区东三环中路1号环球金融中心东楼201室 100020
营业时间：周二至周六 10:00-19:00；周日及周一闭馆
联系方式：+86 10 56612254 | info@kwmartcenter.com`
    : `KWM Art Center officially opened on October 20, 2016, in the Global Financial Center within Beijing's CBD. The institution was founded with support from King & Wood Mallesons law firm.

The center is dedicated to presenting professional contemporary art exhibitions and supporting the KWM Foundation's collection of outstanding domestic and international artists' works. Through cross-disciplinary collaboration in fashion, design, and architecture, we conduct diverse educational programs and courses to cultivate art enthusiasts and promote high-quality aesthetic appreciation.

As a strong communicator of Chinese contemporary culture internationally, KWM Art Center enhances the global influence of Chinese contemporary art through exhibitions at our worldwide offices and collaborations with international art institutions.

Address: Room 201, East Tower, Global Financial Center, No. 1 East Third Ring Road, Chaoyang District, Beijing 100020
Hours: Tuesday-Saturday 10:00-19:00; Closed Sunday-Monday
Contact: +86 10 56612254 | info@kwmartcenter.com`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">{t('title')}</h1>

      <div className="prose prose-lg max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-line space-y-6">
          {content}
        </div>
      </div>
    </div>
  );
}
