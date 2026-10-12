import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import PopoverPanel from '@/components/ui/PopoverPanel';
import { cn } from '@/lib/cn';
import type { DropdownPlacement, DropdownProps } from '@/types/ui';

const placementClasses: Record<DropdownPlacement, string> = {
  bottom: 'dropdown-panel',
  top: 'dropdown-panel dropdown-panel-top',
};

export default function Dropdown({ id, label, placement = 'bottom', children }: DropdownProps) {
  const anchor = `--${id}`;

  return (
    <div className="group/dropdown flex">
      <button
        type="button"
        popoverTarget={id}
        style={{ anchorName: anchor } as CSSProperties}
        className="inline-flex cursor-pointer items-center gap-1 rounded-sm text-14 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:text-ink focus-ring group-has-[:popover-open]/dropdown:text-ink"
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
        className={cn(
          placementClasses[placement],
          'min-w-44 rounded-lg border border-line bg-canvas p-1 text-ink shadow-[0_12px_24px_-16px_var(--shadow-tint)]',
        )}
      >
        {children}
      </PopoverPanel>
    </div>
  );
}
