type SiteRegion = 'global' | 'cn';

const defaultSiteUrl = 'https://kwmartcenter.com';
const defaultFormAction = 'https://formspree.io/f/xbdabrdw';

export const siteRegion: SiteRegion =
  process.env.NEXT_PUBLIC_SITE_REGION === 'cn' ? 'cn' : 'global';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/+$/, '');

export const contactFormAction =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION || defaultFormAction;

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${siteUrl}${path}`;
}

