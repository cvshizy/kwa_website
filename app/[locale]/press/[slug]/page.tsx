import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getPressItems, getPressItemBySlug } from '@/lib/data';

export const revalidate = 60;
type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const pressItems = await getPressItems('en');
  return pressItems.map((press) => ({
    slug: press.slug,
  }));
}

export default async function PressDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  unstable_setRequestLocale(locale);

  const press = await getPressItemBySlug(slug, locale as 'en' | 'zh');

  if (!press) {
    notFound();
  }

  const currentLocale = locale as 'en' | 'zh';
  const t = await getTranslations('press');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return currentLocale === 'zh'
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const pdfUrlZh = press.pdfUrl?.zh || '';
  const pdfUrlEn = press.pdfUrl?.en || '';

  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      {press.coverImage ? (
        <div className="relative h-[50vh] md:h-[60vh]">
          <Image
            src={press.coverImage}
            alt={press.title[currentLocale]}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="h-[30vh] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-lg">{press.title[currentLocale]}</span>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-4">{formatDate(press.publishDate)}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {press.title[currentLocale]}
            </h1>
            {press.summary[currentLocale] && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {press.summary[currentLocale]}
              </p>
            )}
          </div>

          {/* PDF 下载链接 */}
          {(pdfUrlZh || pdfUrlEn) && (
            <div className="flex flex-wrap gap-4 py-4 border-t border-b border-gray-200">
              {pdfUrlZh && (
                <a
                  href={pdfUrlZh}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
                >
                  📄 {currentLocale === 'zh' ? '下载中文新闻稿 (PDF)' : 'Chinese Press Release (PDF)'}
                </a>
              )}
              {pdfUrlEn && (
                <a
                  href={pdfUrlEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-black text-black text-sm hover:bg-black hover:text-white transition-colors"
                >
                  📄 {currentLocale === 'zh' ? '下载英文新闻稿 (PDF)' : 'English Press Release (PDF)'}
                </a>
              )}
            </div>
          )}

          {press.content[currentLocale] && (
            <div className="border-t border-gray-200 pt-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {press.content[currentLocale]}
                </p>
              </div>
            </div>
          )}

          <div className="pt-8">
            <Link
              href="/press"
              className="inline-block text-sm text-gray-600 hover:text-black transition-colors"
            >
              {t('backToPress')}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
