import type { TeamMember } from './content';
import type { Dictionary, Locale } from './i18n';

export interface HeroProps {
  lang: Locale;
  t: Dictionary['hero'];
}

export interface StoryProps {
  t: Dictionary['story'];
}

export interface StoryTimelineProps {
  items: Dictionary['story']['timeline'];
}

export interface IntentionProps {
  t: Dictionary['intention'];
}

export interface IntentionCardsProps {
  items: Dictionary['intention']['items'];
}

export interface IntentionOptionProps {
  title: string;
  desc: string;
  isSelected: boolean;
}

export interface FindYourCircleProps {
  t: Dictionary['findYourCircle'];
}

export interface CircleStepsProps {
  items: Dictionary['findYourCircle']['steps'];
}

export interface TeamProps {
  t: Dictionary['team'];
}

export interface TeamMembersProps {
  items: Dictionary['team']['members'];
  linkedinLabel: string;
}

export interface TeamMemberCardProps {
  member: TeamMember;
  name: string;
  role: string;
  linkedinLabel: string;
}

export interface WaitlistProps {
  t: Dictionary['waitlist'];
}

export type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error';
