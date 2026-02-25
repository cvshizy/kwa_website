import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import ExhibitionGrid from '@/components/exhibitions/ExhibitionGrid';
import { getFeaturedExhibitions } from '@/lib/data';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  // Get featured exhibitions
  const featuredExhibitions = await getFeaturedExhibitions(locale as 'en' | 'zh');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="pt-4">
            <Link
              href="/exhibitions"
              className="inline-block bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors"
            >
              {tCommon('learnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Exhibitions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('featuredExhibitions')}</h2>
          <Link
            href="/exhibitions"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            View All →
          </Link>
        </div>
        <ExhibitionGrid exhibitions={featuredExhibitions} />
      </section>
    </div>
  );
}
