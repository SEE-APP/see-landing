import Link from 'next/link';
import AutoHideHeader from '@/components/common/AutoHideHeader';
import BrandLink from '@/components/common/BrandLink';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import MobileNav from '@/components/common/MobileNav';
import Button from '@/components/ui/Button';
import { ctaHash, homeHref, navLinks } from '@/lib/site';
import type { NavbarProps } from '@/types/layout';

export default function Navbar({ lang, brand, t }: NavbarProps) {
  return (
    <AutoHideHeader>
      <nav aria-label={t.ariaLabel} className="page-container">
        <div className="mx-auto flex h-16 max-w-content items-center gap-10">
          <BrandLink lang={lang} brand={brand} label={t.home} />

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={homeHref(lang, link.hash)}
                  className="rounded-sm text-14 text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:text-ink focus-ring"
                >
                  {t.links[link.id]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <LanguageSwitcher current={lang} label={t.languageSwitcher} />
            <Button variant="filled" size="sm" shape="rounded" href={homeHref(lang, ctaHash)} label={t.cta} />
          </div>

          <MobileNav lang={lang} brand={brand} t={t} />
        </div>
      </nav>
    </AutoHideHeader>
  );
}
