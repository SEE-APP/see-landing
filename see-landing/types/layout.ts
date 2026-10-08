import type { Dictionary, Locale } from './i18n';

export interface NavbarProps {
  lang: Locale;
  t: Dictionary['nav'];
}

export interface FooterProps {
  lang: Locale;
  nav: Dictionary['nav']['links'];
  t: Dictionary['footer'];
}

export interface LanguageSwitcherProps {
  current: Locale;
  label: string;
}
