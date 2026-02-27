import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: '联系页面',
  type: 'document',
  fields: [
    defineField({
      name: 'address_zh',
      title: '地址（中文）',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address_en',
      title: '地址（英文）',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hours_zh',
      title: '营业时间（中文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hours_en',
      title: '营业时间（英文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: '电话',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: '邮箱',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wechatDescription_zh',
      title: '微信弹窗说明（中文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wechatDescription_en',
      title: '微信弹窗说明（英文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'xiaohongshuUrl',
      title: '小红书链接',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'douyinUrl',
      title: '抖音链接',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'weiboUrl',
      title: '微博链接',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '联系页面内容',
      };
    },
  },
});
