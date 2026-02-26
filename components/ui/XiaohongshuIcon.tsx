interface XiaohongshuIconProps {
  className?: string;
}

export default function XiaohongshuIcon({ className = 'h-5 w-5' }: XiaohongshuIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7.2 9.6c1.1-.8 2.2-1.1 3.4-1.1 1.3 0 2.4.4 3.5 1.1M8.2 12.7h7.6M9 15.6h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
