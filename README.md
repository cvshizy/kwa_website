# KWM Art Center Website

A modern, bilingual (Chinese/English) website for KWM Art Center built with Next.js 14, featuring a minimalist design and smooth user experience.

## Tech Stack

- **Next.js 14** (App Router) - React framework with server-side rendering
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization (i18n)
- **Framer Motion** - Animations and transitions
- **React 18** - UI library

## Features

- ✅ Bilingual support (English/Chinese)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ SEO optimized (meta tags, sitemap, robots.txt)
- ✅ Static site generation for optimal performance
- ✅ Modern, minimalist UI design
- ✅ Smooth animations and transitions
- ✅ Type-safe with TypeScript

## Project Structure

```
kwa_website/
├── app/
│   ├── [locale]/              # Locale-specific routes
│   │   ├── layout.tsx         # Root layout with Header/Footer
│   │   ├── page.tsx           # Homepage
│   │   ├── exhibitions/       # Exhibitions pages
│   │   ├── press/             # Press/news pages
│   │   ├── our-team/          # Team page
│   │   ├── about/             # About page
│   │   ├── careers/           # Careers page
│   │   └── contact/           # Contact page
│   ├── robots.ts              # Robots.txt configuration
│   └── sitemap.ts             # Sitemap generation
├── components/
│   ├── layout/                # Header, Footer, LanguageSwitcher
│   ├── exhibitions/           # Exhibition components
│   ├── press/                 # Press components
│   ├── team/                  # Team member components
│   └── ui/                    # Reusable UI components
├── i18n/
│   └── messages/              # Translation files (en.json, zh.json)
├── lib/
│   └── mockData.ts            # Mock data for development
├── types/
│   └── index.ts               # TypeScript type definitions
└── public/                    # Static assets

```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

## Pages

### Implemented Pages

1. **Homepage** (`/`)
   - Hero section with brand identity
   - Featured exhibitions grid (3x2 responsive layout)
   - Call-to-action buttons

2. **Exhibitions** (`/exhibitions`)
   - Filter by status (Upcoming, Current, Past)
   - Responsive grid layout
   - Exhibition detail pages with image galleries

3. **Press/News** (`/press`)
   - News article cards
   - Article detail pages with rich content

4. **Our Team** (`/our-team`)
   - Team member cards with photos
   - Bilingual names and titles
   - Grayscale hover effects

5. **About** (`/about`)
   - Organization introduction
   - Mission and values

6. **Careers** (`/careers`)
   - Job listings
   - Application information

7. **Contact** (`/contact`)
   - Contact information (address, phone, email)
   - Opening hours
   - Social media links
   - Contact form

## Internationalization

The website supports English and Chinese:
- URL structure: `/en/...` and `/zh/...`
- Automatic locale detection
- Language switcher in header
- All content localized

## Design Principles

### Visual Style
- Minimalist aesthetic with ample white space
- Black/white/gray color palette
- Large, impactful images
- Elegant typography

### Interactions
- Smooth page transitions
- Hover effects on cards
- Image lazy loading with fade-in
- Responsive navigation

## Content Management

### Current Setup

The website is configured to use **Sanity CMS** for content management with automatic fallback to mock data:

- ✅ **Sanity CMS configured** - Professional headless CMS with excellent i18n support
- ✅ **Mock data fallback** - Site works immediately even without Sanity setup
- ✅ **Bilingual content** - All content types support English and Chinese
- ✅ **Schema defined** - Ready-to-use content types in `/sanity/schemas/`

### Content Types

- **Exhibition**: bilingual title/artist/description, dates, images, status, featured flag
- **Press**: bilingual title/summary/content, cover image, publish date
- **TeamMember**: CN/EN names and titles, photo, bilingual bio, display order

### Setting Up Sanity

See **[SANITY_SETUP.md](./SANITY_SETUP.md)** for detailed setup instructions.

Quick start:
```bash
# 1. Create Sanity project at https://sanity.io
# 2. Update .env.local with your project ID
# 3. Run Sanity Studio separately or deploy to Sanity hosting
# 4. Add content through Studio interface
```

## Next Steps

### For Production Deployment

1. **Set up Sanity CMS** (Optional - see SANITY_SETUP.md)
   - Create Sanity project
   - Configure environment variables
   - Run Sanity Studio
   - Add content

2. **Configure Domain**
   - Update URLs in sitemap and metadata
   - Set up SSL certificate

3. **Add Analytics**
   - Google Analytics or alternative
   - Track user behavior

4. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Caching strategy

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

All rights reserved © KWM Art Center

## Contact

For questions or support, contact: info@kwmartcenter.com
