import SectionHeading from '@/components/ui/SectionHeading';
import Typography from '@/components/ui/Typography';
import { steps } from '@/lib/content/about';
import type { HowItWorksProps } from '@/types/sections';

export default function HowItWorks({ t }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="border-t border-(--section-rule) py-24 select-none"
    >
      <div className="page-container">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading id="how-it-works-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />

          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
            {steps.map((s) => (
              <li
                key={s.id}
                className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-(--card-shadow) transition-transform duration-300 ease-out-expo motion-safe:hover:-translate-y-1.5"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-5 font-mono text-[3.25rem] leading-none font-bold text-accent/12"
                >
                  {s.number}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mb-5 flex size-12 items-center justify-center rounded-xl border border-(--accent-deep)/20 bg-(--accent-deep)/10 text-accent"
                >
                  <s.icon size={22} />
                </span>
                <Typography as="h3" size={18} weight="semibold" tone="default" className="relative mb-2">
                  {t.steps[s.id].title}
                </Typography>
                <Typography as="p" size={14} tone="muted" className="relative">
                  {t.steps[s.id].desc}
                </Typography>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
