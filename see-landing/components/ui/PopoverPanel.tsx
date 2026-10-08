'use client';
// client: closes the native popover after a link inside it is followed

import { useRef, type MouseEvent } from 'react';
import type { PopoverPanelProps } from '@/types/ui';

export default function PopoverPanel({ id, className, style, children, 'aria-label': ariaLabel }: PopoverPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as Element).closest('a')) ref.current?.hidePopover();
  }

  return (
    <div id={id} popover="auto" ref={ref} onClick={handleClick} aria-label={ariaLabel} className={className} style={style}>
      {children}
    </div>
  );
}
