export interface LocalizedContent {
  en: string;
  zh: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface LocalizedPortableText {
  en: any[];
  zh: any[];
}

export interface Exhibition {
  id: string;
  slug: string;
  title: LocalizedContent;
  artist: LocalizedContent;
  description: LocalizedPortableText;
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
  summary: LocalizedPortableText;
  content: LocalizedPortableText;
  coverImage: string;
  pdfUrl: LocalizedContent;
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
