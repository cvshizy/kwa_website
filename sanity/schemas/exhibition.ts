import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'exhibition',
  title: '展览',
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
      name: 'artist_en',
      title: '艺术家（英文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artist_zh',
      title: '艺术家（中文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description_en',
      title: '描述（英文）',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'description_zh',
      title: '描述（中文）',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'startDate',
      title: '开始日期',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: '结束日期',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: '状态',
      type: 'string',
      options: {
        list: [
          { title: '即将开展', value: 'upcoming' },
          { title: '正在展出', value: 'current' },
          { title: '已结束', value: 'past' },
        ],
      },
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
      name: 'images',
      title: '展览图集',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'featured',
      title: '首页推荐',
      type: 'boolean',
      description: '在首页展示此展览',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title_zh',
      artist: 'artist_zh',
      media: 'coverImage',
      status: 'status',
    },
    prepare(selection) {
      const { title, artist, status } = selection;
      const statusMap: Record<string, string> = {
        upcoming: '即将开展',
        current: '正在展出',
        past: '已结束',
      };
      return {
        ...selection,
        title: title,
        subtitle: `${artist} · ${statusMap[status] || status}`,
      };
    },
  },
});
