import LandingSection from '@/components/ui/LandingSection';
import type { StoryProps } from '@/types/sections';
import StoryTimeline from './StoryTimeline';

export default function Story({ t }: StoryProps) {
  return (
    <LandingSection id="about" titleId="story-title" title={t.title} paragraphs={t.paragraphs}>
      <StoryTimeline items={t.timeline} />
    </LandingSection>
  );
}
