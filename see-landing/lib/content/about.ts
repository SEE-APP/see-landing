import {
  Bot,
  DoorOpen,
  Handshake,
  Rocket,
  SplitSquareHorizontal,
  Target,
  UserRound,
  Users,
  Wand2,
} from 'lucide-react';
import type { IconItem, IntentionId, Step, TimelineEvent, WhyUsId } from '@/types/content';

export const timeline: TimelineEvent[] = [
  { id: 'seevrce', year: '2023' },
  { id: 'ngo', year: '2024' },
  { id: 'see', year: '2026' },
];

export const intentions: IconItem<IntentionId>[] = [
  { id: 'friends', icon: Users },
  { id: 'team', icon: Rocket },
];

export const steps: Step[] = [
  { id: 'profile', number: '01', icon: UserRound },
  { id: 'space', number: '02', icon: DoorOpen },
  { id: 'meet', number: '03', icon: Handshake },
];

export const features: IconItem<WhyUsId>[] = [
  { id: 'noSwiping', icon: Wand2 },
  { id: 'beyondHobbies', icon: Target },
  { id: 'guided', icon: Bot },
  { id: 'intentions', icon: SplitSquareHorizontal },
];
