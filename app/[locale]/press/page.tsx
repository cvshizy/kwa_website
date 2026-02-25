import { getTranslations } from 'next-intl/server';
import PressCard from '@/components/press/PressCard';
import { getPressItems } from '@/lib/data';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PressPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations('press');
  const pressItems = await getPressItems(locale as 'en' | 'zh');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {pressItems.map((press) => (
          <PressCard key={press.id} press={press} />
        ))}
      </div>
    </div>
  );
}
