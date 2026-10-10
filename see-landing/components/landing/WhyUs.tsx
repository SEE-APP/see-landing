import SectionHeading from '@/components/ui/SectionHeading';
import Typography from '@/components/ui/Typography';
import { features } from '@/lib/content/about';
import type { WhyUsProps } from '@/types/sections';

export default function WhyUs({ t }: WhyUsProps) {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="border-t border-(--section-rule) py-24 select-none"
    >
      <div className="page-container">
        <div className="mx-auto max-w-[900px]">
          <SectionHeading id="why-us-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-6">
            {features.map((f) => (
              <div
                key={f.id}
                className="rounded-3xl border border-line bg-surface p-8 shadow-(--card-shadow) transition-transform duration-300 ease-out-expo motion-safe:hover:-translate-y-1.5"
              >
                <span
                  aria-hidden="true"
                  className="mb-5 flex size-12 items-center justify-center rounded-xl border border-(--accent-deep)/20 bg-(--accent-deep)/10 text-accent"
                >
                  <f.icon size={22} />
                </span>
                <Typography as="h3" size={18} weight="semibold" tone="default" className="mb-2">
                  {t.items[f.id].title}
                </Typography>
                <Typography as="p" size={14} tone="muted">
                  {t.items[f.id].desc}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
