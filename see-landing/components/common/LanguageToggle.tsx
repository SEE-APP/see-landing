import Link from 'next/link';
import { localeNames, locales } from '@/i18n/config';
import type { LanguageSwitcherProps } from '@/types/layout';

/** Inline segmented switch for the footer, styled like ThemeSwitcher. */
export default function LanguageToggle({ current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  return (
    <ul aria-label={label} className="flex items-center gap-0.5 rounded-full border border-line bg-surface p-1">
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            aria-current={locale === current ? 'page' : undefined}
            className="flex h-9 items-center rounded-full px-3.5 text-14 text-ink-muted transition-colors duration-200 hover:text-accent aria-[current=page]:bg-accent-strong aria-[current=page]:text-on-accent focus-ring"
          >
            {localeNames[locale]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
