'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { TeamMember } from '@/types';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const locale = useLocale() as 'en' | 'zh';

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
        <Image
          src={member.photo}
          alt={locale === 'zh' ? member.nameCN : member.nameEN}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-medium">
          {locale === 'zh' ? member.nameCN : member.nameEN}
        </h3>
        <p className="text-sm text-gray-600">
          {locale === 'zh' ? member.titleCN : member.titleEN}
        </p>
      </div>
    </div>
  );
}
