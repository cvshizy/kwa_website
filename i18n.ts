import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'zh'] as const;
const defaultLocale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = locales.includes(requestedLocale as (typeof locales)[number])
    ? requestedLocale
    : defaultLocale;

  return {
    locale,
    messages: (await import(`./i18n/messages/${locale}.json`)).default
  };
});
