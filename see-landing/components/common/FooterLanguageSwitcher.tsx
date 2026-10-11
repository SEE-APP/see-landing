import { Globe } from 'lucide-react';
import Dropdown from '@/components/ui/Dropdown';
import { localeNames, locales } from '@/i18n/config';
import type { LanguageSwitcherProps } from '@/types/layout';
import LanguageOptions from './LanguageOptions';

/** Footer dropdown that opens upward: globe icon and the current language's own name. */
export default function FooterLanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  return (
    <Dropdown
      id="footer-lang"
      placement="top"
      label={
        <>
          <Globe size={16} aria-hidden="true" className="mr-1" />
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
