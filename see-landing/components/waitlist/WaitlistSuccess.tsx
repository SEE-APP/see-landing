import { Check } from 'lucide-react';
import Typography from '@/components/ui/Typography';
import type { WaitlistSuccessProps } from '@/types/sections';

export default function WaitlistSuccess({ title, body }: WaitlistSuccessProps) {
  return (
    <div role="status" className="flex flex-col items-center text-center">
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-full bg-accent text-on-accent"
      >
        <Check size={22} strokeWidth={3} />
      </span>
      <Typography as="p" size={20} weight="semibold" tone="default" className="mt-5">
        {title}
      </Typography>
      <Typography as="p" size={16} tone="muted" className="mt-2">
        {body}
      </Typography>
    </div>
  );
}
