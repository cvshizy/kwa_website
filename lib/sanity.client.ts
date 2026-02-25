import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Set to false if you want fresh data
  token: process.env.SANITY_API_READ_TOKEN, // Optional: for draft content
});

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
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
