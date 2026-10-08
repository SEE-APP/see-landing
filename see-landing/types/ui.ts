import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, SVGProps } from 'react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & { size?: number };

export type TypographySize = 10 | 12 | 13 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 64;
export type TypographyWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type TypographyAlign = 'left' | 'center' | 'right';
export type TypographyTone = 'inherit' | 'default' | 'muted' | 'subtle' | 'accent';
export type TypographyElement = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';

export interface TypographyProps {
  /** @default 'span' */
  as?: TypographyElement;
  /** Font size in px, mapped to the `text-{size}` theme token. @default 16 */
  size?: TypographySize;
  /** @default 'regular' */
  weight?: TypographyWeight;
  /** Inherits from the parent when omitted. */
  align?: TypographyAlign;
  /** @default 'inherit' */
  tone?: TypographyTone;
  underline?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}

export interface EyebrowProps {
  label: string;
}

export type ButtonVariant = 'filled' | 'outline' | 'text' | 'icon';

type ButtonSharedProps = {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** @default 'filled' */
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonAsButton = ButtonSharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };

type ButtonAsLink = ButtonSharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;
