import { createClient, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const isSanityReady =
  projectId &&
  projectId !== 'your_project_id' &&
  projectId !== 'placeholder';

// Only create the client when Sanity is actually configured
export const client: SanityClient | null = isSanityReady
  ? createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    useCdn: false, // Disable CDN for ISR - always get fresh data
    token: process.env.SANITY_API_READ_TOKEN,
  })
  : null;

// Helper function to generate image URLs
export function urlFor(source: SanityImageSource) {
  if (!client) return null;
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}

// Helper to get localized field
export function getLocalizedField<T>(
  field: { [key: string]: T } | T,
  locale: 'en' | 'zh',
  fallback: T
): T {
  if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
    return (field as { [key: string]: T })[locale] || (field as { [key: string]: T })['en'] || fallback;
  }
  return field as T || fallback;
}
