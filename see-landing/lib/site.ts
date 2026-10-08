import type { Locale } from '@/i18n/config';
import type { ContactDetail, NavLink, SocialLink } from '@/types/site';

export const primaryNavLinks: NavLink[] = [
  { id: 'howItWorks', hash: '#how-it-works' },
  { id: 'about', hash: '#about' },
  { id: 'news', hash: '#news' },
];

export const moreNavLinks: NavLink[] = [
  { id: 'team', hash: '#team' },
  { id: 'investors', hash: '#investors' },
  { id: 'faq', hash: '#faq' },
  { id: 'contact', hash: '#contact' },
];

export const footerLinks: NavLink[] = [
  { id: 'howItWorks', hash: '#how-it-works' },
  { id: 'about', hash: '#about' },
  { id: 'news', hash: '#news' },
  { id: 'investors', hash: '#investors' },
  { id: 'faq', hash: '#faq' },
  { id: 'contact', hash: '#contact' },
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

export const waitlistEndpoint = 'https://formspree.io/f/xnjewqre';

export const demoVideoUrl = 'https://www.youtube.com/embed/n0v4iKcuBoQ';

export function homeHref(locale: Locale, hash = ''): string {
  return `/${locale}${hash}`;
}
