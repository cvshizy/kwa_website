import { client } from './sanity.client';
import { Exhibition, PressItem, TeamMember } from '@/types';

// Exhibition Queries
export async function getExhibitions(locale: 'en' | 'zh'): Promise<Exhibition[]> {
  if (!client) return [];
  const query = `*[_type == "exhibition"] | order(startDate desc) {
    _id,
    "id": _id,
    "slug": slug.current,
    "title": {
      "en": title_en,
      "zh": title_zh
    },
    "artist": {
      "en": artist_en,
      "zh": artist_zh
    },
    "description": {
      "en": description_en,
      "zh": description_zh
    },
    startDate,
    endDate,
    status,
    "coverImage": coverImage.asset->url,
    "images": images[].asset->url,
    featured
  }`;

  try {
    const exhibitions = await client.fetch(query);
    return exhibitions || [];
  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    return [];
  }
}

export async function getExhibitionBySlug(slug: string, locale: 'en' | 'zh'): Promise<Exhibition | null> {
  if (!client) return null;
  const query = `*[_type == "exhibition" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    "title": {
      "en": title_en,
      "zh": title_zh
    },
    "artist": {
      "en": artist_en,
      "zh": artist_zh
    },
    "description": {
      "en": description_en,
      "zh": description_zh
    },
    startDate,
    endDate,
    status,
    "coverImage": coverImage.asset->url,
    "images": images[].asset->url,
    featured
  }`;

  try {
    const exhibition = await client.fetch(query, { slug });
    return exhibition || null;
  } catch (error) {
    console.error('Error fetching exhibition:', error);
    return null;
  }
}

export async function getFeaturedExhibitions(locale: 'en' | 'zh'): Promise<Exhibition[]> {
  if (!client) return [];
  const query = `*[_type == "exhibition" && featured == true] | order(startDate desc) {
    _id,
    "id": _id,
    "slug": slug.current,
    "title": {
      "en": title_en,
      "zh": title_zh
    },
    "artist": {
      "en": artist_en,
      "zh": artist_zh
    },
    "description": {
      "en": description_en,
      "zh": description_zh
    },
    startDate,
    endDate,
    status,
    "coverImage": coverImage.asset->url,
    "images": images[].asset->url,
    featured
  }`;

  try {
    const exhibitions = await client.fetch(query);
    return exhibitions || [];
  } catch (error) {
    console.error('Error fetching featured exhibitions:', error);
    return [];
  }
}

// Press Queries
export async function getPressItems(locale: 'en' | 'zh'): Promise<PressItem[]> {
  if (!client) return [];
  const query = `*[_type == "press"] | order(publishDate desc) {
    _id,
    "id": _id,
    "slug": slug.current,
    "title": {
      "en": title_en,
      "zh": title_zh
    },
    "summary": {
      "en": summary_en,
      "zh": summary_zh
    },
    "content": {
      "en": content_en,
      "zh": content_zh
    },
    "coverImage": coverImage.asset->url,
    "pdfUrl": {
      "en": pdfUrl_en,
      "zh": pdfUrl_zh
    },
    publishDate
  }`;

  try {
    const press = await client.fetch(query);
    return press || [];
  } catch (error) {
    console.error('Error fetching press items:', error);
    return [];
  }
}

export async function getPressItemBySlug(slug: string, locale: 'en' | 'zh'): Promise<PressItem | null> {
  if (!client) return null;
  const query = `*[_type == "press" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    "title": {
      "en": title_en,
      "zh": title_zh
    },
    "summary": {
      "en": summary_en,
      "zh": summary_zh
    },
    "content": {
      "en": content_en,
      "zh": content_zh
    },
    "coverImage": coverImage.asset->url,
    "pdfUrl": {
      "en": pdfUrl_en,
      "zh": pdfUrl_zh
    },
    publishDate
  }`;

  try {
    const press = await client.fetch(query, { slug });
    return press || null;
  } catch (error) {
    console.error('Error fetching press item:', error);
    return null;
  }
}

// Team Member Queries
export async function getTeamMembers(locale: 'en' | 'zh'): Promise<TeamMember[]> {
  if (!client) return [];
  const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    "id": _id,
    nameCN,
    nameEN,
    titleCN,
    titleEN,
    "photo": photo.asset->url,
    "bio": {
      "en": bio_en,
      "zh": bio_zh
    },
    order
  }`;

  try {
    const members = await client.fetch(query);
    return members || [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

