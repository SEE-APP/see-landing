import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ButtonProps, ButtonShape, ButtonSize, ButtonVariant } from '@/types/ui';

const baseClasses =
  'inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 font-medium transition duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60';

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    'bg-accent-strong text-14 text-on-accent shadow-lg shadow-accent/25 ' +
    'hover:bg-accent-hover active:scale-[0.98]',
  outline:
    'border border-accent/60 text-14 text-accent ' +
    'hover:border-accent hover:bg-accent-soft active:bg-accent/20',
  text: 'rounded-sm text-accent hover:text-accent-hover',
  icon:
    'size-11 rounded-full border border-line-strong bg-surface text-ink-subtle ' +
    'hover:border-accent/40 hover:bg-accent-soft hover:text-accent',
};

const pillSizeClasses: Record<ButtonSize, string> = {
  md: 'h-12 px-6',
  sm: 'h-10 px-5',
};

const shapeClasses: Record<ButtonShape, string> = {
  pill: 'rounded-full',
  rounded: 'rounded-lg',
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
    />
  );
}

export default function Button({
  label,
  leftIcon,
  rightIcon,
  variant = 'filled',
  size = 'md',
  shape = 'pill',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className,
  ...rest
}: ButtonProps) {
  const isPill = variant === 'filled' || variant === 'outline';
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    isPill && pillSizeClasses[size],
    isPill && shapeClasses[shape],
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {isLoading ? <Spinner /> : leftIcon && <span className="flex" aria-hidden="true">{leftIcon}</span>}
      {label && <span className="leading-none">{label}</span>}
      {!isLoading && rightIcon && <span className="flex" aria-hidden="true">{rightIcon}</span>}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest;
    const inactive = disabled || isLoading;

    return (
      <Link
        {...linkProps}
        href={href}
        aria-disabled={inactive || undefined}
        tabIndex={inactive ? -1 : linkProps.tabIndex}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = rest;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={classes}
    >
      {content}
    </button>
  );
}
