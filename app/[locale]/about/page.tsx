import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { PortableText } from '@portabletext/react';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { getAboutContent, getTeamMembers } from '@/lib/data';

export const revalidate = 60;
type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations('about');
  const content = await getAboutContent(locale as 'en' | 'zh');
  const sortedMembers = await getTeamMembers(locale as 'en' | 'zh');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">{t('title')}</h1>

      <div className="prose prose-lg max-w-none mb-16 text-gray-700 leading-relaxed">
        <PortableText value={content} />
      </div>

      {/* Team Section */}
      {sortedMembers.length > 0 && (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('teamTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {sortedMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
