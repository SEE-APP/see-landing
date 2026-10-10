import Typography from '@/components/ui/Typography';
import type { StoryProps } from '@/types/sections';
import StoryTimeline from './StoryTimeline';

export default function Story({ t }: StoryProps) {
  return (
    <section id="about" aria-labelledby="story-title" className="pt-24 pb-28 md:pt-32 md:pb-36">
      <div className="page-container">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <Typography
              as="h2"
              id="story-title"
              size={40}
              weight="semibold"
              tone="default"
              className="text-balance tracking-[-0.02em] md:col-span-5 md:text-64"
            >
              {t.title}
            </Typography>

            <div className="flex flex-col gap-6 md:col-span-7 md:pt-3">
              {t.paragraphs.map((paragraph) => (
                <Typography
                  key={paragraph}
                  as="p"
                  size={18}
                  tone="muted"
                  className="max-w-[62ch] text-pretty leading-[1.7]"
                >
                  {paragraph}
                </Typography>
              ))}
            </div>
          </div>

          <StoryTimeline items={t.timeline} />
        </div>
      </div>
    </section>
  );
}
