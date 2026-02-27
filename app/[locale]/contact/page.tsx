'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import SocialMaskIcon from '@/components/ui/SocialMaskIcon';

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const [showWechatQR, setShowWechatQR] = useState(false);

  const address = locale === 'zh'
    ? '北京市朝阳区东三环中路1号\n环球金融中心东楼201'
    : 'Room 201, East Tower, \nGlobal Financial Center, \nNo. 1 East Third Ring Road, \nChaoyang District, Beijing 100020';

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">{t('title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">{t('address')}</h3>
              <p className="text-gray-700 whitespace-pre-line">{address}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('phone')}</h3>
              <p className="text-gray-700">+86 10 56612254</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('email')}</h3>
              <p className="text-gray-700">info@kwmartcenter.com</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('hours')}</h3>
              <div className="text-gray-700 space-y-1">
                {locale === 'zh' ? (
                  <>
                    <p>周二至周六: 10:00 - 19:00</p>
                    <p>周日及周一: 闭馆</p>
                  </>
                ) : (
                  <>
                    <p>Tuesday - Saturday: 10:00 - 19:00</p>
                    <p>Sunday & Monday: Closed</p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">{t('followUs')}</h3>
              <div className="flex space-x-4">
                {/* 小红书 */}
                <a
                  href="https://www.xiaohongshu.com/user/profile/631072a1000000000f004e85"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors"
                  aria-label="小红书"
                  title="小红书"
                >
                  <SocialMaskIcon src="/images/social/xiaohongshu.svg" className="h-5 w-5" />
                </a>
                {/* 抖音 */}
                <a
                  href="https://www.douyin.com/user/MS4wLjABAAAAJUfo6FESVKP4HTbA1VIwtxkA-VCoFvTyCWKxDf5M6NuCmJxZuhXMXYU7A8WrLzcg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors"
                  aria-label="抖音"
                  title="抖音"
                >
                  <SocialMaskIcon src="/images/social/douyin.svg" className="h-5 w-5" />
                </a>
                {/* 微博 */}
                <a
                  href="https://weibo.com/u/6029611887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors"
                  aria-label="微博"
                  title="微博"
                >
                  <SocialMaskIcon src="/images/social/weibo.svg" className="h-5 w-5" />
                </a>
                {/* 微信 */}
                <button
                  onClick={() => setShowWechatQR(true)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors"
                  aria-label="微信"
                  title="微信"
                >
                  <SocialMaskIcon src="/images/social/weixin.svg" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8">
            <h3 className="text-xl font-semibold mb-6">{t('sendMessage')}</h3>
            <form
              action="https://formspree.io/f/xbdabrdw"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_subject" value="New message from K&W Art Center website" />
              <input type="text" name="_gotcha" style={{ display: 'none' }} />
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition-colors"
              >
                {t('submit')}
              </button>
            </form>
          </div>
        </div>
      </div>

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
                : 'Scan the QR code to follow our WeChat account\nor search for: KWA艺术中心'}
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
