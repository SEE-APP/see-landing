import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import PopoverPanel from '@/components/ui/PopoverPanel';
import { cn } from '@/lib/cn';
import type { DropdownItemProps, DropdownProps, DropdownTrigger } from '@/types/ui';

/** Surface shared by the header dropdowns. */
export const popoverSurfaceClasses =
  'rounded-xl border border-white/10 bg-dark-700/95 text-slate-50 shadow-xl shadow-black/40 backdrop-blur-lg';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300';

const triggerClasses: Record<DropdownTrigger, string> = {
  link: 'rounded-sm',
  pill: 'h-10 rounded-full border border-white/10 px-3 hover:border-primary-300/40',
};

export function DropdownItem({ href, className, children, ...rest }: DropdownItemProps) {
  return (
    <Link
      href={href}
      {...rest}
      className={cn(
        'flex items-center justify-between gap-6 rounded-lg px-3 py-2 text-14 text-slate-400 transition-colors duration-150',
        'hover:bg-white/5 hover:text-primary-300 focus-visible:bg-white/5 focus-visible:text-primary-300',
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-300',
        'aria-[current=page]:bg-white/5 aria-[current=page]:text-primary-300',
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
          'inline-flex cursor-pointer items-center gap-1.5 text-14 text-slate-400 transition-colors duration-200',
          'hover:text-primary-300 focus-visible:text-primary-300 group-has-[:popover-open]/dropdown:text-primary-300',
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
