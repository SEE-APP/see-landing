'use client';
// client: closes the native popover after a link inside it is followed; as a modal it also moves and traps focus

import { useRef, type KeyboardEvent, type MouseEvent } from 'react';
import type { PopoverPanelProps } from '@/types/ui';

const FOCUSABLE = 'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function PopoverPanel({
  id,
  className,
  style,
  modal = false,
  children,
  'aria-label': ariaLabel,
}: PopoverPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  /** Focusable elements that are actually rendered (not inside a closed `<details>`). */
  function focusableItems() {
    const items = ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [];
    return Array.from(items).filter((item) => item.getClientRects().length > 0);
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as Element).closest('a')) ref.current?.hidePopover();
  }

  function handleToggle() {
    if (!modal || !ref.current?.matches(':popover-open')) return;
    const target = ref.current.querySelector<HTMLElement>('[data-autofocus]') ?? focusableItems()[0];
    target?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!modal || event.key !== 'Tab') return;
    const items = focusableItems();
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      id={id}
      popover="auto"
      ref={ref}
      role={modal ? 'dialog' : undefined}
      aria-modal={modal || undefined}
      aria-label={ariaLabel}
      onClick={handleClick}
      onToggle={handleToggle}
      onKeyDown={handleKeyDown}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
