import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  absoluteUrl,
  siteDescription,
  siteEmail,
  siteName,
  sitePhone,
  siteSocialLinks,
  siteUrl,
  siteVerification
} from '@/lib/site';
import "../globals.css";

const locales = ['en', 'zh'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as 'en' | 'zh';

  const title = siteName[currentLocale];
  const description = siteDescription[currentLocale];
  const otherVerification = {
    ...(siteVerification.bing ? { 'msvalidate.01': siteVerification.bing } : {}),
    ...(siteVerification.baidu ? { 'baidu-site-verification': siteVerification.baidu } : {})
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    keywords: locale === 'zh'
      ? '艺术中心,当代艺术,展览,艺术家,北京'
      : 'art center, contemporary art, exhibitions, artists, Beijing',
    authors: [{ name: 'K&W Art Center' }],
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: siteUrl,
      siteName: title,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    verification: {
      google: siteVerification.google || undefined,
      other: Object.keys(otherVerification).length > 0 ? otherVerification : undefined
    },
    icons: {
      icon: [
        { url: '/favicon-kwnew-v2.ico', sizes: 'any' },
        { url: '/icon-kwnew-v2.png', type: 'image/png' }
      ],
      shortcut: '/favicon-kwnew-v2.ico',
      apple: [
        { url: '/apple-touch-icon-kwnew-v2.png' },
        { url: '/apple-touch-icon-precomposed-kwnew-v2.png' }
      ]
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  const currentLocale = locale as 'en' | 'zh';

  if (!locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}#organization`,
        name: siteName[currentLocale],
        alternateName: currentLocale === 'zh' ? siteName.en : siteName.zh,
        url: siteUrl,
        logo: absoluteUrl('/icon-kwnew-v2.png'),
        email: siteEmail,
        telephone: sitePhone,
        sameAs: [...siteSocialLinks],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '北京市朝阳区东三环中路1号环球金融中心东楼201室',
          addressLocality: '北京',
          addressRegion: '北京',
          postalCode: '100020',
          addressCountry: 'CN'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: siteUrl,
        name: siteName[currentLocale],
        description: siteDescription[currentLocale],
        inLanguage: currentLocale === 'zh' ? 'zh-CN' : 'en-US',
        publisher: {
          '@id': `${siteUrl}#organization`
        }
      }
    ]
  };

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
