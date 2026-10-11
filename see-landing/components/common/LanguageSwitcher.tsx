import { ChevronDown, Globe } from 'lucide-react';
import LanguageOptions from '@/components/common/LanguageOptions';
import Dropdown from '@/components/ui/Dropdown';
import { localeNames, locales } from '@/i18n/config';
import type { LanguageSwitcherProps } from '@/types/layout';

/**
 * Language picker in three places: a dropdown in the header, an upward dropdown with a globe
 * in the footer, and a collapsible row in the mobile menu.
 */
export default function LanguageSwitcher({ variant, current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  if (variant === 'menu') {
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

  const isFooter = variant === 'footer';

  return (
    <Dropdown
      id={isFooter ? 'footer-lang' : 'nav-lang'}
      placement={isFooter ? 'top' : 'bottom'}
      label={
        <>
          {isFooter && <Globe size={16} aria-hidden="true" className="mr-1" />}
          <span className="sr-only">{label}: </span>
          <span lang={current}>{localeNames[current]}</span>
        </>
      }
    >
      <ul aria-label={label}>
        <LanguageOptions current={current} />
      </ul>
    </Dropdown>
  );
}
