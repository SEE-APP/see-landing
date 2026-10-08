import { cn } from '@/lib/cn';
import type {
  TypographyAlign,
  TypographyProps,
  TypographySize,
  TypographyTone,
  TypographyWeight,
} from '@/types/ui';

const sizeClasses: Record<TypographySize, string> = {
  10: 'text-10',
  12: 'text-12',
  13: 'text-13',
  14: 'text-14',
  16: 'text-16',
  18: 'text-18',
  20: 'text-20',
  24: 'text-24',
  28: 'text-28 tracking-tight',
  32: 'text-32 tracking-tight',
  36: 'text-36 tracking-tight',
  40: 'text-40 tracking-tight',
  48: 'text-48 tracking-tight',
  64: 'text-64 tracking-tight',
};

const weightClasses: Record<TypographyWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const alignClasses: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const toneClasses: Record<TypographyTone, string> = {
  inherit: '',
  default: 'text-white',
  muted: 'text-slate-400',
  subtle: 'text-slate-300',
  accent: 'text-primary-300',
};

export default function Typography({
  as: Element = 'span',
  size = 16,
  weight = 'regular',
  align,
  tone = 'inherit',
  underline = false,
  id,
  className,
  children,
}: TypographyProps) {
  return (
    <Element
      id={id}
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        align && alignClasses[align],
        toneClasses[tone],
        underline && 'underline underline-offset-[0.2em]',
        className,
      )}
    >
      {children}
    </Element>
  );
}
