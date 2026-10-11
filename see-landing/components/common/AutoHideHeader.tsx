'use client';
// client: hides the header while scrolling down and brings it back on scroll up

import { useEffect, useState } from 'react';
import type { AutoHideHeaderProps } from '@/types/layout';

/** Pixels of scroll in one direction before the header reacts, so small jitters are ignored. */
const SCROLL_THRESHOLD = 8;
/** Keep the header visible near the top of the page. */
const TOP_OFFSET = 64;

export default function AutoHideHeader({ children }: AutoHideHeaderProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) < SCROLL_THRESHOLD) return;
      setIsHidden(y > lastY && y > TOP_OFFSET);
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
      data-hidden={isHidden || undefined}
      onFocusCapture={() => setIsHidden(false)}
      className="sticky top-0 z-[100] select-none border-b border-line bg-canvas transition-transform duration-300 ease-out-expo data-hidden:-translate-y-full motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
