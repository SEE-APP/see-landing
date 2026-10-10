import type { Dictionary, Locale } from './i18n';

export interface NavbarProps {
  lang: Locale;
  brand: Dictionary['brand'];
  t: Dictionary['nav'];
}

export interface FooterProps {
  lang: Locale;
  brand: Dictionary['brand'];
  nav: Dictionary['nav']['links'];
  t: Dictionary['footer'];
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

export interface LanguageSwitcherProps {
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
