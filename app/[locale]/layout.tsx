import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteUrl } from '@/lib/site';
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

  const title = locale === 'zh' ? 'KWA金杜艺术中心' : 'K&W Art Center';
  const description = locale === 'zh'
    ? 'KWA金杜艺术中心 - 当代艺术空间'
    : 'K&W Art Center - Contemporary Art Space';

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

  if (!locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
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
