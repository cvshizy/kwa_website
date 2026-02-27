import { MetadataRoute } from 'next';
import { getExhibitions, getPressItems } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kwmartcenter.com';
  const locales = ['en', 'zh'];
  const [exhibitions, pressItems] = await Promise.all([
    getExhibitions('zh'),
    getPressItems('zh'),
  ]);

  // Static pages
  const staticPages = ['', '/exhibitions', '/press', '/our-team', '/about', '/careers', '/contact'];
  const staticUrls = staticPages.flatMap(page =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  // Exhibition pages
  const exhibitionUrls = exhibitions.flatMap(exhibition =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/exhibitions/${exhibition.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // Press pages
  const pressUrls = pressItems.flatMap(press =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/press/${press.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticUrls, ...exhibitionUrls, ...pressUrls];
}
