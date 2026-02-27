import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: '关于页面',
  type: 'document',
  fields: [
    defineField({
      name: 'content_zh',
      title: '页面内容（中文）',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content_en',
      title: '页面内容（英文）',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '关于页面内容',
      };
    },
  },
});
