import EditorialHeading from '@/components/ui/EditorialHeading';
import type { StoryProps } from '@/types/sections';
import StoryTimeline from './StoryTimeline';

export default function Story({ t }: StoryProps) {
  return (
    <section id="about" aria-labelledby="story-title" className="pt-24 pb-28 md:pt-32 md:pb-36">
      <div className="page-container">
        <div className="mx-auto max-w-[1100px]">
          <EditorialHeading id="story-title" title={t.title} paragraphs={t.paragraphs} />
          <StoryTimeline items={t.timeline} />
        </div>
      </div>
    </section>
  );
}
