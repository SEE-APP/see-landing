import LandingSection from '@/components/ui/LandingSection';
import type { IntentionProps } from '@/types/sections';
import IntentionCards from './IntentionCards';

export default function Intention({ t }: IntentionProps) {
  return (
    <LandingSection id="intention" titleId="intention-title" title={t.title} paragraphs={[t.description]}>
      <IntentionCards items={t.items} />
    </LandingSection>
  );
}
