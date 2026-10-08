import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { LanguageList } from '@/components/common/LanguageSwitcher';
import Button from '@/components/ui/Button';
import PopoverPanel from '@/components/ui/PopoverPanel';
import Typography from '@/components/ui/Typography';
import { ctaHash, homeHref, moreNavLinks, primaryNavLinks } from '@/lib/site';
import type { MobileNavProps } from '@/types/layout';

const PANEL_ID = 'nav-mobile';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300';

const iconButtonClasses =
  'inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 text-slate-200 ' +
  'transition-colors duration-200 hover:border-primary-300/40 hover:text-primary-300 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300';

const links = [...primaryNavLinks, ...moreNavLinks];

export default function MobileNav({ lang, brand, t }: MobileNavProps) {
  return (
    <div className="flex justify-self-end lg:hidden">
      <button type="button" popoverTarget={PANEL_ID} aria-label={t.openMenu} className={iconButtonClasses}>
        <Menu size={18} aria-hidden="true" />
      </button>

      <PopoverPanel id={PANEL_ID} className="mobile-nav-panel bg-dark-500 text-slate-50">
        <div className="flex min-h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between gap-x-6 border-b border-white/8 px-4 md:px-6">
            <Link href={homeHref(lang)} aria-label={t.home} className={`flex w-fit items-center gap-2.5 rounded-md ${focusRing}`}>
              <Image src="/logo.png" alt="" width={40} height={40} className="size-10 shrink-0 object-contain" />
              <Typography size={20} weight="bold" tone="default" className="tracking-tight">{brand}</Typography>
            </Link>
            <button
              type="button"
              popoverTarget={PANEL_ID}
              popoverTargetAction="hide"
              aria-label={t.closeMenu}
              className={iconButtonClasses}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col gap-6 px-4 pt-4 md:px-6">
            <ul className="flex flex-col divide-y divide-white/8">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={homeHref(lang, link.hash)}
                    className="flex min-h-11 items-center py-2 text-16 text-slate-200 transition-colors duration-150 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-300"
                  >
                    {t.links[link.id]}
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="border-white/8" />

            <LanguageList current={lang} label={t.languageSwitcher} />
          </div>

          <div className="mt-auto px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
            <Button
              variant="filled"
              href={homeHref(lang, ctaHash)}
              label={t.cta}
              rightIcon={<ArrowRight size={16} />}
              fullWidth
            />
          </div>
        </div>
      </PopoverPanel>
    </div>
  );
}
