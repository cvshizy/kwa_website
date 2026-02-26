'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

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
                  <span className="text-xs font-bold leading-none" style={{ fontSize: '10px' }}>小红书</span>
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
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.99-.406-1.593.379-.595 1.176-.86 1.793-.595.627.272.826.99.442 1.586zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.307-.36-.17-.59.141-.229.445-.344.68-.246.241.1.315.36.18.583zm.278-2.835c-1.697-.441-3.613.296-4.359 1.663-.762 1.397-.097 2.954 1.515 3.457 1.667.52 3.691-.236 4.434-1.693.736-1.432.011-2.964-1.59-3.427zM20.06 11.603c-.229-.06-.382-.104-.263-.375.257-.588.283-1.093.007-1.455-.516-.674-1.924-.638-3.544-.018 0 0-.508.221-.378-.18.249-.8.212-1.467-.176-1.854-.879-.88-3.22.031-5.233 2.029-1.5 1.489-2.37 3.071-2.37 4.439 0 2.616 3.354 4.209 6.634 4.209 4.297 0 7.159-2.5 7.159-4.481 0-1.199-1.01-1.879-1.836-2.314zM16.669 3.983c-.654-1.198-2.238-1.755-3.608-1.459.538.228 1.093.611 1.537 1.158.445.547.736 1.176.851 1.795 1.068-.251 1.875-1.494 1.22-1.494zm1.248-1.641C16.899.605 15.024-.046 13.37.456c.768.323 1.561.866 2.195 1.643.635.776 1.053 1.665 1.22 2.539 1.52-.352 2.673-2.116 1.132-2.296z" />
                  </svg>
                  <span className="sr-only">微博</span>
                </a>
                {/* 微信 */}
                <button
                  onClick={() => setShowWechatQR(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="微信"
                  title="微信"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.025-1.98-3.455-2.873-8.202-3.656-11.768-3.656zm-2.488 5.93a1.11 1.11 0 1 1 0-2.222 1.11 1.11 0 0 1 0 2.221zm5.876 0a1.11 1.11 0 1 1 0-2.222 1.11 1.11 0 0 1 0 2.221z" />
                    <path d="M24 14.755c0-3.254-3.013-5.897-6.732-5.897-3.72 0-6.732 2.643-6.732 5.897 0 3.253 3.012 5.896 6.732 5.896a8.176 8.176 0 0 0 2.295-.32.717.717 0 0 1 .58.08l1.534.894a.264.264 0 0 0 .135.044.236.236 0 0 0 .234-.234c0-.058-.024-.114-.039-.172l-.315-1.19a.477.477 0 0 1 .173-.537A5.028 5.028 0 0 0 24 14.755zm-8.421-1.528a.897.897 0 1 1 0-1.794.897.897 0 0 1 0 1.794zm3.667 0a.897.897 0 1 1 0-1.794.897.897 0 0 1 0 1.794z" />
                  </svg>
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
