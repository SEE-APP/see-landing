import type { Locale } from '@/i18n/config';
import type { ContactDetail, NavLink, SocialLink } from '@/types/site';

export const findYourCircleHash = '#find-your-circle';

export const contactPath = '/contact';

export const navLinks: NavLink[] = [
  { id: 'about', hash: '#about' },
  { id: 'findYourCircle', hash: findYourCircleHash },
  { id: 'team', hash: '#team' },
  { id: 'contact', path: contactPath },
];

export const footerLinks: NavLink[] = [
  { id: 'about', hash: '#about' },
  { id: 'findYourCircle', hash: findYourCircleHash },
  { id: 'team', hash: '#team' },
  { id: 'contact', path: contactPath },
];

/** The two forms on the contact page; the hash picks the tab. */
export const contactPageLinks: NavLink[] = [
  { id: 'message', path: contactPath, hash: '#message' },
  { id: 'meeting', path: contactPath, hash: '#meeting' },
];

export const ctaHash = '#waitlist';

export const contactDetails: ContactDetail[] = [
  { id: 'email', label: 'contact@seevrce.ge', href: 'mailto:contact@seevrce.ge' },
  { id: 'phone', label: '+995 591 16 44 16', href: 'tel:+995591164416' },
];

export const socialLinks: SocialLink[] = [
  { id: 'instagram', href: 'https://instagram.com/seevrce' },
  { id: 'linkedin', href: 'https://linkedin.com/company/seevrce' },
  { id: 'tiktok', href: 'https://tiktok.com/@seevrce' },
];

export function localeHref(locale: Locale, path = '', hash = ''): string {
  return `/${locale}${path}${hash}`;
}

export function homeHref(locale: Locale, hash = ''): string {
  return localeHref(locale, '', hash);
}

/** A nav link goes to its own page when it has a `path`, otherwise to a section of the home page. */
export function navHref(locale: Locale, link: NavLink): string {
  return localeHref(locale, link.path, link.hash);
}
