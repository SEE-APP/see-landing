'use client';
// client: Web Share API and clipboard are browser-only, and the "copied" note is local state
import { Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ShareButtonProps } from '@/types/blog';

const copiedNoteMs = 2500;

export default function ShareButton({ title, url, t }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), copiedNoteMs);
    return () => clearTimeout(timer);
  }, [isCopied]);

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch {
      // The visitor closed the share sheet, or the browser blocked the clipboard; nothing to report.
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label={t.shareLabel}
        onClick={share}
        className="inline-flex cursor-pointer items-center gap-2 rounded-sm text-14 text-ink-muted transition-colors duration-200 hover:text-ink focus-ring"
      >
        <Share2 size={16} aria-hidden="true" />
        {t.share}
      </button>
      <span role="status" className="text-14 text-ink-muted">
        {isCopied ? t.copied : ''}
      </span>
    </div>
  );
}
