import type { Intention, Step, TimelineEvent } from '@/types/content';

export const timeline: TimelineEvent[] = [
  { id: 'seevrce', year: '2023' },
  { id: 'ngo', year: '2024' },
  { id: 'see', year: '2026' },
];

export const intentions: Intention[] = [{ id: 'friends' }, { id: 'team' }];

export const steps: Step[] = [
  { id: 'profile', number: '01' },
  { id: 'match', number: '02' },
  { id: 'meet', number: '03' },
];
