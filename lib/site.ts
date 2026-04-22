type SiteRegion = 'global' | 'cn';

const defaultSiteUrl = 'https://kwartcenter.com';
const defaultFormAction = 'https://formspree.io/f/xbdabrdw';

export const siteName = {
  zh: 'KWA金杜艺术中心',
  en: 'K&W Art Center'
} as const;

export const siteDescription = {
  zh: 'KWA金杜艺术中心 - 当代艺术空间',
  en: 'K&W Art Center - Contemporary Art Space'
} as const;

export const siteEmail = 'info@kwartcenter.com';
export const sitePhone = '+86 10 56612254';
export const siteSocialLinks = [
  'https://www.xiaohongshu.com/user/profile/631072a1000000000f004e85',
  'https://www.douyin.com/user/MS4wLjABAAAAJUfo6FESVKP4HTbA1VIwtxkA-VCoFvTyCWKxDf5M6NuCmJxZuhXMXYU7A8WrLzcg',
  'https://weibo.com/u/6029611887'
] as const;

export const siteVerification = {
  google: process.env.GOOGLE_SITE_VERIFICATION || '',
  bing: process.env.BING_SITE_VERIFICATION || '',
  baidu: process.env.BAIDU_SITE_VERIFICATION || ''
} as const;

export const siteRegion: SiteRegion =
  process.env.NEXT_PUBLIC_SITE_REGION === 'cn' ? 'cn' : 'global';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/+$/, '');

export const contactFormAction =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION || defaultFormAction;

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${siteUrl}${path}`;
}
