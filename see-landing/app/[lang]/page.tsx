import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Story from '@/components/landing/Story';
import FindYourCircle from '@/components/landing/FindYourCircle';
import Intention from '@/components/landing/Intention';
import Team from '@/components/landing/Team';
import Waitlist from '@/components/Waitlist';
import { hasLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} t={dict.hero} />
      <Story t={dict.story} />
      <FindYourCircle t={dict.findYourCircle} />
      <Intention t={dict.intention} />
      <Team t={dict.team} />
      <Waitlist t={dict.waitlist} />
    </>
  );
}
