import { CSSProperties } from 'react';

interface SocialMaskIconProps {
  src: string;
  className?: string;
}

export default function SocialMaskIcon({ src, className = 'h-5 w-5' }: SocialMaskIconProps) {
  const style: CSSProperties = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain'
  };

  return <span className={`${className} block bg-current`} style={style} aria-hidden="true" />;
}
