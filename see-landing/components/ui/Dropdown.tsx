import type { CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import PopoverPanel from '@/components/ui/PopoverPanel';
import type { DropdownProps } from '@/types/ui';

export default function Dropdown({ id, label, children }: DropdownProps) {
  const anchor = `--${id}`;

  return (
    <div className="group/dropdown flex">
      <button
        type="button"
        popoverTarget={id}
        style={{ anchorName: anchor } as CSSProperties}
        className="inline-flex cursor-pointer items-center gap-1 rounded-sm text-14 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent group-has-[:popover-open]/dropdown:text-ink"
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
        className="dropdown-panel min-w-44 rounded-lg border border-line bg-canvas p-1 text-ink shadow-[0_12px_24px_-16px_var(--shadow-tint)]"
      >
        {children}
      </PopoverPanel>
    </div>
  );
}
