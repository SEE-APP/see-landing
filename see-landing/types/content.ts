import type { LucideIcon } from 'lucide-react';

export interface TeamMember {
  name: string;
  role: string;
  /** Path in `public/` or a remote placeholder until the real headshot exists. */
  avatar: string;
  /** Leave empty to hide the LinkedIn badge. */
  linkedin?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface Step extends Feature {
  number: string;
}
