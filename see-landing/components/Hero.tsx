import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { ctaHash, homeHref, howItWorksHash } from '@/lib/site';
import phoneImage from '@/public/hero/phone-space-ready.webp';
import type { HeroProps } from '@/types/sections';

export default function Hero({ lang, t }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="page-container grid items-center gap-10 pt-10 pb-12 md:pt-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div className="flex flex-col items-start">
          <Typography
            as="p"
            size={12}
            weight="medium"
            tone="subtle"
            className="mb-5 inline-flex h-7 items-center rounded-lg border border-line-strong px-2.5"
          >
            {t.badge}
          </Typography>

          <Typography
            as="h1"
            id="hero-title"
            size={36}
            weight="extrabold"
            tone="default"
            className="text-balance md:text-48"
          >
            {t.title}
          </Typography>

          <Typography as="p" size={16} tone="muted" className="mt-4 max-w-[30rem] text-pretty">
            {t.description}
          </Typography>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              variant="filled"
              size="sm"
              shape="rounded"
              href={homeHref(lang, ctaHash)}
              label={t.primaryCta}
              className="group/cta"
              rightIcon={
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 ease-out-expo motion-safe:group-hover/cta:translate-x-0.5"
                />
              }
            />
            <Button variant="outline" size="sm" shape="rounded" href={homeHref(lang, howItWorksHash)} label={t.secondaryCta} />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-[30rem]">
          <div
            aria-hidden="true"
            className="bg-hatch absolute top-1/2 left-1/2 -z-10 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-stripe [mask-image:radial-gradient(closest-side,black_70%,transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)]"
          />
          <Image
            src={phoneImage}
            alt={t.imageAlt}
            priority
            sizes="(min-width: 1024px) 30rem, 26rem"
            className="h-auto w-full drop-shadow-[0_24px_32px_var(--shadow-tint)]"
          />
        </div>
      </div>
    </section>
  );
}
