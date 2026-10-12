'use client';
// client: hides the header while scrolling down and brings it back on scroll up

import { useEffect, useRef, useState } from 'react';
import type { AutoHideHeaderProps } from '@/types/layout';

/** Pixels of scroll in one direction before the header reacts, so small jitters are ignored. */
const SCROLL_THRESHOLD = 8;

export default function AutoHideHeader({ children }: AutoHideHeaderProps) {
  const [isHidden, setIsHidden] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) < SCROLL_THRESHOLD) return;
      // Keep the header visible while it is still within its own height of the top.
      const topOffset = ref.current?.offsetHeight ?? 0;
      setIsHidden(y > lastY && y > topOffset);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      data-hidden={isHidden || undefined}
      onFocusCapture={() => setIsHidden(false)}
      className="sticky top-0 z-[100] select-none border-b border-line bg-canvas transition-transform duration-300 ease-out-expo data-hidden:-translate-y-full motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
