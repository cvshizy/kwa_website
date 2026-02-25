# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for the KWM Art Center website.

## Overview

The website is configured to use Sanity CMS for content management, but falls back to mock data if Sanity isn't configured. This means the site works immediately without setup, and you can add Sanity later.

## Prerequisites

- Node.js 18+ installed
- A Sanity account (free at [sanity.io](https://sanity.io))

## Step 1: Create a Sanity Project

### Option A: Using Sanity CLI (Recommended)

1. **Install Sanity CLI globally:**
```bash
npm install -g @sanity/cli
```

2. **Login to Sanity:**
```bash
sanity login
```

3. **Initialize a new Sanity project:**
```bash
# In the kwa_website directory
sanity init

# Answer the prompts:
# - Create new project
# - Name: "KWM Art Center"
# - Dataset: "production"
# - Output path: Leave blank (creates in current directory)
```

### Option B: Using Sanity Dashboard

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create Project"
3. Name it "KWM Art Center"
4. Create a "production" dataset
5. Note your **Project ID**

## Step 2: Configure Environment Variables

1. **Copy the example file:**
```bash
cp .env.local.example .env.local
```

2. **Update `.env.local` with your actual values:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

You can find your Project ID at: https://sanity.io/manage

## Step 3: Set Up Sanity Studio

You have two options for running Sanity Studio:

### Option A: Standalone Studio (Recommended)

Create a separate Sanity Studio in a different directory:

```bash
# Create studio in a separate folder
cd ..
mkdir kwa-studio
cd kwa-studio

# Initialize Sanity Studio
sanity init

# Copy schemas from website
cp -r ../kwa_website/sanity ./

# Start the studio
sanity dev
```

Studio will be available at: http://localhost:3333

### Option B: Hosted Studio

Deploy the studio to Sanity's hosting:

```bash
# In your studio directory
sanity deploy

# Choose a studio hostname, e.g., kwm-art-center
```

Your studio will be available at: https://kwm-art-center.sanity.studio

## Step 4: Import Schemas

The schemas are already defined in `/sanity/schemas/`. If you created a separate studio, copy them:

```bash
# From the kwa_website directory
cp -r sanity/schemas ../kwa-studio/sanity/
```

Then update your studio's `sanity.config.ts` to use these schemas:

```typescript
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'KWM Art Center',

  projectId: 'your_project_id',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

## Step 5: Add Initial Content

1. **Start your Sanity Studio** (Option A or B above)

2. **Add sample exhibitions:**
   - Go to "Exhibition" in the left menu
   - Click "Create"
   - Fill in all required fields (English and Chinese)
   - Generate a slug
   - Upload a cover image
   - Save

3. **Add press items:**
   - Go to "Press" in the left menu
   - Create new items with bilingual content

4. **Add team members:**
   - Go to "Team Member" in the left menu
   - Add team members with photos

## Step 6: Verify Integration

1. **Restart your Next.js development server:**
```bash
npm run dev
```

2. **Check the website:**
   - Go to http://localhost:3000
   - The site should now display Sanity content instead of mock data
   - If Sanity is empty, it will still show mock data as fallback

3. **Test different locales:**
   - Visit http://localhost:3000/en
   - Visit http://localhost:3000/zh
   - Content should display in the correct language

## Content Structure

### Exhibition
- **title_en** / **title_zh**: Exhibition title (required)
- **slug**: URL-friendly identifier (auto-generated from title_en)
- **artist_en** / **artist_zh**: Artist name (required)
- **description_en** / **description_zh**: Full description
- **startDate** / **endDate**: Exhibition dates (required)
- **status**: upcoming, current, or past (required)
- **coverImage**: Main exhibition image (required)
- **images**: Additional gallery images (optional)
- **featured**: Show on homepage (checkbox)

### Press
- **title_en** / **title_zh**: Article title (required)
- **slug**: URL-friendly identifier
- **summary_en** / **summary_zh**: Short summary (required)
- **content_en** / **content_zh**: Full article content (required)
- **coverImage**: Article image (required)
- **publishDate**: Publication date (required)

### Team Member
- **nameCN** / **nameEN**: Name in Chinese/English (required)
- **titleCN** / **titleEN**: Job title in Chinese/English (required)
- **photo**: Professional photo (required)
- **bio_en** / **bio_zh**: Biography (optional)
- **order**: Display order (number, required)

## API Configuration

### CORS Settings

For production, add your domain to Sanity's CORS origins:

1. Go to https://sanity.io/manage
2. Select your project
3. Go to "API" → "CORS origins"
4. Add your production domain (e.g., https://kwmartcenter.com)
5. Add localhost:3000 for development

### API Tokens

For draft content or preview features, create an API token:

1. Go to https://sanity.io/manage
2. Select your project
3. Go to "API" → "Tokens"
4. Create a new token with "Viewer" permissions
5. Add to `.env.local`:
```env
SANITY_API_READ_TOKEN=your_token_here
```

## Customization

### Adding New Fields

To add fields to existing content types:

1. Edit the schema file in `/sanity/schemas/`
2. Add new fields using defineField()
3. Update the queries in `/lib/sanity.queries.ts`
4. Restart your Sanity Studio

Example:
```typescript
defineField({
  name: 'subtitle_en',
  title: 'Subtitle (English)',
  type: 'string',
})
```

### Adding New Content Types

1. Create a new schema file in `/sanity/schemas/`
2. Add it to `/sanity/schemas/index.ts`
3. Create query functions in `/lib/sanity.queries.ts`
4. Create React components as needed
5. Update `/lib/data.ts` to use the new content type

## Troubleshooting

### Content Not Showing

1. **Check environment variables:**
   ```bash
   echo $NEXT_PUBLIC_SANITY_PROJECT_ID
   ```

2. **Check Sanity Studio:**
   - Verify content exists
   - Check required fields are filled
   - Verify slugs are generated

3. **Check browser console:**
   - Look for API errors
   - Verify project ID is correct

### Images Not Loading

1. **Add your domain to allowed origins:**
   - Go to Sanity Manage → API → CORS Origins
   - Add your domain

2. **Check image URLs:**
   - Verify images are uploaded to Sanity
   - Check asset CDN is accessible

### Build Errors

1. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Verify all required fields have data:**
   - Check Sanity Studio for validation errors

## Production Deployment

### Before Deploying:

1. ✅ Set up production Sanity project
2. ✅ Add production domain to CORS origins
3. ✅ Update environment variables in hosting platform
4. ✅ Add all initial content
5. ✅ Test both English and Chinese content
6. ✅ Verify all images load correctly

### Environment Variables for Production:

Add these to your hosting platform (Vercel, Netlify, etc.):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Resources

- **Sanity Documentation:** https://www.sanity.io/docs
- **Sanity Schemas:** https://www.sanity.io/docs/schema-types
- **Sanity Studio:** https://www.sanity.io/docs/sanity-studio
- **GROQ Query Language:** https://www.sanity.io/docs/groq

## Support

For issues with:
- **Sanity Setup:** https://www.sanity.io/help
- **Website Integration:** Check `/lib/sanity.queries.ts` and `/lib/data.ts`
- **Content Structure:** Check `/sanity/schemas/`

## Next Steps

After setup:
1. Train content editors on using Sanity Studio
2. Set up user permissions in Sanity Manage
3. Configure webhooks for automatic deployments
4. Set up backup schedule (Sanity has built-in backups)
5. Monitor content quality and translations
