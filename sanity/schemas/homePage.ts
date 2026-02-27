import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: '首页内容',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle_zh',
      title: 'Hero 主标题（中文）',
      type: 'text',
      rows: 2,
      description: '可用换行控制标题分行（回车即换行）',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle_en',
      title: 'Hero 主标题（英文）',
      type: 'text',
      rows: 2,
      description: '可用换行控制标题分行（回车即换行）',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle_zh',
      title: 'Hero 副标题（中文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle_en',
      title: 'Hero 副标题（英文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutTitle_zh',
      title: '关于模块主标题（中文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutTitle_en',
      title: '关于模块主标题（英文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutSubtitle_zh',
      title: '关于模块副标题（中文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutSubtitle_en',
      title: '关于模块副标题（英文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '首页文案',
      };
    },
  },
});
