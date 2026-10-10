import SectionHeading from '@/components/ui/SectionHeading';
import type { IntentionProps } from '@/types/sections';
import IntentionCards from './IntentionCards';

export default function Intention({ t }: IntentionProps) {
  return (
    <section
      id="intention"
      aria-labelledby="intention-title"
      className="border-t border-(--section-rule) py-24 select-none"
    >
      <div className="page-container">
        <div className="mx-auto max-w-[900px]">
          <SectionHeading id="intention-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />
          <IntentionCards items={t.items} />
        </div>
      </div>
    </section>
  );
}
