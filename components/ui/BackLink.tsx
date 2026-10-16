import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { BackLinkProps } from '@/types/ui';

export default function BackLink({ href, label, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-sm text-14 text-ink-muted transition-colors duration-200 hover:text-ink focus-ring',
        className,
      )}
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {label}
    </Link>
  );
}
