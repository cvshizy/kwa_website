import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations('contact');
  const tFooter = await getTranslations('footer');

  const address = locale === 'zh'
    ? '北京市朝阳区东三环中路1号\n环球金融中心东楼201'
    : 'Room 201, East Tower\nGlobal Financial Center\nNo. 1 East Third Ring Road\nChaoyang District, Beijing 100020';

  return (
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
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="WeChat"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.025-1.98-3.455-2.873-8.202-3.656-11.768-3.656zm-2.488 5.93a1.11 1.11 0 1 1 0-2.222 1.11 1.11 0 0 1 0 2.221zm5.876 0a1.11 1.11 0 1 1 0-2.222 1.11 1.11 0 0 1 0 2.221z" />
                  <path d="M24 14.755c0-3.254-3.013-5.897-6.732-5.897-3.72 0-6.732 2.643-6.732 5.897 0 3.253 3.012 5.896 6.732 5.896a8.176 8.176 0 0 0 2.295-.32.717.717 0 0 1 .58.08l1.534.894a.264.264 0 0 0 .135.044.236.236 0 0 0 .234-.234c0-.058-.024-.114-.039-.172l-.315-1.19a.477.477 0 0 1 .173-.537A5.028 5.028 0 0 0 24 14.755zm-8.421-1.528a.897.897 0 1 1 0-1.794.897.897 0 0 1 0 1.794zm3.667 0a.897.897 0 1 1 0-1.794.897.897 0 0 1 0 1.794z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8">
          <h3 className="text-xl font-semibold mb-6">{t('sendMessage')}</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
  );
}
