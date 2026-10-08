import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Team from '@/components/Team';
import Demo from '@/components/Demo';
import Waitlist from '@/components/Waitlist';
import { hasLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero t={dict.hero} />
      <About
        story={dict.story}
        intention={dict.intention}
        howItWorks={dict.howItWorks}
        whyUs={dict.whyUs}
      />
      <Team t={dict.team} />
      <Demo t={dict.demo} waitlistHref={`/${lang}#waitlist`} />
      <Waitlist t={dict.waitlist} />
    </>
  );
}
