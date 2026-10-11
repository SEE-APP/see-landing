import NumberedList from '@/components/ui/NumberedList';
import { timeline } from '@/lib/content/about';
import type { StoryTimelineProps } from '@/types/sections';

export default function StoryTimeline({ items }: StoryTimelineProps) {
  const currentIndex = timeline.length - 1;

  return (
    <NumberedList
      size="sm"
      items={timeline.map(({ id, year }, index) => ({
        id,
        marker: year,
        title: items[id].title,
        description: items[id].desc,
        isCurrent: index === currentIndex,
      }))}
    />
  );
}
