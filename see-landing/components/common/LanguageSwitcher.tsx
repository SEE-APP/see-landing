import Dropdown from '@/components/ui/Dropdown';
import { localeNames, locales } from '@/i18n/config';
import type { LanguageSwitcherProps } from '@/types/layout';
import LanguageOptions from './LanguageOptions';

/** Header dropdown: the current language's own name. */
export default function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  if (locales.length < 2) return null;

  return (
    <Dropdown
      id="nav-lang"
      label={
        <>
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
