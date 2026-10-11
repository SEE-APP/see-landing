import BrandLink from '@/components/common/BrandLink';
import FooterColumn from '@/components/common/FooterColumn';
import FooterContacts from '@/components/common/FooterContacts';
import FooterNav from '@/components/common/FooterNav';
import LanguageToggle from '@/components/common/LanguageToggle';
import SocialLinks from '@/components/common/SocialLinks';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import Typography from '@/components/ui/Typography';
import { format } from '@/i18n/format';
import type { FooterProps } from '@/types/layout';

export default function Footer({ lang, brand, nav, t }: FooterProps) {
  const year = String(new Date().getFullYear());

  return (
    <footer className="relative z-10 border-t border-line bg-footer">
      <div className="page-container">
        <div className="mx-auto max-w-content pt-16 pb-10 md:pt-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <BrandLink lang={lang} brand={brand} label={nav.home} />
              <Typography as="p" size={16} tone="muted" className="mt-5 max-w-[36ch] text-pretty leading-[1.7]">
                {t.tagline}
              </Typography>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <FooterColumn title={t.explore}>
                <FooterNav lang={lang} labels={nav.links} ariaLabel={t.navLabel} />
              </FooterColumn>
            </div>

            <div className="md:col-span-3">
              <FooterColumn id="contact" title={t.contact}>
                <FooterContacts />
              </FooterColumn>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <Typography as="p" size={14} tone="muted">
              {format(t.copyright, { year, brand })}
            </Typography>
            <div className="flex flex-wrap items-center gap-4">
              <LanguageToggle current={lang} label={nav.languageSwitcher} />
              <ThemeSwitcher t={t.theme} />
              <SocialLinks labels={t.social} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
