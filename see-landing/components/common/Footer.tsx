import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { Mail } from 'lucide-react';
import InstagramIcon from '@/assets/icons/InstagramIcon';
import LinkedInIcon from '@/assets/icons/LinkedInIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import TikTokIcon from '@/assets/icons/TikTokIcon';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { contactDetails, homeHref, navLinks, socialLinks } from '@/lib/site';
import type { FooterProps } from '@/types/layout';
import type { ContactId, SocialId } from '@/types/site';
import type { IconProps } from '@/types/ui';

const contactIcons: Record<ContactId, ComponentType<IconProps>> = {
  email: Mail,
  phone: PhoneIcon,
};

const socialIcons: Record<SocialId, ComponentType<IconProps>> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
};

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300';

function ColumnTitle({ label }: { label: string }) {
  return (
    <Typography as="h2" size={12} weight="semibold" tone="default" className="mb-5 font-mono uppercase tracking-[0.12em]">
      {label}
    </Typography>
  );
}

export default function Footer({ lang, nav, t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 select-none border-t border-white/8 bg-dark-700">
      <div className="page-container py-(--gutter-y)">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-12 border-b border-white/6 pb-12">
          <div className="max-w-xs">
            <Link href={homeHref(lang)} className={`mb-5 flex w-fit items-center gap-2.5 rounded-md ${focusRing}`}>
              <Image src="/logo.png" alt="" width={40} height={40} className="size-10 shrink-0 object-contain" />
              <Typography size={18} weight="semibold" tone="default" className="tracking-tight">SEE</Typography>
            </Link>
            <Typography as="p" size={16} tone="muted" className="leading-relaxed">
              {t.tagline}
            </Typography>
          </div>

          <div>
            <ColumnTitle label={t.quickLinks} />
            <nav aria-label={t.navLabel}>
              <ul className="flex flex-col items-start gap-3.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={homeHref(lang, link.hash)}
                      className={`inline-block rounded-sm text-[0.9375rem] text-slate-400 transition duration-200 hover:translate-x-1 hover:text-primary-300 motion-reduce:hover:translate-x-0 ${focusRing}`}
                    >
                      {nav[link.id]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <ColumnTitle label={t.contact} />
            <ul className="flex flex-col gap-3.5">
              {contactDetails.map(({ id, label, href }) => {
                const Icon = contactIcons[id];
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className={`flex w-fit items-center gap-2.5 rounded-sm text-[0.9375rem] text-slate-400 transition-colors duration-200 hover:text-primary-300 ${focusRing}`}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 pt-8">
          <Typography as="p" size={14} tone="muted">&copy; {currentYear} SEE. {t.rights}</Typography>

          <ul className="flex items-center gap-3">
            {socialLinks.map(({ id, href }) => {
              const Icon = socialIcons[id];
              return (
                <li key={href}>
                  <Button
                    variant="icon"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.social[id]}
                    leftIcon={<Icon size={17} />}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
