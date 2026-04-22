import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // Force the root URL to land on Chinese by default
  defaultLocale: 'zh',
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const redirectUrl = new URL(`/zh${request.nextUrl.search}`, request.url);
    return NextResponse.redirect(redirectUrl, 308);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
