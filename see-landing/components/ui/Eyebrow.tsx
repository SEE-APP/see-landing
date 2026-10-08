import type { EyebrowProps } from '@/types/ui';
import Typography from './Typography';

export default function Eyebrow({ label }: EyebrowProps) {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-4 py-1.5 backdrop-blur-xl">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-primary-300" />
      <Typography size={12} tone="subtle" className="font-mono uppercase tracking-[0.15em]">
        {label}
      </Typography>
    </div>
  );
}
