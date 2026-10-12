import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContactDetails from '@/components/contact/ContactDetails';
import ContactForms from '@/components/contact/ContactForms';
import ContactHero from '@/components/contact/ContactHero';
import { hasLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { contactPath, localeHref } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[lang]/contact'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { contact } = await getDictionary(lang);

  return {
    title: contact.meta.title,
    description: contact.meta.description,
    alternates: {
      canonical: localeHref(lang, contactPath),
      languages: Object.fromEntries(locales.map((locale) => [locale, localeHref(locale, contactPath)])),
    },
    openGraph: {
      title: contact.meta.title,
      description: contact.meta.description,
      locale: lang,
      type: 'website',
    },
  };
}

export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.contact;

  return (
    <>
      <ContactHero title={t.title} description={t.description} />
      <div className="page-container">
        <div className="mx-auto grid max-w-content gap-16 border-t border-line pt-12 pb-24 md:pt-16 md:pb-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <ContactDetails t={t} socialLabels={dict.footer.social} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForms lang={lang} t={t} />
          </div>
        </div>
      </div>
    </>
  );
}
