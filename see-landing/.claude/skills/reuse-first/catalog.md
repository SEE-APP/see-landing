# Catalog — where shared code lives (SEE landing)

## Homes

| Kind | Home | Notes |
|---|---|---|
| Route, metadata, sitemap, robots, OG image | `app/` | `page.tsx` / `layout.tsx` stay Server Components |
| Server Actions | `app/actions.ts` (or `app/<feature>/actions.ts`) | `'use server'`; secrets from `process.env` only |
| Page sections | `components/landing/` (target) | Hero, About, Team, Demo; Server Components with small client leaves |
| Site chrome | `components/common/` (target) | Navbar, Footer, MobileNav |
| Primitives | `components/ui/` (target) | Button, Input, Eyebrow, SectionHeading, Icon wrappers |
| Waitlist | `components/waitlist/` (target) | the form is the main client leaf |
| Pure helpers and static data | `lib/` (target) | no React; e.g. `lib/site.ts` for name, URL, socials |
| Design tokens | `tailwind.config.ts` (v3) → `@theme` in `app/globals.css` (v4 target) | never hex in components |
| Static assets | `public/` | images as `.webp`/`.avif`, served through `next/image` |

Today everything sits flat in `components/`. Move a file into its target folder when you touch it
for another reason; don't do a bulk move without asking.

## What exists today

| Thing | Where | Kind |
|---|---|---|
| `Navbar` | `components/Navbar.tsx` | client (only for scroll-to-waitlist; inline styles + JS hover — debt) |
| `Hero` | `components/Hero.tsx` | client (canvas/effect in `useEffect`) |
| `About` (`StorySection`, `IntentionSection`, timeline/intentions/steps/features data) | `components/About.tsx` | client, Framer Motion, 628 lines |
| `Team` (`TeamMember` type, `LinkedInBadge`) | `components/Team.tsx` | client, Framer Motion |
| `Demo` (YouTube embed, lazy play) | `components/Demo.tsx` | client, Framer Motion |
| `Waitlist` (email form → Formspree) | `components/Waitlist.tsx` | client, Framer Motion |
| `Footer` (`TikTokIcon`, `InstagramIcon`, `LinkedInIcon`, `PhoneIcon`, link lists) | `components/Footer.tsx` | client without needing to be |
| Eyebrow pill (`Eyebrow`) | `About.tsx` and `Team.tsx` | duplicated — see known-duplicates |
