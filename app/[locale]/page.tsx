import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
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
  const sortedExhibitions = [...featuredExhibitions].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  const featuredList = sortedExhibitions.slice(0, 6);
  const heroTitle = t('hero.title');
  const heroSubtitle = t('hero.subtitle');
  const aboutBody = t('aboutBody');
  const heroTitleParts = locale === 'zh' ? heroTitle.split('，') : [heroTitle];
  const dateFormatter = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formatDate = (date: string) => dateFormatter.format(new Date(date));

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#ffffff_0%,#f6f7f9_55%,#eceef2_100%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl space-y-8">
              <h1 className="text-[2rem] leading-tight md:text-6xl md:leading-[1.06] font-semibold tracking-tight max-w-4xl">
                {locale === 'zh' && heroTitleParts.length > 1 ? (
                  <>
                    {heroTitleParts[0]}，
                    <br />
                    {heroTitleParts.slice(1).join('，')}
                  </>
                ) : locale === 'en' ? (
                  splitWithLineBreak(heroTitle, 'A quiet force of contemporary art')
                ) : (
                  heroTitle
                )}
              </h1>
              <p className="text-base md:text-xl text-black/70 max-w-2xl leading-relaxed">
                {locale === 'en'
                  ? splitWithLineBreak(heroSubtitle, 'K&W Art Center presents exhibitions and public programs')
                  : heroSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/exhibitions?status=current"
                  className="inline-flex items-center justify-center rounded-full bg-black text-white text-sm px-6 py-3 transition-colors hover:bg-black/85"
                >
                  {t('primaryCta')}
                </Link>
                <Link
                  href="/exhibitions"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/80 backdrop-blur text-sm px-6 py-3 transition-colors hover:bg-white"
                >
                  {t('secondaryCta')}
                </Link>
              </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-14 md:pb-20">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">{t('featuredExhibitions')}</h2>
          <Link href="/exhibitions" className="text-sm text-black/60 hover:text-black transition-colors">
            {t('viewAll')}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {featuredList.map((exhibition) => (
            <Link
              key={exhibition.id}
              href={`/exhibitions/${exhibition.slug}`}
              className="group block rounded-[22px] bg-white/80 backdrop-blur border border-black/5 p-3"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-black/5">
                {exhibition.coverImage && (
                  <Image
                    src={exhibition.coverImage}
                    alt={exhibition.title[locale as 'en' | 'zh']}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
              <div className="pt-4 px-1 pb-1 space-y-2">
                <h3 className="text-base md:text-lg font-medium leading-snug">
                  {exhibition.title[locale as 'en' | 'zh']}
                </h3>
                <p className="text-xs md:text-sm text-black/55">
                  {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-24">
        <div className="rounded-[28px] border border-black/5 bg-white/70 backdrop-blur p-8 md:p-12">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">{t('aboutTitle')}</h2>
          <p className="text-black/70 text-base md:text-lg max-w-3xl leading-relaxed mb-7">
            {locale === 'en'
              ? splitWithLineBreak(
                aboutBody,
                'Since 2016, we have advanced contemporary art presentation, research, and public dialogue'
              )
              : aboutBody}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm transition-colors hover:bg-black hover:text-white"
          >
            {t('aboutCta')}
          </Link>
        </div>
      </section>
    </div>
  );
}

function splitWithLineBreak(text: string, marker: string) {
  if (!text.startsWith(marker)) return text;

  const rest = text.slice(marker.length).trimStart();
  return (
    <>
      {marker}
      <br />
      {rest}
    </>
  );
}
