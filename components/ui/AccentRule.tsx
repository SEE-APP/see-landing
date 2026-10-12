import { cn } from '@/lib/cn';
import type { AccentRuleProps } from '@/types/ui';

/** The teal line that slides over a hairline border; the parent is `relative` with `border-t` or `border-b`. */
export default function AccentRule({ isActive, edge = 'top' }: AccentRuleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'absolute left-0 h-0.5 w-full origin-left bg-accent transition-transform duration-300 ease-out-expo motion-reduce:transition-none',
        edge === 'top' ? '-top-px' : '-bottom-px',
        isActive ? 'scale-x-100' : 'scale-x-0',
      )}
    />
  );
}
