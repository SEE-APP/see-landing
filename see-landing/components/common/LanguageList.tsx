import { ChevronDown } from 'lucide-react';
import { localeNames, locales } from '@/i18n/config';
import type { LanguageSwitcherProps } from '@/types/layout';
import LanguageOptions from './LanguageOptions';

/** Collapsible row for the mobile menu: the current language, expanding to the full list. */
export default function LanguageList({ current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  return (
    <details className="group/lang border-t border-line">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-16 text-ink focus-ring [&::-webkit-details-marker]:hidden">
        {label}
        <span className="flex items-center gap-2 text-ink-muted">
          <span lang={current}>{localeNames[current]}</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 ease-out-expo group-open/lang:rotate-180 motion-reduce:transition-none"
          />
        </span>
      </summary>
      <ul aria-label={label} className="flex flex-col gap-1 pb-2">
        <LanguageOptions current={current} itemClassName="min-h-11" />
      </ul>
    </details>
  );
}
