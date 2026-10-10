import { locales } from '@/i18n/config';
import type { LanguageSwitcherProps } from '@/types/layout';
import LanguageOptions from './LanguageOptions';

/** Inline list for the mobile menu (no nested popover). */
export default function LanguageList({ current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-1">
      <LanguageOptions current={current} itemClassName="min-h-11" />
    </ul>
  );
}
