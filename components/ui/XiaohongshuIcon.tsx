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
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#FF2442" />
      <text
        x="12"
        y="14"
        textAnchor="middle"
        fill="white"
        fontSize="6.2"
        fontWeight="700"
        fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, sans-serif"
      >
        小红书
      </text>
    </svg>
  );
}
