import { defineArrayMember } from 'sanity';

export const alignedPortableTextBlock = defineArrayMember({
  type: 'block',
  styles: [
    { title: '正文 / 左对齐', value: 'normal' },
    { title: '正文 / 居中', value: 'normalCenter' },
    { title: '正文 / 右对齐', value: 'normalRight' },
    { title: '正文 / 两端对齐', value: 'normalJustify' },
    { title: '标题 2 / 左对齐', value: 'h2' },
    { title: '标题 2 / 居中', value: 'h2Center' },
    { title: '标题 2 / 右对齐', value: 'h2Right' },
    { title: '标题 3 / 左对齐', value: 'h3' },
    { title: '标题 3 / 居中', value: 'h3Center' },
    { title: '标题 3 / 右对齐', value: 'h3Right' },
    { title: '引用 / 左对齐', value: 'blockquote' },
    { title: '引用 / 居中', value: 'blockquoteCenter' },
    { title: '引用 / 右对齐', value: 'blockquoteRight' },
  ],
});

export const alignedPortableText = [alignedPortableTextBlock];
