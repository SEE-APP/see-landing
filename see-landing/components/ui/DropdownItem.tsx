import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { DropdownItemProps } from '@/types/ui';

export default function DropdownItem({ href, className, children, ...rest }: DropdownItemProps) {
  return (
    <Link
      href={href}
      {...rest}
      className={cn(
        'flex items-center justify-between gap-8 rounded-md px-3 py-2 text-14 text-ink-muted transition-colors duration-150',
        'hover:bg-line/50 hover:text-ink focus-visible:bg-line/50 focus-visible:text-ink',
        'focus-ring-inset',
        'aria-[current=page]:font-medium aria-[current=page]:text-ink',
        className,
      )}
    >
      {children}
    </Link>
  );
}
