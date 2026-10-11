import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { Mail } from 'lucide-react';
import InstagramIcon from '@/assets/icons/InstagramIcon';
import LinkedInIcon from '@/assets/icons/LinkedInIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import TikTokIcon from '@/assets/icons/TikTokIcon';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { format } from '@/i18n/format';
import { contactDetails, footerLinks, homeHref, socialLinks } from '@/lib/site';
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

function ColumnTitle({ label }: { label: string }) {
  return (
    <Typography as="h2" size={12} weight="semibold" tone="default" className="mb-3 font-mono uppercase tracking-[0.12em]">
      {label}
    </Typography>
  );
}

export default function Footer({ lang, brand, nav, t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 select-none bg-footer">
      <div className="mx-auto w-full max-w-(--container-page) border-t border-line px-4 pt-10 pb-6 md:px-6 md:pt-12">
        <div className="grid grid-cols-1 gap-8 border-b border-line pb-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={homeHref(lang)} className="mb-3 flex w-fit items-center gap-2.5 rounded-md focus-ring">
              <Image src="/logo.png" alt="" width={40} height={40} className="size-10 shrink-0 object-contain" />
              <Typography size={18} weight="semibold" tone="default" className="tracking-tight">{brand}</Typography>
            </Link>
            <Typography as="p" size={14} tone="muted" className="max-w-xs leading-relaxed">
              {t.tagline}
            </Typography>
          </div>

          <div>
            <ColumnTitle label={t.quickLinks} />
            <nav aria-label={t.navLabel}>
              <ul className="flex flex-col items-start gap-2">
                {footerLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={homeHref(lang, link.hash)}
                      className="inline-block rounded-sm text-14 text-ink-muted transition duration-200 hover:translate-x-1 hover:text-accent motion-reduce:hover:translate-x-0 focus-ring"
                    >
                      {nav[link.id]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div id="contact">
            <ColumnTitle label={t.contact} />
            <ul className="flex flex-col gap-2">
              {contactDetails.map(({ id, label, href }) => {
                const Icon = contactIcons[id];
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className="flex w-fit items-center gap-2.5 rounded-sm text-14 text-ink-muted transition-colors duration-200 hover:text-accent focus-ring"
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

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <Typography as="p" size={14} tone="muted">
            {format(t.copyright, { year: String(currentYear), brand })}
          </Typography>

          <div className="flex flex-wrap items-center gap-4">
            <ThemeSwitcher t={t.theme} />
            <ul className="flex items-center gap-2">
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
      </div>
    </footer>
  );
}
