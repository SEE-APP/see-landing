'use client';
// client: reads the current path so switching language stays on the same page

import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';
import DropdownItem from '@/components/ui/DropdownItem';
import { localeNames, locales } from '@/i18n/config';
import { localeHref } from '@/lib/site';
import type { LanguageOptionsProps } from '@/types/layout';

export default function LanguageOptions({ current, itemClassName }: LanguageOptionsProps) {
  const pathname = usePathname();
  const pagePath = pathname.startsWith(`/${current}`) ? pathname.slice(current.length + 1) : '';

  return locales.map((locale) => (
    <li key={locale}>
      <DropdownItem
        href={localeHref(locale, pagePath)}
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
