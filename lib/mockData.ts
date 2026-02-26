import { Exhibition, PressItem, TeamMember } from '@/types';

export const mockExhibitions: Exhibition[] = [
  {
    id: '1',
    slug: 'light-etchings-michael-kenna',
    title: {
      en: 'Light Etchings — The Photography Exhibition of Michael Kenna',
      zh: '「蚀光集」-迈克尔·肯纳摄影作品展'
    },
    artist: {
      en: 'Michael Kenna',
      zh: '迈克尔·肯纳'
    },
    description: {
      en: 'The showcase presents representative works spanning nearly five decades, emphasizing Kenna\'s minimalist approach and meditative interplay of light and shadow. Over 100 silver gelatin prints hand-developed by Kenna feature prominently, representing China\'s largest-scale individual exhibition of his work. The exhibition comprises five thematic sections: The Quiet Form of Nature, The Whisper of Light, The Tree Heard the Wind, What Is Left Unspoken, and The Silence Beneath Snow.',
      zh: '展览呈现迈克尔·肯纳近五十年的代表作品，强调其极简主义手法和光影的冥想式交织。展出超过100幅由肯纳亲手冲洗的银盐照片，是中国规模最大的肯纳个展。展览包含五个主题部分：自然的寂静形态、光的私语、树听见了风、未尽之言和雪下的寂静。'
    },
    startDate: '2025-07-11',
    endDate: '2025-08-09',
    status: 'past',
    coverImage: 'https://kwmartcenter.com/wp-content/uploads/2025/06/横版海报-1024x702.jpg',
    images: [
      'https://kwmartcenter.com/wp-content/uploads/2025/06/Huangshan-Mountains-Study-55-Anhui-China.-2017.jpg',
      'https://kwmartcenter.com/wp-content/uploads/2025/06/77-Seaweed-Farms-Study-7-Xiapu-China.-2010.jpg',
      'https://kwmartcenter.com/wp-content/uploads/2025/06/108-Temple-of-Heaven-Beijing-China.-2008.jpg',
      'https://kwmartcenter.com/wp-content/uploads/2025/06/45-Snow-Covered-Pier-Kiyohama-Hokkaido-Japan.-2004.jpg',
      'https://kwmartcenter.com/wp-content/uploads/2025/06/12-Erhai-Lake-Study-5-Yunnan-China.-2013.jpg'
    ],
    featured: true
  },
  {
    id: '2',
    slug: 'zhang-wei-afterglow',
    title: {
      en: 'Zhang Wei: Afterglow',
      zh: '张伟：「余兴」'
    },
    artist: {
      en: 'Zhang Wei',
      zh: '张伟'
    },
    description: {
      en: 'This inaugural exhibition following artist Zhang Wei\'s passing (1952-2025) presents works spanning five decades. The show emphasizes "freedom and playfulness" as central themes in Wei\'s practice, encompassing landscape sketches from the 1970s "Unnamed Painters Group," abstract works from the 1980s onward, and late-career motorcycle paintings. Wei\'s artistic journey reflects his philosophy of art as "the highest expression of playful spirit."',
      zh: '这是艺术家张伟（1952-2025）辞世后的首次展览，呈现其五十年间的作品。展览强调"自由与趣味"作为张伟创作的核心主题，涵盖1970年代"无名画会"时期的风景写生、1980年代以来的抽象作品，以及晚期的摩托车绘画。张伟的艺术历程反映了他"艺术是游戏精神的最高表达"的哲学。'
    },
    startDate: '2025-05-21',
    endDate: '2025-07-05',
    status: 'past',
    coverImage: 'https://kwmartcenter.com/wp-content/uploads/2025/05/WX20250509-184720@2x-1-1024x629.png',
    images: [
      'https://kwmartcenter.com/wp-content/uploads/2025/05/1现场图-1-1024x683.jpg',
      'https://kwmartcenter.com/wp-content/uploads/2025/05/2现场图-1024x683.jpg',
      'https://kwmartcenter.com/wp-content/uploads/2025/05/6现场图-1024x683.jpg',
      'https://kwmartcenter.com/wp-content/uploads/2025/05/25现场图-1024x576.jpg',
      'https://kwmartcenter.com/wp-content/uploads/2025/05/11现场图-1024x683.jpg'
    ],
    featured: true
  },
  {
    id: '3',
    slug: 'poetry-womens-art-exhibition',
    title: {
      en: 'Poetry — Women\'s Art Exhibition',
      zh: '「诗」-- 女性艺术展'
    },
    artist: {
      en: 'Group Exhibition: Xiang Jing, Yu Hong, Pan Ran, Sun Man, Tong Wenmin, Wang Yuqing, Su Yabi',
      zh: '群展：向京、喻红、潘然、孙蛮、童文敏、王钰清、苏亚碧'
    },
    description: {
      en: 'The exhibition explores poetic expressions in women\'s art that emerge from everyday life yet transcend the mundane. Curated by Liao Wen, it draws inspiration from the Diamond Sutra concept "Dwelling in Nonattachment, Let the Mind Arise," examining how artists perceive relationships between self, reality, and nature through the most delicate and intuitive sensibilities of women.',
      zh: '展览探索女性艺术中源于日常生活却超越平凡的诗意表达。由廖雯策展，灵感来自金刚经中"应无所住而生其心"的概念，审视艺术家如何通过女性最细腻和直觉的感知，洞察自我、现实与自然之间的关系。'
    },
    startDate: '2025-02-28',
    endDate: '2025-04-26',
    status: 'past',
    coverImage: 'http://kwmartcenter.com/wp-content/uploads/2025/03/小尺寸-横板-1024x703.png',
    images: [
      'http://kwmartcenter.com/wp-content/uploads/2025/03/空镜-标题--1024x683.jpg',
      'http://kwmartcenter.com/wp-content/uploads/2025/03/空镜--1024x683.jpg',
      'http://kwmartcenter.com/wp-content/uploads/2025/03/空镜-向京及潘然作品--1024x683.jpg',
      'http://kwmartcenter.com/wp-content/uploads/2025/03/空镜-全景-1024x683.jpg',
      'http://kwmartcenter.com/wp-content/uploads/2025/03/空镜-向京作品-683x1024.jpg'
    ],
    featured: true
  },
  {
    id: '4',
    slug: 'resonance-and-renewal-8th-anniversary',
    title: {
      en: 'Resonance and Renewal — The 8th Anniversary Exhibition',
      zh: '「共鸣与新生」-- 金杜艺术中心八周年特展'
    },
    artist: {
      en: 'Group Exhibition',
      zh: '群展'
    },
    description: {
      en: 'The exhibition celebrates the art center\'s eighth anniversary by showcasing diverse artistic perspectives. These works reflect artists\' inquiries into society, history, and existence while narrating the institution\'s mission to foster contemplation and transformative experiences. The exhibition emphasizes that art provides essential balance and spiritual nourishment within Beijing\'s bustling CBD environment.',
      zh: '展览庆祝艺术中心八周年，展示多元化的艺术视角。这些作品反映了艺术家对社会、历史和存在的探询，同时诠释了机构培养思考和转化体验的使命。展览强调艺术在北京繁华CBD环境中提供了必不可少的平衡和精神滋养。'
    },
    startDate: '2024-12-06',
    endDate: '2025-02-15',
    status: 'past',
    coverImage: 'http://kwmartcenter.com/wp-content/uploads/2025/01/双语横-金杜艺术中心八周年海报横版-1.jpg',
    images: [
      'http://kwmartcenter.com/wp-content/uploads/2025/01/LAU51595-1024x683.jpg',
      'http://kwmartcenter.com/wp-content/uploads/2025/01/场馆空镜图-1024x683.jpg',
      'http://kwmartcenter.com/wp-content/uploads/2025/01/场馆空镜图2-1024x683.jpg',
      'http://kwmartcenter.com/wp-content/uploads/2025/01/场馆空镜图3-1024x683.jpg',
      'http://kwmartcenter.com/wp-content/uploads/2025/01/小展厅1-1024x683.jpg'
    ],
    featured: true
  },
  {
    id: '5',
    slug: 'polyphony-and-soliloquy',
    title: {
      en: 'Polyphony and Soliloquy — Contemporary Art Works Exhibition',
      zh: '「复调与独语」-- 当代艺术作品展'
    },
    artist: {
      en: 'Group Exhibition',
      zh: '群展'
    },
    description: {
      en: 'An exploration of contemporary artistic voices, examining the dialogue between collective expression and individual introspection in modern art practice.',
      zh: '探索当代艺术声音，审视现代艺术实践中集体表达与个人内省之间的对话。'
    },
    startDate: '2024-10-15',
    endDate: '2024-12-30',
    status: 'past',
    coverImage: 'http://kwmartcenter.com/wp-content/uploads/2025/01/场馆空镜图4-1024x683.jpg',
    images: [],
    featured: false
  },
  {
    id: '6',
    slug: 'upcoming-exhibition-2026',
    title: {
      en: 'Contemporary Perspectives 2026',
      zh: '当代视角 2026'
    },
    artist: {
      en: 'Various Artists',
      zh: '多位艺术家'
    },
    description: {
      en: 'An upcoming exhibition featuring emerging and established contemporary artists exploring new directions in Chinese contemporary art.',
      zh: '即将举办的展览，汇集新兴和知名当代艺术家，探索中国当代艺术的新方向。'
    },
    startDate: '2026-03-15',
    endDate: '2026-06-30',
    status: 'upcoming',
    coverImage: 'http://kwmartcenter.com/wp-content/uploads/2025/01/作品空镜-1024x683.jpg',
    images: [],
    featured: true
  }
];

