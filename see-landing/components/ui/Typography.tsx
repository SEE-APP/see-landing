import { cn } from '@/lib/cn';
import type {
  TypographyProps,
  TypographySize,
  TypographyTone,
  TypographyTracking,
  TypographyVariant,
  TypographyWeight,
} from '@/types/ui';

/** Sizes from this step up are headings and get tight tracking unless `tracking` says otherwise. */
const TIGHT_TRACKING_FROM = 28;

const sizeClasses: Record<TypographySize, string> = {
  14: 'text-14',
  16: 'text-16',
  18: 'text-18',
  20: 'text-20',
  32: 'text-32',
};

/** Presets that set size, weight and tone together, so `size`/`weight`/`tone` are not passed with them. */
const variantClasses: Record<TypographyVariant, string> = {
  display: 'text-40 font-semibold text-ink text-balance md:text-64',
  'body-lg': 'text-18 text-ink-muted text-pretty leading-[1.7]',
  body: 'text-16 text-ink-muted text-pretty leading-[1.7]',
};

const trackingClasses: Record<TypographyTracking, string> = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
};

const weightClasses: Record<TypographyWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
};

const toneClasses: Record<TypographyTone, string> = {
  inherit: '',
  muted: 'text-ink-muted',
  subtle: 'text-ink-subtle',
  accent: 'text-accent',
};

export default function Typography({
  as: Element = 'span',
  variant,
  size = 16,
  weight = 'regular',
  tone = 'inherit',
  tracking,
  id,
  className,
  children,
}: TypographyProps) {
  const isHeading = variant === 'display' || (!variant && size >= TIGHT_TRACKING_FROM);
  const resolvedTracking = tracking ?? (isHeading ? 'tight' : undefined);

  return (
    <Element
      id={id}
      className={cn(
        variant ? variantClasses[variant] : cn(sizeClasses[size], weightClasses[weight], toneClasses[tone]),
        resolvedTracking && trackingClasses[resolvedTracking],
        className,
      )}
    >
      {children}
    </Element>
  );
}
