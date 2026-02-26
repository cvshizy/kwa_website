'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ExhibitionFilterProps {
  selectedStatus: 'all' | 'upcoming' | 'current' | 'past';
}

export default function ExhibitionFilter({ selectedStatus }: ExhibitionFilterProps) {
  const t = useTranslations('exhibitions');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = [
    { value: 'all' as const, label: t('all') },
    { value: 'current' as const, label: t('current') },
    { value: 'upcoming' as const, label: t('upcoming') },
    { value: 'past' as const, label: t('past') },
  ];

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleStatusChange(filter.value)}
          className={`px-6 py-2 text-sm transition-colors ${
            selectedStatus === filter.value
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
