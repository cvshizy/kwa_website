interface WeChatIconProps {
  className?: string;
}

export default function WeChatIcon({ className = 'h-5 w-5' }: WeChatIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.1 5.1C5.2 5.1 2 7.6 2 10.8c0 1.7.9 3.2 2.3 4.3l-.6 2.2 2.7-1.5c.8.2 1.7.3 2.7.3 3.9 0 7.1-2.5 7.1-5.6S13 5.1 9.1 5.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M15.8 10.4c-2.9 0-5.3 1.9-5.3 4.3 0 2.3 2.4 4.2 5.3 4.2.8 0 1.6-.1 2.3-.4l2 .9-.4-1.7c1.2-.8 1.9-1.9 1.9-3.1 0-2.4-2.3-4.2-5.2-4.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="7.3" cy="10.4" r="0.9" fill="currentColor" />
      <circle cx="10.9" cy="10.4" r="0.9" fill="currentColor" />
      <circle cx="14.2" cy="14.5" r="0.9" fill="currentColor" />
      <circle cx="17.5" cy="14.5" r="0.9" fill="currentColor" />
    </svg>
  );
}
