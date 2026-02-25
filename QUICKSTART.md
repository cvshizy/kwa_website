# Quick Start Guide

## Getting the Website Running (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**That's it!** The website is now running with mock data.

---

## View in Both Languages

- **English:** http://localhost:3000/en
- **Chinese:** http://localhost:3000/zh

The language switcher in the header also works.

---

## Adding Real Content (Optional)

The site currently uses mock data from `/lib/mockData.ts`. To use Sanity CMS:

### Quick Sanity Setup (15 minutes)

1. **Create Sanity account:** [sanity.io](https://sanity.io) (free)

2. **Create a project:**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Click "Create Project"
   - Name: "KWM Art Center"
   - Note your Project ID

3. **Update environment variables:**
   ```bash
   # Edit .env.local
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
   ```

4. **Set up Sanity Studio:**
   ```bash
   # Install Sanity CLI
   npm install -g @sanity/cli

   # Login
   sanity login

   # Create studio in separate folder
   cd ..
   mkdir kwa-studio && cd kwa-studio
   sanity init

   # Use existing project (select your KWM project)
   # Copy schemas
   cp -r ../kwa_website/sanity ./

   # Start studio
   sanity dev
   ```

5. **Add content:**
   - Open http://localhost:3333
   - Create exhibitions, press items, team members
   - Fill in both English and Chinese fields

6. **Restart website:**
   ```bash
   cd ../kwa_website
   npm run dev
   ```

Your content from Sanity will now appear on the website!

**Detailed instructions:** See [SANITY_SETUP.md](./SANITY_SETUP.md)

---

## Building for Production

```bash
# Build the site
npm run build

# Run production server
npm start
```

---

## Project Structure

```
kwa_website/
├── app/[locale]/          # All pages (bilingual)
│   ├── page.tsx           # Homepage
│   ├── exhibitions/       # Exhibitions pages
│   ├── press/             # Press pages
│   ├── our-team/          # Team page
│   ├── about/             # About page
│   ├── careers/           # Careers page
│   └── contact/           # Contact page
├── components/            # React components
├── lib/
│   ├── data.ts           # Data fetching (Sanity + fallback)
│   ├── sanity.client.ts  # Sanity client config
│   ├── sanity.queries.ts # Sanity queries
│   └── mockData.ts       # Mock/fallback data
├── sanity/schemas/        # Sanity content schemas
├── i18n/messages/         # Translations (en.json, zh.json)
└── types/                 # TypeScript types
```

---

## Common Tasks

### Change Mock Data
Edit `/lib/mockData.ts` to update sample exhibitions, press, or team members.

### Add Translations
Edit `/i18n/messages/en.json` and `/i18n/messages/zh.json`

### Customize Styles
- Colors: `/tailwind.config.ts`
- Global styles: `/app/globals.css`
- Component styles: Use Tailwind classes

### Add New Pages
1. Create in `/app/[locale]/your-page/page.tsx`
2. Add navigation link in `/components/layout/Header.tsx`
3. Add translations to i18n message files

---

## Need Help?

- **Development Guide:** [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Sanity Setup:** [SANITY_SETUP.md](./SANITY_SETUP.md)
- **Full Documentation:** [README.md](./README.md)

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
5. Deploy!

Your site will be live in minutes.

---

## What's Included

✅ **7 Pages:** Home, Exhibitions, Press, Team, About, Careers, Contact
✅ **Bilingual:** Full English & Chinese support
✅ **Responsive:** Mobile, tablet, desktop optimized
✅ **CMS Ready:** Sanity integration with fallback
✅ **SEO Optimized:** Meta tags, sitemap, robots.txt
✅ **Animations:** Smooth transitions with Framer Motion
✅ **Type Safe:** Full TypeScript support
✅ **Fast:** Static site generation (SSG)

---

**Ready to customize? See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guides!**
