import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ButtonProps, ButtonVariant } from '@/types/ui';

const baseClasses =
  'inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 font-medium transition duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 ' +
  'disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60';

const variantClasses: Record<ButtonVariant, string> = {
  filled:
    'h-12 rounded-full bg-primary-300 px-6 text-14 text-dark-500 shadow-lg shadow-primary-500/30 ' +
    'hover:bg-primary-200 active:bg-primary-400',
  outline:
    'h-12 rounded-full border border-primary-300/60 px-6 text-14 text-primary-300 ' +
    'hover:border-primary-300 hover:bg-primary-300/10 active:bg-primary-300/20',
  text: 'rounded-sm text-primary-300 hover:text-primary-200',
  icon:
    'size-11 rounded-full border border-white/10 bg-white/5 text-slate-200 ' +
    'hover:border-primary-300/40 hover:bg-primary-300/10 hover:text-primary-300',
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
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], fullWidth && 'w-full', className);

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
