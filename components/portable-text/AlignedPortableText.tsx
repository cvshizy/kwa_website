import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock, TypedObject } from '@portabletext/types';

type RichTextValue = string | TypedObject[] | null | undefined;

type BlockConfig = {
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  className: string;
};

const blockStyles: Record<string, BlockConfig> = {
  normal: { tag: 'p', className: 'text-left' },
  normalCenter: { tag: 'p', className: 'text-center' },
  normalRight: { tag: 'p', className: 'text-right' },
  normalJustify: { tag: 'p', className: 'text-justify' },
  h1: { tag: 'h1', className: 'text-left' },
  h1Center: { tag: 'h1', className: 'text-center' },
  h1Right: { tag: 'h1', className: 'text-right' },
  h2: { tag: 'h2', className: 'text-left' },
  h2Center: { tag: 'h2', className: 'text-center' },
  h2Right: { tag: 'h2', className: 'text-right' },
  h3: { tag: 'h3', className: 'text-left' },
  h3Center: { tag: 'h3', className: 'text-center' },
  h3Right: { tag: 'h3', className: 'text-right' },
  h4: { tag: 'h4', className: 'text-left' },
  h4Center: { tag: 'h4', className: 'text-center' },
  h4Right: { tag: 'h4', className: 'text-right' },
  blockquote: { tag: 'blockquote', className: 'text-left' },
  blockquoteCenter: { tag: 'blockquote', className: 'text-center' },
  blockquoteRight: { tag: 'blockquote', className: 'text-right' },
};

const components: PortableTextComponents = {
  block: ({ children, value }) => {
    const style = (value as PortableTextBlock)?.style || 'normal';
    const config = blockStyles[style] || blockStyles.normal;
    const Tag = config.tag;

    return <Tag className={config.className}>{children}</Tag>;
  },
};

export function AlignedPortableText({ value }: { value: TypedObject[] }) {
  return <PortableText value={value} components={components} />;
}

export function RichText({
  value,
  className,
  preserveLineBreaks = true,
}: {
  value: RichTextValue;
  className?: string;
  preserveLineBreaks?: boolean;
}) {
  if (Array.isArray(value)) {
    return (
      <div className={className}>
        <AlignedPortableText value={value} />
      </div>
    );
  }

  if (typeof value === 'string' && value.trim()) {
    return (
      <p className={[className, preserveLineBreaks ? 'whitespace-pre-line' : ''].filter(Boolean).join(' ')}>
        {value}
      </p>
    );
  }

  return null;
}
