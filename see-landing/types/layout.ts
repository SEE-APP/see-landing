import type { ReactNode } from 'react';
import type { Dictionary, Locale } from './i18n';

export interface NavbarProps {
  lang: Locale;
  brand: Dictionary['brand'];
  t: Dictionary['nav'];
}

export interface FooterProps {
  lang: Locale;
  brand: Dictionary['brand'];
  nav: Dictionary['nav'];
  t: Dictionary['footer'];
}

export interface AutoHideHeaderProps {
  children: ReactNode;
}

export interface FooterColumnProps {
  /** Anchor for in-page links (`#contact`). */
  id?: string;
  title: string;
  children: ReactNode;
}

export interface FooterNavProps {
  lang: Locale;
  labels: Dictionary['nav']['links'];
  ariaLabel: string;
}

export interface SocialLinksProps {
  labels: Dictionary['footer']['social'];
}

export interface BrandLinkProps {
  lang: Locale;
  brand: Dictionary['brand'];
  /** Accessible name of the link (`nav.home`). */
  label: string;
}

export interface MobileNavProps {
  lang: Locale;
  brand: Dictionary['brand'];
  t: Dictionary['nav'];
}

/** `header`: dropdown in the navbar. `footer`: upward dropdown with a globe. `menu`: collapsible row in the mobile menu. */
export type LanguageSwitcherVariant = 'header' | 'footer' | 'menu';

export interface LanguageSwitcherProps {
  variant: LanguageSwitcherVariant;
  current: Locale;
  label: string;
}

export interface ThemeSwitcherProps {
  t: Dictionary['footer']['theme'];
}

export type Theme = 'light' | 'dark';

export interface LanguageOptionsProps {
  current: Locale;
  itemClassName?: string;
}
