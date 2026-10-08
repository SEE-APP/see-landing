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
import type { Feature, Step, TimelineEvent } from '@/types/content';

export const timeline: TimelineEvent[] = [
  {
    year: '2023',
    title: 'SEEvrce launches',
    desc: 'Offline communities & curated Spaces',
  },
  {
    year: '2024',
    title: 'Youth Space of Georgia',
    desc: 'Community grows into an NGO',
  },
  {
    year: '2026',
    title: 'SEE',
    desc: 'Official launch as a technology startup, building platforms to scale meaningful connections.',
  },
];

export const intentions: Feature[] = [
  {
    icon: Users,
    title: 'Find Friends',
    desc: 'Find people for genuine conversation, shared interests, and new experiences.',
  },
  {
    icon: Rocket,
    title: 'Build Your Team',
    desc: 'Meet collaborators, startup teammates, mentors, and people growing in similar directions.',
  },
];

export const steps: Step[] = [
  {
    number: '01',
    icon: UserRound,
    title: 'Create your profile',
    desc: 'Share what shapes you — your interests, goals, skills, and what you can offer to others.',
  },
  {
    number: '02',
    icon: DoorOpen,
    title: 'Enter a curated Space',
    desc: 'No endless swiping. We automatically match you into a curated micro-group of 4–6 people with meaningful shared ground.',
  },
  {
    number: '03',
    icon: Handshake,
    title: 'Connect with guidance & meet offline',
    desc: 'Our digital facilitator (SEE Guide) helps break the ice, so you can easily plan your first real-world meetup — whether it’s coffee, a city walk, or a brainstorming session.',
  },
];

export const features: Feature[] = [
  {
    icon: Wand2,
    title: 'No Swiping',
    desc: 'We automatically curate your Space.',
  },
  {
    icon: Target,
    title: 'Beyond Hobbies',
    desc: 'Matched by goals, skills, and values.',
  },
  {
    icon: Bot,
    title: 'Guided Connection',
    desc: 'Digital facilitator to break the ice.',
  },
  {
    icon: SplitSquareHorizontal,
    title: 'Clear Intentions',
    desc: 'Separate spaces for friends and collaborators.',
  },
];
