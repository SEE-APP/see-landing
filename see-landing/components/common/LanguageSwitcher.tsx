import { Globe } from 'lucide-react';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdown';
import { localeNames, locales } from '@/i18n/config';
import type { LanguageOptionsProps, LanguageSwitcherProps } from '@/types/layout';

function LanguageOptions({ current, itemClassName }: LanguageOptionsProps) {
  return locales.map((locale) => (
    <li key={locale}>
      <DropdownItem
        href={`/${locale}`}
        hrefLang={locale}
        lang={locale}
        aria-current={locale === current ? 'page' : undefined}
        className={itemClassName}
      >
        <span>{localeNames[locale]}</span>
        <span className="font-mono text-12 uppercase">{locale}</span>
      </DropdownItem>
    </li>
  ));
}

/** Header dropdown: globe + current locale code. */
export default function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  return (
    <Dropdown
      id="nav-lang"
      trigger="pill"
      label={
        <>
          <Globe size={16} aria-hidden="true" />
          <span className="sr-only">{label}: </span>
          <span className="font-mono text-13 uppercase">{current}</span>
        </>
      }
    >
      <ul aria-label={label}>
        <LanguageOptions current={current} />
      </ul>
    </Dropdown>
  );
}

/** Inline list for the mobile menu (no nested popover). */
export function LanguageList({ current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-1">
      <LanguageOptions current={current} itemClassName="min-h-11" />
    </ul>
  );
}
