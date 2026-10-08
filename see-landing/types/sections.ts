import type { Dictionary } from './i18n';

export interface HeroProps {
  t: Dictionary['hero'];
}

export interface AboutProps {
  story: Dictionary['story'];
  intention: Dictionary['intention'];
  howItWorks: Dictionary['howItWorks'];
  whyUs: Dictionary['whyUs'];
}

export interface TeamProps {
  t: Dictionary['team'];
}

export interface DemoProps {
  t: Dictionary['demo'];
  waitlistHref: string;
  videoSrc: string;
}

export interface WaitlistProps {
  t: Dictionary['waitlist'];
}

export type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error';
