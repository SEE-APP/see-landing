import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import MobileNav from '@/components/common/MobileNav';
import Button from '@/components/ui/Button';
import Dropdown, { DropdownItem } from '@/components/ui/Dropdown';
import Typography from '@/components/ui/Typography';
import { ctaHash, homeHref, moreNavLinks, primaryNavLinks } from '@/lib/site';
import type { NavbarProps } from '@/types/layout';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300';

export default function Navbar({ lang, brand, t }: NavbarProps) {
  return (
    <header className="sticky top-0 z-[100] select-none border-b border-white/8 bg-dark-500/95 backdrop-blur-lg">
      <nav
        aria-label={t.ariaLabel}
        className="mx-auto grid h-16 w-full max-w-(--container-page) grid-cols-[1fr_auto] items-center gap-x-6 px-4 md:px-6 lg:grid-cols-[1fr_auto_1fr]"
      >
        <Link href={homeHref(lang)} aria-label={t.home} className={`flex w-fit items-center gap-2.5 rounded-md ${focusRing}`}>
          <Image src="/logo.png" alt="" width={40} height={40} priority className="size-10 shrink-0 object-contain" />
          <Typography size={20} weight="bold" tone="default" className="tracking-tight">{brand}</Typography>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {primaryNavLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={homeHref(lang, link.hash)}
                className={`rounded-sm text-14 text-slate-400 transition-colors duration-200 hover:text-primary-300 focus-visible:text-primary-300 ${focusRing}`}
              >
                {t.links[link.id]}
              </Link>
            </li>
          ))}
          <li>
            <Dropdown id="nav-more" label={t.more}>
              <ul>
                {moreNavLinks.map((link) => (
                  <li key={link.id}>
                    <DropdownItem href={homeHref(lang, link.hash)}>{t.links[link.id]}</DropdownItem>
                  </li>
                ))}
              </ul>
            </Dropdown>
          </li>
        </ul>

        <div className="hidden items-center gap-3 justify-self-end lg:flex">
          <LanguageSwitcher current={lang} label={t.languageSwitcher} />
          <Button
            variant="filled"
            size="sm"
            href={homeHref(lang, ctaHash)}
            label={t.cta}
            className="group/cta"
            rightIcon={
              <ArrowRight
                size={16}
                className="transition-transform duration-200 ease-out-expo motion-safe:group-hover/cta:translate-x-0.5"
              />
            }
          />
        </div>

        <MobileNav lang={lang} brand={brand} t={t} />
      </nav>
    </header>
  );
}
