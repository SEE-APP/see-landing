import EditorialHeading from '@/components/ui/EditorialHeading';
import type { FindYourCircleProps } from '@/types/sections';
import CircleSteps from './CircleSteps';

export default function FindYourCircle({ t }: FindYourCircleProps) {
  return (
    <section id="how-it-works" aria-labelledby="find-your-circle-title" className="pt-24 pb-28 md:pt-32 md:pb-36">
      <div className="page-container">
        <div className="mx-auto max-w-[1100px]">
          <EditorialHeading id="find-your-circle-title" title={t.title} paragraphs={[t.description]} />
          <CircleSteps items={t.steps} />
        </div>
      </div>
    </section>
  );
}
