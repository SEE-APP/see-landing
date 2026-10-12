import NumberedList from '@/components/ui/NumberedList';
import { steps } from '@/lib/content/about';
import type { CircleStepsProps } from '@/types/sections';

export default function CircleSteps({ items }: CircleStepsProps) {
  return (
    <NumberedList
      accentMarkers
      items={steps.map(({ id, number }) => ({
        id,
        marker: number,
        title: items[id].title,
        description: items[id].desc,
      }))}
    />
  );
}
