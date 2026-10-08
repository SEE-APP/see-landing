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

export interface MobileNavProps {
  lang: Locale;
  brand: Dictionary['brand'];
  t: Dictionary['nav'];
}

export interface LanguageSwitcherProps {
  current: Locale;
  label: string;
}

export interface LanguageOptionsProps {
  current: Locale;
  itemClassName?: string;
}
