import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import BrandLink from '@/components/common/BrandLink';
import LanguageList from '@/components/common/LanguageList';
import Button from '@/components/ui/Button';
import PopoverPanel from '@/components/ui/PopoverPanel';
import { ctaHash, homeHref, navLinks } from '@/lib/site';
import type { MobileNavProps } from '@/types/layout';

const PANEL_ID = 'nav-mobile';

const iconButtonClasses =
  '-mr-2 inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-ink ' +
  'transition-colors duration-200 hover:text-accent ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export default function MobileNav({ lang, brand, t }: MobileNavProps) {
  return (
    <div className="ml-auto flex lg:hidden">
      <button type="button" popoverTarget={PANEL_ID} aria-label={t.openMenu} className={iconButtonClasses}>
        <Menu size={22} aria-hidden="true" />
      </button>

      <PopoverPanel id={PANEL_ID} className="mobile-nav-panel bg-canvas text-ink">
        <div className="page-container flex min-h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <BrandLink lang={lang} brand={brand} label={t.home} />
            <button
              type="button"
              popoverTarget={PANEL_ID}
              popoverTargetAction="hide"
              aria-label={t.closeMenu}
              className={iconButtonClasses}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={homeHref(lang, link.hash)}
                  className="flex min-h-12 items-center rounded-sm text-32 font-semibold tracking-[-0.02em] text-ink transition-colors duration-150 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t.links[link.id]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-6 pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <LanguageList current={lang} label={t.languageSwitcher} />
            <Button variant="filled" shape="rounded" href={homeHref(lang, ctaHash)} label={t.cta} fullWidth />
          </div>
        </div>
      </PopoverPanel>
    </div>
  );
}
