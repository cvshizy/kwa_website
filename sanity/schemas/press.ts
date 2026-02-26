import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'press',
  title: '新闻',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: '标题（英文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_zh',
      title: '标题（中文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '链接标识',
      type: 'slug',
      options: {
        source: 'title_en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary_en',
      title: '摘要（英文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary_zh',
      title: '摘要（中文）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content_en',
      title: '正文（英文）',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content_zh',
      title: '正文（中文）',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: '封面图片',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: '发布日期',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title_zh',
      media: 'coverImage',
      date: 'publishDate',
    },
    prepare(selection) {
      const { title, date } = selection;
      return {
        ...selection,
        title: title,
        subtitle: date,
      };
    },
  },
});
