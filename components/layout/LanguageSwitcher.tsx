'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace the current locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => switchLocale('en')}
        className={`transition-colors ${
          locale === 'en'
            ? 'text-black font-medium'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => switchLocale('zh')}
        className={`transition-colors ${
          locale === 'zh'
            ? 'text-black font-medium'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        中文
      </button>
    </div>
  );
}
