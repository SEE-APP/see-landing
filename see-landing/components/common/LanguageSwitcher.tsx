import Link from 'next/link';
import { cn } from '@/lib/cn';
import { localeNames, locales } from '@/i18n/config';
import type { LanguageSwitcherProps } from '@/types/layout';

export default function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  return (
    <ul aria-label={label} className="flex items-center gap-1 rounded-full border border-white/10 p-1">
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            aria-current={locale === current ? 'true' : undefined}
            title={localeNames[locale]}
            className={cn(
              'block rounded-full px-2.5 py-1 font-mono text-12 uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300',
              locale === current ? 'bg-primary-300 text-dark-500' : 'text-slate-400 hover:text-primary-300',
            )}
          >
            {locale}
          </Link>
        </li>
      ))}
    </ul>
  );
}
