import { team } from '@/lib/content/team';
import type { TeamMembersProps } from '@/types/sections';
import TeamMemberCard from './TeamMemberCard';

export default function TeamMembers({ items, linkedinLabel }: TeamMembersProps) {
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
      {team.map((member) => (
        <li key={member.id}>
          <TeamMemberCard
            member={member}
            name={items[member.id].name}
            role={items[member.id].role}
            linkedinLabel={linkedinLabel}
          />
        </li>
      ))}
    </ul>
  );
}
