'use client';

import { useTranslations } from 'next-intl';
import { Exhibition } from '@/types';
import ExhibitionCard from './ExhibitionCard';

interface ExhibitionGridProps {
  exhibitions: Exhibition[];
}

export default function ExhibitionGrid({ exhibitions }: ExhibitionGridProps) {
  const t = useTranslations('exhibitions');

  if (exhibitions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t('noExhibitions')}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {exhibitions.map((exhibition) => (
        <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
      ))}
    </div>
  );
}
