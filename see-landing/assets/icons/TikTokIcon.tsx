import type { IconProps } from '@/types/ui';

export default function TikTokIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V3a4.98 4.98 0 0 0 5 4.5" />
      <path d="M14 7.5a5 5 0 0 0 4 2" />
    </svg>
  );
}
