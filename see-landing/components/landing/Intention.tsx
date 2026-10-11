import EditorialHeading from '@/components/ui/EditorialHeading';
import type { IntentionProps } from '@/types/sections';
import IntentionCards from './IntentionCards';

export default function Intention({ t }: IntentionProps) {
  return (
    <section id="intention" aria-labelledby="intention-title" className="pt-24 pb-28 md:pt-32 md:pb-36">
      <div className="page-container">
        <div className="mx-auto max-w-[1100px]">
          <EditorialHeading id="intention-title" title={t.title} paragraphs={[t.description]} />
          <IntentionCards items={t.items} />
        </div>
      </div>
    </section>
  );
}
