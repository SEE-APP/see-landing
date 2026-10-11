import LandingSection from '@/components/ui/LandingSection';
import type { FindYourCircleProps } from '@/types/sections';
import CircleSteps from './CircleSteps';

export default function FindYourCircle({ t }: FindYourCircleProps) {
  return (
    <LandingSection id="how-it-works" titleId="find-your-circle-title" title={t.title} paragraphs={[t.description]}>
      <CircleSteps items={t.steps} />
    </LandingSection>
  );
}
