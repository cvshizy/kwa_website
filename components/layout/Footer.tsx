'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import XiaohongshuIcon from '@/components/ui/XiaohongshuIcon';
import WeiboIcon from '@/components/ui/WeiboIcon';
import WeChatIcon from '@/components/ui/WeChatIcon';

export default function Footer() {
  const t = useTranslations('footer');
  const tContact = useTranslations('contact');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const [showWechatQR, setShowWechatQR] = useState(false);

  const brandName = locale === 'zh' ? 'KWA金杜艺术中心' : 'K&W ART CENTER';
  const address = locale === 'zh'
    ? '北京市朝阳区东三环中路1号\n环球金融中心东楼201'
    : 'Room 201, East Tower, \nGlobal Financial Center,\nNo.1 East 3rd Ring Middle Road,\nChaoyang District, Beijing';

  return (
    <>
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand & Address */}
            <div>
              <h3 className="text-lg font-bold mb-4">{brandName}</h3>
              <p className="text-sm text-gray-400">
                {address}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                {t('quickLinks')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/exhibitions" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {tNav('exhibitions')}
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {tNav('press')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {tNav('about')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {tNav('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                {t('openingHours')}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{t('tuesdayToSaturday')}: 10:00 - 19:00</li>
                <li>{t('sundayMonday')}: {t('closed')}</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} {brandName}. {t('rights')}.
              </p>
              {/* Social Media Icons */}
              <div className="flex space-x-6 mt-4 md:mt-0">
                {/* 小红书 */}
                <a
                  href="https://www.xiaohongshu.com/user/profile/631072a1000000000f004e85"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="小红书"
                  title="小红书"
                >
                  <XiaohongshuIcon className="h-5 w-5" />
                  <span className="sr-only">小红书</span>
                </a>
                {/* 抖音 */}
                <a
                  href="https://www.douyin.com/user/MS4wLjABAAAAJUfo6FESVKP4HTbA1VIwtxkA-VCoFvTyCWKxDf5M6NuCmJxZuhXMXYU7A8WrLzcg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="抖音"
                  title="抖音"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
                  </svg>
                  <span className="sr-only">抖音</span>
                </a>
                {/* 微博 */}
                <a
                  href="https://weibo.com/u/6029611887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="微博"
                  title="微博"
                >
                  <WeiboIcon className="h-5 w-5" />
                  <span className="sr-only">微博</span>
                </a>
                {/* 微信 */}
                <button
                  onClick={() => setShowWechatQR(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="微信"
                  title="微信"
                >
                  <WeChatIcon className="h-5 w-5" />
                  <span className="sr-only">微信</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WeChat QR Code Modal */}
      {showWechatQR && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
          onClick={() => setShowWechatQR(false)}
        >
          <div
            className="bg-white rounded-lg p-6 mx-4 max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">
              {locale === 'zh' ? '关注微信公众号' : 'Follow us on WeChat'}
            </h3>
            <div className="relative w-64 h-64 mx-auto mb-4">
              <Image
                src="/images/wechat-qr.jpg"
                alt="WeChat QR Code"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {locale === 'zh'
                ? '请扫描二维码来关注我们的微信公众号\n或者在微信中搜索我们的公众号名称：KWA金杜艺术中心'
                : 'Scan the QR code to follow our WeChat account\nor search for: KWA金杜艺术中心'}
            </p>
            <button
              onClick={() => setShowWechatQR(false)}
              className="px-6 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors rounded"
            >
              {locale === 'zh' ? '关闭' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
