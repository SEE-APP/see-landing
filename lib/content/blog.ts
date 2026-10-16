import placeholderCover from '@/public/hero/phone-space-ready.webp';
import type { BlogPost } from '@/types/blog';

/** Placeholder posts and dates until the team writes the real ones; every post uses the hero image as its cover. */
export const blogPosts: BlogPost[] = [
  {
    slug: 'why-small-groups',
    publishedAt: '2026-10-01',
    cover: placeholderCover,
    coverAlt: { en: 'The SEE app showing that a new Space is ready.' },
    tags: [{ en: 'Product' }, { en: 'Community' }],
    title: { en: 'Why small groups beat big feeds' },
    excerpt: {
      en: 'A handful of people around one table build trust faster than any feed. Here is why SEE is built around micro-groups.',
    },
    body: {
      en: `Public feeds reward reach. A small group rewards attention.

## Trust grows in small rooms

When a few people meet around a shared interest, everyone is seen and everyone speaks. That is the idea behind every Space in SEE.

## What this means for the app

- You are matched on interests, values, goals and skills.
- Groups stay small, so each person matters.
- The first meeting happens offline.

We are building SEE to make that first meeting easy.`,
    },
  },
  {
    slug: 'from-seevrce-to-see',
    publishedAt: '2026-09-15',
    cover: placeholderCover,
    coverAlt: { en: 'The SEE app showing that a new Space is ready.' },
    tags: [{ en: 'Story' }, { en: 'Team' }],
    title: { en: 'From SEEvrce to SEE' },
    excerpt: {
      en: 'SEE began as curated offline meetups at TSU. This is how that grew into the app we are building now.',
    },
    body: {
      en: `SEE did not start with a pitch deck. It started in 2023 at TSU with SEEvrce, where we curated small offline spaces by hand.

## What we learned

High-intent matching works in the real world. Our core team met through those first meetups.

## What comes next

We are turning that proven model into technology, so more people can find their circle.`,
    },
  },
  {
    slug: 'how-a-space-comes-together',
    publishedAt: '2026-09-01',
    cover: placeholderCover,
    coverAlt: { en: 'The SEE app showing that a new Space is ready.' },
    tags: [{ en: 'How it works' }],
    title: { en: 'How a Space comes together' },
    excerpt: {
      en: 'Create a profile, get matched into a micro-group, then break the ice and meet offline. A look at the three steps.',
    },
    body: {
      en: `A Space takes three steps.

## 1. Create a profile and set your intention

Tell us whether you want to find friends, build a team, or both.

## 2. Get matched into a micro-group

No endless swiping. You are matched into a private group built around shared ground.

## 3. Break the ice and meet offline

A built-in facilitator helps the group find a time and plan the first meetup.`,
    },
  },
];
