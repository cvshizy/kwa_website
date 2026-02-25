import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPressItems, getPressItemBySlug } from '@/lib/data';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const pressItems = await getPressItems('en');
  return pressItems.map((press) => ({
    slug: press.slug,
  }));
}

export default async function PressDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  const press = await getPressItemBySlug(slug, locale as 'en' | 'zh');

  if (!press) {
    notFound();
  }

  const currentLocale = locale as 'en' | 'zh';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return currentLocale === 'zh'
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={press.coverImage}
          alt={press.title[currentLocale]}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-4">{formatDate(press.publishDate)}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {press.title[currentLocale]}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {press.summary[currentLocale]}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {press.content[currentLocale]}
              </p>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/press"
              className="inline-block text-sm text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Press
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
