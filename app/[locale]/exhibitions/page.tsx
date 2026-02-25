import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ExhibitionGrid from '@/components/exhibitions/ExhibitionGrid';
import ExhibitionFilter from '@/components/exhibitions/ExhibitionFilter';
import { getExhibitions } from '@/lib/data';

export const revalidate = 60;
type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
};

export default async function ExhibitionsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const { status } = await searchParams;

  const t = await getTranslations('exhibitions');

  // Get all exhibitions
  const exhibitions = await getExhibitions(locale as 'en' | 'zh');

  // Filter exhibitions based on status
  const selectedStatus = (status as 'all' | 'upcoming' | 'current' | 'past') || 'all';
  const filteredExhibitions = selectedStatus === 'all'
    ? exhibitions
    : exhibitions.filter(ex => ex.status === selectedStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">{t('title')}</h1>

      <ExhibitionFilter
        selectedStatus={selectedStatus}
      />

      <ExhibitionGrid exhibitions={filteredExhibitions} />
    </div>
  );
}
