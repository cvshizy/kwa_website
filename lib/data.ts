/**
 * Data fetching layer that uses Sanity if configured, otherwise falls back to mock data
 */

import { Exhibition, PressItem, TeamMember } from '@/types';
import { mockExhibitions, mockPress, mockTeamMembers } from './mockData';
import * as sanity from './sanity.queries';

// Check if Sanity is configured
const isSanityConfigured =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id' &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder';

// Exhibition functions
export async function getExhibitions(locale: 'en' | 'zh'): Promise<Exhibition[]> {
  if (isSanityConfigured) {
    const data = await sanity.getExhibitions(locale);
    if (data.length > 0) return data;
  }
  return mockExhibitions;
}

export async function getExhibitionBySlug(slug: string, locale: 'en' | 'zh'): Promise<Exhibition | null> {
  if (isSanityConfigured) {
    const data = await sanity.getExhibitionBySlug(slug, locale);
    if (data) return data;
  }
  return mockExhibitions.find(ex => ex.slug === slug) || null;
}

export async function getFeaturedExhibitions(locale: 'en' | 'zh'): Promise<Exhibition[]> {
  if (isSanityConfigured) {
    const data = await sanity.getFeaturedExhibitions(locale);
    if (data.length > 0) return data;
  }
  return mockExhibitions.filter(ex => ex.featured);
}

// Press functions
export async function getPressItems(locale: 'en' | 'zh'): Promise<PressItem[]> {
  if (isSanityConfigured) {
    const data = await sanity.getPressItems(locale);
    if (data.length > 0) return data;
  }
  return mockPress;
}

export async function getPressItemBySlug(slug: string, locale: 'en' | 'zh'): Promise<PressItem | null> {
  if (isSanityConfigured) {
    const data = await sanity.getPressItemBySlug(slug, locale);
    if (data) return data;
  }
  return mockPress.find(p => p.slug === slug) || null;
}

// Team functions
export async function getTeamMembers(locale: 'en' | 'zh'): Promise<TeamMember[]> {
  if (isSanityConfigured) {
    const data = await sanity.getTeamMembers(locale);
    if (data.length > 0) return data;
  }
  return mockTeamMembers;
}
