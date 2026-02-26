interface WeiboIconProps {
  className?: string;
}

export default function WeiboIcon({ className = 'h-5 w-5' }: WeiboIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.1 16.9c2.8 1.8 7 1.4 9.4-.9 2.2-2.2 2-5-.5-6.4-1-.5-1.3-.9-1-1.4.6-1.1 0-2.2-1.5-2.1-1.1.1-2.2.6-3.2 1.6-.3.2-.5.2-.7-.1-.4-.6-1.2-.8-2.1-.3-1 .6-1.2 1.5-.7 2.4.2.3.1.5-.3.8-2.2 1.7-2 4.5.6 6.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10.2" cy="13.7" r="1" fill="currentColor" />
      <path
        d="M16.9 5.2c.8.4 1.4 1 1.8 1.8M18.7 3.4c1.3.6 2.3 1.6 2.9 2.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
