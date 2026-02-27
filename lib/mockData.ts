import { Exhibition, PressItem, TeamMember, LocalizedContent } from '@/types';

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
      en: [{"_type":"block","_key":"kwn6b4vfz","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sew4lwlz9","text":"The showcase presents representative works spanning nearly five decades, emphasizing Kenna's minimalist approach and meditative interplay of light and shadow. Over 100 silver gelatin prints hand-developed by Kenna feature prominently, representing China's largest-scale individual exhibition of his work. The exhibition comprises five thematic sections: The Quiet Form of Nature, The Whisper of Light, The Tree Heard the Wind, What Is Left Unspoken, and The Silence Beneath Snow.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kdhmo15rb","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s0g50fkub","text":"展览呈现迈克尔·肯纳近五十年的代表作品，强调其极简主义手法和光影的冥想式交织。展出超过100幅由肯纳亲手冲洗的银盐照片，是中国规模最大的肯纳个展。展览包含五个主题部分：自然的寂静形态、光的私语、树听见了风、未尽之言和雪下的寂静。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"ky1n0ada9","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s13vp3512","text":"This inaugural exhibition following artist Zhang Wei's passing (1952-2025) presents works spanning five decades. The show emphasizes \"freedom and playfulness\" as central themes in Wei's practice, encompassing landscape sketches from the 1970s \"Unnamed Painters Group,\" abstract works from the 1980s onward, and late-career motorcycle paintings. Wei's artistic journey reflects his philosophy of art as \"the highest expression of playful spirit.\"","marks":[]}]}],
      zh: [{"_type":"block","_key":"kj95iwe68","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"soteccsm3","text":"这是艺术家张伟（1952-2025）辞世后的首次展览，呈现其五十年间的作品。展览强调\"自由与趣味\"作为张伟创作的核心主题，涵盖1970年代\"无名画会\"时期的风景写生、1980年代以来的抽象作品，以及晚期的摩托车绘画。张伟的艺术历程反映了他\"艺术是游戏精神的最高表达\"的哲学。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"ks8g45oz0","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sz3achfau","text":"The exhibition explores poetic expressions in women's art that emerge from everyday life yet transcend the mundane. Curated by Liao Wen, it draws inspiration from the Diamond Sutra concept \"Dwelling in Nonattachment, Let the Mind Arise,\" examining how artists perceive relationships between self, reality, and nature through the most delicate and intuitive sensibilities of women.","marks":[]}]}],
      zh: [{"_type":"block","_key":"k7dwmabxx","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s5q5tqcr9","text":"展览探索女性艺术中源于日常生活却超越平凡的诗意表达。由廖雯策展，灵感来自金刚经中\"应无所住而生其心\"的概念，审视艺术家如何通过女性最细腻和直觉的感知，洞察自我、现实与自然之间的关系。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"kzbqsiwln","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"saqpme4mc","text":"The exhibition celebrates the art center's eighth anniversary by showcasing diverse artistic perspectives. These works reflect artists' inquiries into society, history, and existence while narrating the institution's mission to foster contemplation and transformative experiences. The exhibition emphasizes that art provides essential balance and spiritual nourishment within Beijing's bustling CBD environment.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kgq4c35wm","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sconarplz","text":"展览庆祝艺术中心八周年，展示多元化的艺术视角。这些作品反映了艺术家对社会、历史和存在的探询，同时诠释了机构培养思考和转化体验的使命。展览强调艺术在北京繁华CBD环境中提供了必不可少的平衡和精神滋养。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"k4cdy8gz9","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s7nyb9a6c","text":"An exploration of contemporary artistic voices, examining the dialogue between collective expression and individual introspection in modern art practice.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kwobbswc9","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s70a95pn9","text":"探索当代艺术声音，审视现代艺术实践中集体表达与个人内省之间的对话。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"kemanumqz","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"syhnyazhn","text":"An upcoming exhibition featuring emerging and established contemporary artists exploring new directions in Chinese contemporary art.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kvh48yyr8","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sjdl0lsyc","text":"即将举办的展览，汇集新兴和知名当代艺术家，探索中国当代艺术的新方向。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"knzm7dc93","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sh2xewsy7","text":"K&W Art Center continues its acclaimed International Artist Film Series with the ninth installment, featuring works by contemporary video artists.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kdiccn451","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"syutje5ph","text":"KWA金杜艺术中心继续其备受赞誉的国际艺术家电影系列，第九期展映当代影像艺术家作品。","marks":[]}]}]
    },
    content: {
      en: [{"_type":"block","_key":"ka22t4udm","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s0rriypg1","text":"The International Artist Film Series has become a signature program at K&W Art Center, providing a platform for experimental and contemporary video art. This ninth screening continues to bridge international art practices with local audiences.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kfpay5mug","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"swcir4fuf","text":"国际艺术家电影系列已成为KWA金杜艺术中心的标志性项目，为实验性和当代影像艺术提供平台。第九期放映继续连接国际艺术实践与本地观众。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"kjw4leku3","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s2pwoeaw4","text":"A solo exhibition by artist Zhang Gong exploring themes of revelation and spiritual inquiry through contemporary artistic practice.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kcckesky0","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s46jbb9wh","text":"艺术家张弓的个展，通过当代艺术实践探索启示和精神探询的主题。","marks":[]}]}]
    },
    content: {
      en: [{"_type":"block","_key":"k3qzatig6","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sa55hp0l7","text":"Zhang Gong's \"Revelation\" presents a comprehensive look at the artist's recent works, examining the intersection of personal spirituality and contemporary visual language.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kup01x2wy","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sjitwkene","text":"张弓的\"启示录\"全面展示了艺术家的近期作品，审视个人精神性与当代视觉语言的交汇。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"kqsnjgbhd","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s6pxlr1gv","text":"An exhibition celebrating the unique artistic vision of Guo Fengyi, exploring her distinctive approach to art-making.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kqz3rxeng","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sygi3k1xi","text":"展览庆祝郭凤怡独特的艺术视野，探索她独特的艺术创作方式。","marks":[]}]}]
    },
    content: {
      en: [{"_type":"block","_key":"ksosy01nn","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sad2ucoeq","text":"Guo Fengyi's work represents a unique voice in contemporary Chinese art, combining traditional elements with deeply personal expression.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kt2x76anv","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sphv5pj9h","text":"郭凤怡的作品代表了中国当代艺术中的独特声音，将传统元素与深度个人表达相结合。","marks":[]}]}]
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
      en: [{"_type":"block","_key":"keph86i2f","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s53bqin6r","text":"Italian artist Dario Guccio brings his poetic exploration of dualities to K&W Art Center.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kxaysosr9","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sr8gpdnog","text":"意大利艺术家达里奥·古奇欧将其对二元性的诗意探索带到KWA金杜艺术中心。","marks":[]}]}]
    },
    content: {
      en: [{"_type":"block","_key":"knlbz9kmg","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"s7nloa8em","text":"Dario Guccio's exhibition \"Moon and Knife\" examines the relationship between opposing forces through contemporary visual language.","marks":[]}]}],
      zh: [{"_type":"block","_key":"k3d2b9nd0","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"shxj9gxqs","text":"达里奥·古奇欧的展览\"月球与刀\"通过当代视觉语言审视对立力量之间的关系。","marks":[]}]}]
    },
    coverImage: 'https://kwmartcenter.com/wp-content/uploads/2025/06/45-Snow-Covered-Pier-Kiyohama-Hokkaido-Japan.-2004.jpg',
    pdfUrl: { en: '', zh: '' },
    publishDate: '2020-03-18'
  },
  {
    id: '5',
    slug: 'kwm-8th-anniversary-announcement',
    title: {
      en: 'K&W Art Center Celebrates 8th Anniversary',
      zh: 'KWA金杜艺术中心庆祝八周年'
    },
    summary: {
      en: [{"_type":"block","_key":"k2dxa1nvy","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sxtsgwm02","text":"Since opening in 2016, K&W Art Center has become a vital hub for contemporary art in Beijing's CBD, presenting over 100 exhibitions.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kqjdiz054","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sn71tzzd7","text":"自2016年开幕以来，KWA金杜艺术中心已成为北京CBD当代艺术的重要枢纽，呈现了超过100场展览。","marks":[]}]}]
    },
    content: {
      en: [{"_type":"block","_key":"ks4hyc2jm","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"ststuvahy","text":"K&W Art Center officially opened on October 20, 2016, in the Global Financial Center within Beijing's CBD. The institution was founded with support from King & Wood Mallesons law firm, dedicated to presenting professional contemporary art exhibitions and supporting the K&W Foundation's collection.","marks":[]}]}],
      zh: [{"_type":"block","_key":"kcaoqc9o6","style":"normal","markDefs":[],"children":[{"_type":"span","_key":"sq0qvim6s","text":"KWA金杜艺术中心于2016年10月20日在北京CBD的环球金融中心正式开幕。该机构在金杜律师事务所的支持下成立，致力于呈现专业的当代艺术展览并支持KWA金杜基金会的收藏。","marks":[]}]}]
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
      en: 'Michael Yu leads the strategic direction and daily operations of K&W Art Center, ensuring the institution\'s mission to promote contemporary art and cultural exchange.',
      zh: '俞灵轩领导KWA金杜艺术中心的战略方向和日常运营，确保机构推广当代艺术和文化交流的使命。'
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
      en: 'Han Lin oversees all operational aspects of K&W Art Center, managing facilities, visitor services, and ensuring smooth exhibition execution.',
      zh: '韩琳负责KWA金杜艺术中心的所有运营工作，管理设施、观众服务，并确保展览顺利执行。'
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
      en: 'Sun Ruijiao develops and implements marketing strategies to engage audiences and enhance the visibility of K&W Art Center\'s programs.',
      zh: '孙瑞娇制定并实施营销策略，以吸引观众并提高KWA金杜艺术中心项目的知名度。'
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

export const mockAboutContent: LocalizedContent = {
  zh: `KWA金杜艺术中心于2016年10月20日在北京CBD环球金融中心正式开幕，由金杜律师事务所鼎力支持创建。

艺术中心致力于呈现专业的当代艺术展览，并支持金杜基金会收藏国内外优秀艺术家的作品。我们通过跨学科合作，涉足时尚、设计和建筑等领域，开展多元化的艺术教育项目和课程，培养艺术爱好者，推广高品质的美学鉴赏。

作为中国当代文化的有力传播者，KWA金杜艺术中心通过在全球办公室举办展览，以及与国际艺术机构合作，不断提升中国当代艺术的国际影响力。

地址：北京市朝阳区东三环中路1号环球金融中心东楼201室 100020
营业时间：周二至周六 10:00-19:00；周日及周一闭馆
联系方式：+86 10 56612254 | info@kwmartcenter.com`,
  en: `K&W Art Center officially opened on October 20, 2016, in the Global Financial Center within Beijing's CBD. The institution was founded with support from King & Wood Mallesons law firm.

The center is dedicated to presenting professional contemporary art exhibitions and supporting the K&W Foundation's collection of outstanding domestic and international artists' works. Through cross-disciplinary collaboration in fashion, design, and architecture, we conduct diverse educational programs and courses to cultivate art enthusiasts and promote high-quality aesthetic appreciation.

As a strong communicator of Chinese contemporary culture internationally, K&W Art Center enhances the global influence of Chinese contemporary art through exhibitions at our worldwide offices and collaborations with international art institutions.

Address: Room 201, East Tower, Global Financial Center, No. 1 East Third Ring Road, Chaoyang District, Beijing 100020
Hours: Tuesday-Saturday 10:00-19:00; Closed Sunday-Monday
Contact: +86 10 56612254 | info@kwmartcenter.com`
};
