import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Story from '@/components/landing/Story';
import Intention from '@/components/landing/Intention';
import FindYourCircle from '@/components/landing/FindYourCircle';
import WhyUs from '@/components/landing/WhyUs';
import Team from '@/components/Team';
import Demo from '@/components/Demo';
import Waitlist from '@/components/Waitlist';
import { hasLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { demoVideoUrl, homeHref } from '@/lib/site';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} t={dict.hero} />
      <Story t={dict.story} />
      <Intention t={dict.intention} />
      <FindYourCircle t={dict.findYourCircle} />
      <WhyUs t={dict.whyUs} />
      <Team t={dict.team} />
      <Demo t={dict.demo} videoSrc={demoVideoUrl} waitlistHref={homeHref(lang, '#waitlist')} />
      <Waitlist t={dict.waitlist} />
    </>
  );
}
