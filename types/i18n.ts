import type en from '@/i18n/dictionaries/en';

/** Shape every language file must match. `en.ts` is the source of truth. */
export type Dictionary = typeof en;

export type { Locale } from '@/i18n/config';
