import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: '团队成员',
  type: 'document',
  fields: [
    defineField({
      name: 'nameCN',
      title: '姓名（中文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEN',
      title: '姓名（英文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleCN',
      title: '职位（中文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEN',
      title: '职位（英文）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: '照片',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio_en',
      title: '简介（英文）',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'bio_zh',
      title: '简介（中文）',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'order',
      title: '显示顺序',
      type: 'number',
      description: '数字越小越靠前',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'nameCN',
      subtitle: 'titleCN',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: '显示顺序',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
