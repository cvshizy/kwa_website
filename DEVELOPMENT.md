# Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Status

### ✅ Completed Features

1. **Core Infrastructure**
   - Next.js 14 with App Router
   - TypeScript configuration
   - Tailwind CSS setup
   - Bilingual support (EN/ZH)

2. **Layout Components**
   - Responsive header with navigation
   - Footer with contact info
   - Language switcher
   - Mobile-friendly design

3. **Pages**
   - Homepage with featured exhibitions
   - Exhibitions list with filtering
   - Exhibition detail pages
   - Press/news list and detail pages
   - Team page
   - About, Careers, Contact pages

4. **UI Components**
   - ExhibitionCard with hover effects
   - ExhibitionGrid (responsive 3-column layout)
   - ExhibitionFilter (status filtering)
   - PressCard
   - TeamMemberCard (grayscale hover effect)
   - FadeIn animation component
   - PageTransition component

5. **SEO & Performance**
   - Meta tags with Open Graph and Twitter Cards
   - Robots.txt configuration
   - Sitemap generation
   - Static site generation (SSG)
   - Image optimization with next/image

### 🚧 Pending

1. **Strapi CMS Setup** (Task #3)
   - Requires separate server installation
   - Content type creation
   - API integration
   - Currently using mock data

## Adding New Content

### Using Mock Data

Edit `/lib/mockData.ts` to add new:
- Exhibitions
- Press articles
- Team members

### Preparing for Strapi

The data structure in `/types/index.ts` is designed to match Strapi's structure:

```typescript
// Exhibitions
interface Exhibition {
  id: string;
  slug: string;
  title: LocalizedContent;  // { en: string, zh: string }
  artist: LocalizedContent;
  description: LocalizedContent;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'current' | 'past';
  coverImage: string;
  images: string[];
  featured: boolean;
}
```

## Customization

### Colors

Update `/tailwind.config.ts` for color scheme changes. Current palette:
- Black: `#000000` (text, buttons)
- White: `#FFFFFF` (background)
- Gray scale for secondary elements

### Typography

Fonts are configured in `/app/globals.css`:
- Sans-serif: Inter (English), Apple system fonts (Chinese)
- Sizes defined by Tailwind's default scale

### Layout Breakpoints

Responsive breakpoints (Tailwind defaults):
- sm: 640px (mobile)
- md: 768px (tablet)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)

## Adding Translations

Edit translation files in `/i18n/messages/`:

**English** (`en.json`):
```json
{
  "nav": {
    "newPage": "New Page"
  }
}
```

**Chinese** (`zh.json`):
```json
{
  "nav": {
    "newPage": "新页面"
  }
}
```

Then use in components:
```typescript
const t = useTranslations('nav');
return <div>{t('newPage')}</div>;
```

## Adding New Pages

1. Create page in `/app/[locale]/your-page/page.tsx`:

```typescript
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function YourPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <div>Your content</div>;
}
```

2. Add navigation link in `/components/layout/Header.tsx`

3. Add translations for the page title

## Image Guidelines

### Requirements
- Use high-quality images (minimum 1200px width)
- Optimize before uploading (use tools like ImageOptim)
- Supported formats: JPG, PNG, WebP

### Sizes
- Exhibition covers: 800x1200px (3:4 aspect ratio)
- Press covers: 800x600px (16:9 aspect ratio)
- Team photos: 400x400px (square)

### Using next/image

```typescript
<Image
  src="/path/to/image.jpg"
  alt="Description"
  fill  // or width/height
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Performance Tips

1. **Image Optimization**
   - Always use next/image
   - Specify sizes prop for responsive images
   - Use WebP format when possible

2. **Code Splitting**
   - Use dynamic imports for large components
   - Mark client components with 'use client' directive

3. **Caching**
   - Static pages are pre-rendered at build time
   - Use revalidation for dynamic content

## Testing Checklist

- [ ] All pages load correctly in both languages
- [ ] Language switcher works on all pages
- [ ] Navigation highlights active page
- [ ] Images load and display correctly
- [ ] Hover effects work smoothly
- [ ] Mobile responsive layout works
- [ ] Contact form (if implemented) submits
- [ ] Filter functionality on exhibitions page
- [ ] SEO meta tags present on all pages

## Common Issues

### Build Errors

**Issue**: "No locale was returned from getRequestConfig"
**Solution**: Ensure all server components use `setRequestLocale(locale)`

**Issue**: Images not loading
**Solution**: Check `next.config.js` remotePatterns configuration

### Development

**Issue**: Hot reload not working
**Solution**: Restart dev server with `npm run dev`

**Issue**: Translations not updating
**Solution**: Clear `.next` folder and rebuild

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://kwmartcenter.com
STRAPI_API_URL=http://localhost:1337
```

## Next Steps for Production

1. **Strapi Setup**
   - Install Strapi in separate directory
   - Create content types
   - Add sample content
   - Configure API permissions

2. **API Integration**
   - Create `/lib/api.ts` with fetch functions
   - Replace mock data imports
   - Add error handling
   - Implement data revalidation

3. **Analytics**
   - Add Google Analytics
   - Set up conversion tracking
   - Monitor page performance

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Performance monitoring
   - Uptime monitoring

## Support

For questions or issues, refer to:
- Next.js Docs: https://nextjs.org/docs
- next-intl Docs: https://next-intl.dev
- Tailwind CSS Docs: https://tailwindcss.com/docs