export const mockPress: PressItem[] = [
  {
    id: '1',
    slug: 'international-artist-film-series-9',
    title: {
      en: 'International Artist Film Series Screening 9',
      zh: '国际艺术家电影系列放映 9'
    },
    summary: {
      en: 'KWM Art Center continues its acclaimed International Artist Film Series with the ninth installment, featuring works by contemporary video artists.',
      zh: 'KWM艺术中心继续其备受赞誉的国际艺术家电影系列，第九期展映当代影像艺术家作品。'
    },
    content: {
      en: 'The International Artist Film Series has become a signature program at KWM Art Center, providing a platform for experimental and contemporary video art. This ninth screening continues to bridge international art practices with local audiences.',
      zh: '国际艺术家电影系列已成为KWM艺术中心的标志性项目，为实验性和当代影像艺术提供平台。第九期放映继续连接国际艺术实践与本地观众。'
    },
    coverImage: 'http://kwmartcenter.com/wp-content/uploads/2025/01/LAU51595-1024x683.jpg',
    pdfUrl: { en: '', zh: '' },
    publishDate: '2020-08-13'
  },
  {
    id: '2',
    slug: 'zhang-gong-revelation',
    title: {
      en: 'Zhang Gong: Revelation',
      zh: '张弓：启示录'
    },
    summary: {
      en: 'A solo exhibition by artist Zhang Gong exploring themes of revelation and spiritual inquiry through contemporary artistic practice.',
      zh: '艺术家张弓的个展，通过当代艺术实践探索启示和精神探询的主题。'
    },
    content: {
      en: 'Zhang Gong\'s "Revelation" presents a comprehensive look at the artist\'s recent works, examining the intersection of personal spirituality and contemporary visual language.',
      zh: '张弓的"启示录"全面展示了艺术家的近期作品，审视个人精神性与当代视觉语言的交汇。'
    },
    coverImage: 'https://kwmartcenter.com/wp-content/uploads/2025/05/3现场图-1024x683.jpg',
    pdfUrl: { en: '', zh: '' },
    publishDate: '2020-08-13'
  },
  {
    id: '3',
    slug: 'also-guo-fengyi',
    title: {
      en: 'Also Guo Fengyi',
      zh: '也是郭凤怡'
    },
    summary: {
      en: 'An exhibition celebrating the unique artistic vision of Guo Fengyi, exploring her distinctive approach to art-making.',
      zh: '展览庆祝郭凤怡独特的艺术视野，探索她独特的艺术创作方式。'
    },
    content: {
      en: 'Guo Fengyi\'s work represents a unique voice in contemporary Chinese art, combining traditional elements with deeply personal expression.',
      zh: '郭凤怡的作品代表了中国当代艺术中的独特声音，将传统元素与深度个人表达相结合。'
    },
    coverImage: 'http://kwmartcenter.com/wp-content/uploads/2025/03/空镜-喻红作品-1024x683.jpg',
    pdfUrl: { en: '', zh: '' },
    publishDate: '2020-06-03'
  },
  {
    id: '4',
    slug: 'moon-and-knife-dario-guccio',
    title: {
      en: 'Moon and Knife — Dario Guccio',
      zh: '月球与刀 — 达里奥·古奇欧'
    },
    summary: {
      en: 'Italian artist Dario Guccio brings his poetic exploration of dualities to KWM Art Center.',
      zh: '意大利艺术家达里奥·古奇欧将其对二元性的诗意探索带到KWM艺术中心。'
    },
    content: {
      en: 'Dario Guccio\'s exhibition "Moon and Knife" examines the relationship between opposing forces through contemporary visual language.',
      zh: '达里奥·古奇欧的展览"月球与刀"通过当代视觉语言审视对立力量之间的关系。'
    },
    coverImage: 'https://kwmartcenter.com/wp-content/uploads/2025/06/45-Snow-Covered-Pier-Kiyohama-Hokkaido-Japan.-2004.jpg',
    pdfUrl: { en: '', zh: '' },
    publishDate: '2020-03-18'
  },
  {
    id: '5',
    slug: 'kwm-8th-anniversary-announcement',
    title: {
      en: 'KWM Art Center Celebrates 8th Anniversary',
      zh: 'KWM艺术中心庆祝八周年'
    },
    summary: {
      en: 'Since opening in 2016, KWM Art Center has become a vital hub for contemporary art in Beijing\'s CBD, presenting over 100 exhibitions.',
      zh: '自2016年开幕以来，KWM艺术中心已成为北京CBD当代艺术的重要枢纽，呈现了超过100场展览。'
    },
    content: {
      en: 'KWM Art Center officially opened on October 20, 2016, in the Global Financial Center within Beijing\'s CBD. The institution was founded with support from King & Wood Mallesons law firm, dedicated to presenting professional contemporary art exhibitions and supporting the KWM Foundation\'s collection.',
      zh: 'KWM艺术中心于2016年10月20日在北京CBD的环球金融中心正式开幕。该机构在金杜律师事务所的支持下成立，致力于呈现专业的当代艺术展览并支持KWM基金会的收藏。'
    },
    coverImage: 'http://kwmartcenter.com/wp-content/uploads/2025/01/双语横-金杜艺术中心八周年海报横版-1.jpg',
    pdfUrl: { en: '', zh: '' },
    publishDate: '2024-10-20'
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    nameCN: '俞灵轩',
    nameEN: 'Michael Yu',
    titleCN: '执行秘书长',
    titleEN: 'Executive Secretary',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: {
      en: 'Michael Yu leads the strategic direction and daily operations of KWM Art Center, ensuring the institution\'s mission to promote contemporary art and cultural exchange.',
      zh: '俞灵轩领导KWM艺术中心的战略方向和日常运营，确保机构推广当代艺术和文化交流的使命。'
    },
    order: 1
  },
  {
    id: '2',
    nameCN: '韩琳',
    nameEN: 'Han Lin',
    titleCN: '运营总监',
    titleEN: 'Operations Director',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: {
      en: 'Han Lin oversees all operational aspects of KWM Art Center, managing facilities, visitor services, and ensuring smooth exhibition execution.',
      zh: '韩琳负责KWM艺术中心的所有运营工作，管理设施、观众服务，并确保展览顺利执行。'
    },
    order: 2
  },
  {
    id: '3',
    nameCN: '孙瑞娇',
    nameEN: 'Sun Ruijiao',
    titleCN: '市场总监',
    titleEN: 'Marketing Director',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: {
      en: 'Sun Ruijiao develops and implements marketing strategies to engage audiences and enhance the visibility of KWM Art Center\'s programs.',
      zh: '孙瑞娇制定并实施营销策略，以吸引观众并提高KWM艺术中心项目的知名度。'
    },
    order: 3
  },
  {
    id: '4',
    nameCN: '梁君怡',
    nameEN: 'Liang Junyi',
    titleCN: '展览总监',
    titleEN: 'Exhibition Director',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: {
      en: 'Liang Junyi curates and coordinates exhibitions, working closely with artists and institutions to present compelling contemporary art programs.',
      zh: '梁君怡策划和协调展览，与艺术家和机构密切合作，呈现引人入胜的当代艺术项目。'
    },
    order: 4
  }
];
