export interface LocalizedContent {
  en: string;
  zh: string;
}

export interface Exhibition {
  id: string;
  slug: string;
  title: LocalizedContent;
  artist: LocalizedContent;
  description: LocalizedContent;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'current' | 'past';
  coverImage: string;
  images: string[];
  featured: boolean;
}

export interface PressItem {
  id: string;
  slug: string;
  title: LocalizedContent;
  summary: LocalizedContent;
  content: LocalizedContent;
  coverImage: string;
  publishDate: string;
}

export interface TeamMember {
  id: string;
  nameCN: string;
  nameEN: string;
  titleCN: string;
  titleEN: string;
  photo: string;
  bio: LocalizedContent;
  order: number;
}

export interface PageContent {
  id: string;
  slug: string;
  title: LocalizedContent;
  content: LocalizedContent;
}
