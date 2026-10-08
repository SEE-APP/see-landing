import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode, SVGProps } from 'react';

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
/** Height and padding of the `filled` and `outline` pills; ignored by `text` and `icon`. */
export type ButtonSize = 'md' | 'sm';

type ButtonSharedProps = {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** @default 'filled' */
  variant?: ButtonVariant;
  /** @default 'md' */
  size?: ButtonSize;
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

export interface PopoverPanelProps {
  /** Must be unique on the page; the trigger points at it with `popoverTarget`. */
  id: string;
  className?: string;
  /** Per-instance values only (e.g. the CSS anchor name). */
  style?: CSSProperties;
  'aria-label'?: string;
  children: ReactNode;
}

/** `link` looks like a nav link; `pill` is a bordered rounded-full control. */
export type DropdownTrigger = 'link' | 'pill';

/** The panel opens below its trigger, right edges aligned. */
export interface DropdownProps {
  id: string;
  /** Trigger content; a chevron is appended. */
  label: ReactNode;
  /** @default 'link' */
  trigger?: DropdownTrigger;
  children: ReactNode;
}

export type DropdownItemProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> & {
  href: string;
  children: ReactNode;
};
