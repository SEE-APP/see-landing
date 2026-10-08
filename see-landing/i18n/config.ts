export const locales = ['en', 'ka'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Shown in the language switcher, written in the language itself. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ka: 'ქართული',
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://see.ge';

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
