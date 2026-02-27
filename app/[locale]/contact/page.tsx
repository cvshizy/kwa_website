import { unstable_setRequestLocale } from 'next-intl/server';
import ContactPageClient from '@/components/contact/ContactPageClient';
import { getContactContent } from '@/lib/data';

export const revalidate = 60;
type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const contactContent = await getContactContent();

  return (
    <ContactPageClient
      locale={locale as 'en' | 'zh'}
      content={contactContent}
    />
  );
}
