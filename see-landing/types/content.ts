import type { Dictionary } from './i18n';

export type TeamMemberId = keyof Dictionary['team']['members'];
export type TimelineId = keyof Dictionary['story']['timeline'];
export type IntentionId = keyof Dictionary['intention']['items'];
export type StepId = keyof Dictionary['findYourCircle']['steps'];
/** Text for each member lives in the dictionary under `team.members[id]`. */
export interface TeamMember {
  id: TeamMemberId;
  /** Path in `public/` or a remote placeholder until the real headshot exists. */
  avatar: string;
  /** Leave empty to hide the LinkedIn badge. */
  linkedin?: string;
}

export interface TimelineEvent {
  id: TimelineId;
  year: string;
}

export interface Intention {
  id: IntentionId;
}

export interface Step {
  id: StepId;
  number: string;
}
