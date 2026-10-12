import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { controlClasses } from '@/lib/controls';
import type { SelectProps } from '@/types/ui';

export default function Select({ invalid, className, children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...rest}
        aria-invalid={invalid || undefined}
        className={cn(controlClasses, 'h-12 cursor-pointer appearance-none pr-8', className)}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-ink-muted"
      />
    </div>
  );
}
