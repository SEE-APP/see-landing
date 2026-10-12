import { Check } from 'lucide-react';
import Typography from '@/components/ui/Typography';
import type { FormSuccessProps } from '@/types/ui';

/** Takes focus when it appears, because the form (and its focused button) has just left the page. */
export default function FormSuccess({ title, body }: FormSuccessProps) {
  return (
    <div
      ref={(node) => node?.focus()}
      tabIndex={-1}
      className="flex flex-col items-center text-center outline-none"
    >
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-full bg-accent text-on-accent"
      >
        <Check size={22} strokeWidth={3} />
      </span>
      <Typography as="p" size={20} weight="semibold" className="mt-5">
        {title}
      </Typography>
      <Typography as="p" size={16} tone="muted" className="mt-2">
        {body}
      </Typography>
    </div>
  );
}
