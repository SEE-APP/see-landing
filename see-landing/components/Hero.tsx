import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { ctaHash, homeHref, howItWorksHash } from '@/lib/site';
import phoneImage from '@/public/hero/phone-space-ready.webp';
import type { HeroProps } from '@/types/sections';

export default function Hero({ lang, t }: HeroProps) {
  return (
    <section aria-labelledby="hero-title">
      <div className="page-container">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-start lg:col-span-7">
            <Typography
              as="h1"
              id="hero-title"
              size={40}
              weight="semibold"
              tone="default"
              className="text-balance tracking-[-0.02em] md:text-64"
            >
              {t.title}
            </Typography>

            <Typography as="p" size={18} tone="muted" className="mt-6 max-w-[46ch] text-pretty leading-[1.7]">
              {t.description}
            </Typography>

            <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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

          <div className="mx-auto w-full max-w-[24rem] lg:col-span-5 lg:max-w-none">
            <Image
              src={phoneImage}
              alt={t.imageAlt}
              priority
              sizes="(min-width: 1024px) 26rem, 24rem"
              className="h-auto w-full drop-shadow-[0_24px_32px_var(--shadow-tint)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
