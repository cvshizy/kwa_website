import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations('careers');

  // Mock job listings - would come from CMS in production
  const jobs = locale === 'zh'
    ? [
      {
        id: 1,
        title: '策展助理',
        department: '策展部',
        type: '全职',
        description: '协助策展人组织和管理展览项目，包括艺术家沟通、展览筹备和文档管理。'
      },
      {
        id: 2,
        title: '教育项目协调员',
        department: '教育部',
        type: '全职',
        description: '开发和实施艺术教育项目，包括工作坊、讲座和学校合作项目。'
      }
    ]
    : [
      {
        id: 1,
        title: 'Curatorial Assistant',
        department: 'Curatorial Department',
        type: 'Full-time',
        description: 'Assist curators in organizing and managing exhibition projects, including artist communication, exhibition preparation, and documentation.'
      },
      {
        id: 2,
        title: 'Education Programs Coordinator',
        department: 'Education Department',
        type: 'Full-time',
        description: 'Develop and implement art education programs, including workshops, lectures, and school partnership projects.'
      }
    ];

  const intro = locale === 'zh'
    ? '加入我们的团队，共同推动当代艺术的发展。我们寻找充满热情、富有创意的人才。'
    : 'Join our team to advance contemporary art together. We seek passionate and creative individuals.';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
      <p className="text-xl text-gray-600 mb-12">{intro}</p>

      <div className="space-y-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="border border-gray-200 p-6 hover:border-gray-400 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.department} • {job.type}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <button className="text-sm bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors">
                {locale === 'zh' ? '申请职位' : 'Apply Now'}
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            {locale === 'zh' ? '目前没有职位空缺' : 'No open positions at the moment'}
          </div>
        )}
      </div>
    </div>
  );
}
