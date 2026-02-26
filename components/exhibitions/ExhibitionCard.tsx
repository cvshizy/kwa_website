'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Exhibition } from '@/types';

interface ExhibitionCardProps {
  exhibition: Exhibition;
}

export default function ExhibitionCard({ exhibition }: ExhibitionCardProps) {
  const locale = useLocale() as 'en' | 'zh';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return locale === 'zh'
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Link href={`/exhibitions/${exhibition.slug}`} className="group block">
      <div className="relative aspect-[17/9] overflow-hidden bg-gray-100 mb-4">
        {exhibition.coverImage ? (
          <Image
            src={exhibition.coverImage}
            alt={exhibition.title[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm text-center px-4">{exhibition.title[locale]}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium group-hover:text-gray-600 transition-colors">
          {exhibition.title[locale]}
        </h3>
        <p className="text-sm text-gray-600">{exhibition.artist[locale]}</p>
        <p className="text-xs text-gray-400">
          {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
        </p>
      </div>
    </Link>
  );
}
