import { Check } from 'lucide-react';
import DropdownItem from '@/components/ui/DropdownItem';
import { localeNames, locales } from '@/i18n/config';
import type { LanguageOptionsProps } from '@/types/layout';

export default function LanguageOptions({ current, itemClassName }: LanguageOptionsProps) {
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
        {locale === current && <Check size={14} aria-hidden="true" className="text-accent" />}
      </DropdownItem>
    </li>
  ));
}
