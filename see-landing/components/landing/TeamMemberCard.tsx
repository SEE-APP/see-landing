import Image from 'next/image';
import LinkedInIcon from '@/assets/icons/LinkedInIcon';
import Typography from '@/components/ui/Typography';
import { format } from '@/i18n/format';
import type { TeamMemberCardProps } from '@/types/sections';

export default function TeamMemberCard({ member, name, role, linkedinLabel }: TeamMemberCardProps) {
  return (
    <figure>
      <Image
        src={member.photo}
        alt=""
        sizes="(min-width: 1100px) 340px, (min-width: 640px) 30vw, 100vw"
        className="aspect-square w-full rounded-2xl bg-surface object-cover"
      />
      <figcaption className="mt-5 flex items-start justify-between gap-4">
        <span className="flex flex-col">
          <Typography as="h3" size={20} weight="semibold">
            {name}
          </Typography>
          <Typography size={16} tone="muted" className="mt-1">
            {role}
          </Typography>
        </span>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={format(linkedinLabel, { name })}
          className="mt-1 shrink-0 rounded-sm text-ink-muted transition-colors duration-200 hover:text-accent focus-ring"
        >
          <LinkedInIcon size={20} />
        </a>
      </figcaption>
    </figure>
  );
}
