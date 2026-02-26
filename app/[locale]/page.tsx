import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ExhibitionGrid from '@/components/exhibitions/ExhibitionGrid';
import HeroSlider from '@/components/home/HeroSlider';
import { getFeaturedExhibitions } from '@/lib/data';

export const revalidate = 60;
type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations('home');

  const featuredExhibitions = await getFeaturedExhibitions(locale as 'en' | 'zh');

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider exhibitions={featuredExhibitions} />

      {/* Featured Exhibitions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('featuredExhibitions')}</h2>
          <Link
            href="/exhibitions"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            {t('viewAll')}
          </Link>
        </div>
        <ExhibitionGrid exhibitions={featuredExhibitions} />
      </section>
    </div>
  );
}
