import Typography from '@/components/ui/Typography';
import { timeline } from '@/lib/content/about';
import type { StoryTimelineProps } from '@/types/sections';

export default function StoryTimeline({ items }: StoryTimelineProps) {
  const currentIndex = timeline.length - 1;

  return (
    <ol className="mt-16 grid border-l border-line md:mt-24 md:grid-cols-3 md:border-t md:border-l-0">
      {timeline.map((event, i) => {
        const isCurrent = i === currentIndex;
        return (
          <li key={event.id} className="relative pb-10 pl-6 last:pb-0 md:pt-8 md:pr-8 md:pb-0 md:pl-0">
            {isCurrent && (
              <span
                aria-hidden="true"
                className="absolute top-0 -left-px h-full w-0.5 bg-accent md:-top-px md:left-0 md:h-0.5 md:w-full"
              />
            )}
            <Typography
              as="p"
              size={32}
              weight="semibold"
              tone={isCurrent ? 'accent' : 'default'}
              className="tabular-nums md:text-40"
            >
              {event.year}
            </Typography>
            <Typography as="h3" size={16} weight="semibold" tone="default" className="mt-3">
              {items[event.id].title}
            </Typography>
            <Typography as="p" size={14} tone={isCurrent ? 'subtle' : 'muted'} className="mt-1 max-w-[34ch]">
              {items[event.id].desc}
            </Typography>
          </li>
        );
      })}
    </ol>
  );
}
