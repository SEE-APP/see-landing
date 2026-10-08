import Image from 'next/image';
import Link from 'next/link';
import Typography from '@/components/ui/Typography';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { homeHref, navLinks } from '@/lib/site';
import type { NavbarProps } from '@/types/layout';

export default function Navbar({ lang, brand, t }: NavbarProps) {
  return (
    <header className="sticky top-0 z-[100] select-none border-b border-white/8 bg-dark-500/95 backdrop-blur-lg">
      <nav
        aria-label={t.ariaLabel}
        className="page-container flex flex-wrap items-center justify-between gap-3 py-(--gutter-y)"
      >
        <Link
          href={homeHref(lang)}
          aria-label={t.home}
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300"
        >
          <Image src="/logo.png" alt="" width={40} height={40} priority className="size-10 shrink-0 object-contain" />
          <Typography size={20} weight="bold" tone="default" className="tracking-tight">{brand}</Typography>
        </Link>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-6">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={homeHref(lang, link.hash)}
                  className="rounded-sm text-sm text-slate-400 transition-colors duration-200 hover:text-primary-300 focus-visible:text-primary-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-300"
                >
                  {t.links[link.id]}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher current={lang} label={t.languageSwitcher} />
        </div>
      </nav>
    </header>
  );
}
