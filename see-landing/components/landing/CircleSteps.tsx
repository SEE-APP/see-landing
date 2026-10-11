import Typography from '@/components/ui/Typography';
import { steps } from '@/lib/content/about';
import type { CircleStepsProps } from '@/types/sections';

export default function CircleSteps({ items }: CircleStepsProps) {
  return (
    <ol className="mt-16 grid border-l border-line md:mt-24 md:grid-cols-3 md:border-t md:border-l-0">
      {steps.map((step) => (
        <li key={step.id} className="pb-10 pl-6 last:pb-0 md:pt-8 md:pr-8 md:pb-0 md:pl-0">
          <Typography as="p" size={32} weight="semibold" tone="accent" className="tabular-nums md:text-40">
            {step.number}
          </Typography>
          <Typography as="h3" size={20} weight="semibold" tone="default" className="mt-3">
            {items[step.id].title}
          </Typography>
          <Typography as="p" size={16} tone="muted" className="mt-2 max-w-[34ch] text-pretty leading-[1.7]">
            {items[step.id].desc}
          </Typography>
        </li>
      ))}
    </ol>
  );
}
