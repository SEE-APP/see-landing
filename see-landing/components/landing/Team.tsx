import LandingSection from '@/components/ui/LandingSection';
import type { TeamProps } from '@/types/sections';
import TeamMembers from './TeamMembers';

export default function Team({ t }: TeamProps) {
  return (
    <LandingSection id="team" titleId="team-title" title={t.title}>
      <TeamMembers items={t.members} linkedinLabel={t.linkedinLabel} />
    </LandingSection>
  );
}
