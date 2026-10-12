import type { Dictionary } from './i18n';

export type NavLinkId = keyof Dictionary['nav']['links'];

/** Label comes from `nav.links[id]`. `hash` is a section anchor on the home page; `path` is a page of its own. */
export interface NavLink {
  id: NavLinkId;
  hash?: string;
  path?: string;
}

export type ContactId = 'email' | 'phone';

export interface ContactDetail {
  id: ContactId;
  /** Shown as-is in every language. */
  label: string;
  href: string;
}

export type SocialId = keyof Dictionary['footer']['social'];

export interface SocialLink {
  id: SocialId;
  href: string;
}
