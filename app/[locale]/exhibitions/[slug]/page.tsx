import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { PortableText } from '@portabletext/react';
import { getExhibitionBySlug, getExhibitions } from '@/lib/data';
import ExhibitionGrid from '@/components/exhibitions/ExhibitionGrid';

export const revalidate = 60;
type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const exhibitions = await getExhibitions('en');
  return exhibitions.map((exhibition) => ({
    slug: exhibition.slug,
  }));
}

export default async function ExhibitionDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  unstable_setRequestLocale(locale);

  const exhibition = await getExhibitionBySlug(slug, locale as 'en' | 'zh');

  if (!exhibition) {
    notFound();
  }

  const t = await getTranslations('exhibitions');
  const tCommon = await getTranslations('common');
  const currentLocale = locale as 'en' | 'zh';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return currentLocale === 'zh'
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Get related exhibitions (same status, different slug)
  const allExhibitions = await getExhibitions(locale as 'en' | 'zh');
  const relatedExhibitions = allExhibitions
    .filter(ex => ex.status === exhibition.status && ex.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      {exhibition.coverImage ? (
        <div className="relative h-[60vh] md:h-[70vh]">
          <Image
            src={exhibition.coverImage}
            alt={exhibition.title[currentLocale]}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="h-[40vh] md:h-[50vh] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-lg">{exhibition.title[currentLocale]}</span>
        </div>
      )}

      {/* Exhibition Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {exhibition.title[currentLocale]}
            </h1>
            <p className="text-xl text-gray-600 mb-2">{exhibition.artist[currentLocale]}</p>
            <p className="text-sm text-gray-400">
              {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
            </p>
          </div>

          {exhibition.description?.[currentLocale] && (
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <PortableText value={exhibition.description[currentLocale]} />
            </div>
          )}

          {/* Exhibition Gallery */}
          {exhibition.images && exhibition.images.length > 0 && (
            <div className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exhibition.images.map((imageUrl: string, index: number) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={`${exhibition.title[currentLocale]} - ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8">
            <Link
              href="/exhibitions"
              className="inline-block text-sm text-gray-600 hover:text-black transition-colors"
            >
              {t('backToExhibitions')}
            </Link>
          </div>
        </div>
      </div>

      {/* Related Exhibitions */}
      {relatedExhibitions.length > 0 && (
        <div className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">{t('relatedExhibitions')}</h2>
            <ExhibitionGrid exhibitions={relatedExhibitions} />
          </div>
        </div>
      )}
    </div>
  );
}
