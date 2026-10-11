import { Bot, SplitSquareHorizontal, Target, Wand2 } from 'lucide-react';
import type { IconItem, Intention, Step, TimelineEvent, WhyUsId } from '@/types/content';

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

export const features: IconItem<WhyUsId>[] = [
  { id: 'noSwiping', icon: Wand2 },
  { id: 'beyondHobbies', icon: Target },
  { id: 'guided', icon: Bot },
  { id: 'intentions', icon: SplitSquareHorizontal },
];
