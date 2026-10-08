import type { ContactDetail, NavLink, SocialLink } from '@/types/site';

export const navLinks: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Team', href: '/#team' },
  { label: 'Demo', href: '/#demo' },
  { label: 'Early Access', href: '/#waitlist' },
];

export const contactDetails: ContactDetail[] = [
  { id: 'email', label: 'contact@seevrce.ge', href: 'mailto:contact@seevrce.ge' },
  { id: 'phone', label: '+995 591 16 44 16', href: 'tel:+995591164416' },
];

export const socialLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/seevrce' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/seevrce' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@seevrce' },
];
