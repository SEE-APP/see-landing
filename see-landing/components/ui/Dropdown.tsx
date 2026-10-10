import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import PopoverPanel from '@/components/ui/PopoverPanel';
import { cn } from '@/lib/cn';
import type { DropdownItemProps, DropdownProps, DropdownTrigger } from '@/types/ui';

/** Surface shared by the header dropdowns. */
export const popoverSurfaceClasses =
  'rounded-xl border border-line-strong bg-footer/95 text-ink shadow-xl shadow-shade backdrop-blur-lg';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

const triggerClasses: Record<DropdownTrigger, string> = {
  link: 'rounded-sm',
  pill: 'h-10 rounded-full border border-line-strong px-3 hover:border-accent/40',
};

export function DropdownItem({ href, className, children, ...rest }: DropdownItemProps) {
  return (
    <Link
      href={href}
      {...rest}
      className={cn(
        'flex items-center justify-between gap-6 rounded-lg px-3 py-2 text-14 text-ink-muted transition-colors duration-150',
        'hover:bg-accent-soft hover:text-accent focus-visible:bg-accent-soft focus-visible:text-accent',
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent',
        'aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent',
        className,
      )}
    >
      {children}
    </Link>
  );
}

export default function Dropdown({ id, label, trigger = 'link', children }: DropdownProps) {
  const anchor = `--${id}`;

  return (
    <div className="group/dropdown flex">
      <button
        type="button"
        popoverTarget={id}
        style={{ anchorName: anchor } as CSSProperties}
        className={cn(
          'inline-flex cursor-pointer items-center gap-1.5 text-14 text-ink-muted transition-colors duration-200',
          'hover:text-accent focus-visible:text-accent group-has-[:popover-open]/dropdown:text-accent',
          focusRing,
          triggerClasses[trigger],
        )}
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="transition-transform duration-200 ease-out-expo group-has-[:popover-open]/dropdown:rotate-180 motion-reduce:transition-none"
        />
      </button>
      <PopoverPanel
        id={id}
        style={{ positionAnchor: anchor } as CSSProperties}
        className={cn('dropdown-panel min-w-48 p-1.5', popoverSurfaceClasses)}
      >
        {children}
      </PopoverPanel>
    </div>
  );
}
