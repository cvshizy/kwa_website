'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { PressItem } from '@/types';

interface PressCardProps {
  press: PressItem;
}

export default function PressCard({ press }: PressCardProps) {
  const locale = useLocale() as 'en' | 'zh';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return locale === 'zh'
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // PDF 链接（优先当前语言）
  const pdfUrl = press.pdfUrl?.[locale] || press.pdfUrl?.zh || press.pdfUrl?.en || '';

  return (
    <a
      href={pdfUrl || `/press/${press.slug}`}
      target={pdfUrl ? '_blank' : undefined}
      rel={pdfUrl ? 'noopener noreferrer' : undefined}
      className="group block"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 mb-4">
        {press.coverImage ? (
          <Image
            src={press.coverImage}
            alt={press.title[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">{press.title[locale]}</span>
          </div>
        )}
        {/* PDF 标签 */}
        {pdfUrl && (
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            PDF ↗
          </div>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-400">{formatDate(press.publishDate)}</p>
        <h3 className="text-lg font-medium group-hover:text-gray-600 transition-colors line-clamp-2">
          {press.title[locale]}
        </h3>
      </div>
    </a>
  );
}
