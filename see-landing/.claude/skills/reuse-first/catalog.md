# Catalog — where shared code lives (SEE landing)

## Homes

| Kind | Home | Notes |
|---|---|---|
| Route, metadata, sitemap, robots, OG image | `app/[lang]/` | `page.tsx` / `layout.tsx` stay Server Components and load the dictionary |
| Copy and translations | `i18n/dictionaries/en.ts` | every user-facing string; `Dictionary` type is inferred from it |
| Locale config, dictionary loader, `format` | `i18n/` | `locales`, `hasLocale`, `getDictionary`, `{placeholder}` filling |
| Server Actions | `app/actions.ts` (or `app/<feature>/actions.ts`) | `'use server'`; secrets from `process.env` only |
| Page sections | `components/landing/` (target) | Hero, About, Team, Demo; Server Components with small client leaves |
| Site chrome | `components/common/` | Navbar, Footer, LanguageSwitcher (in the root layout); MobileNav (target) |
| Primitives | `components/ui/` | Typography, Button, Eyebrow; Input, SectionHeading (target) |
| Custom SVG icons | `assets/icons/` | one component per file, `IconProps` from `types/ui.ts`; use `lucide-react` when it has the icon |
| Waitlist | `components/waitlist/` (target) | the form is the main client leaf |
| Pure helpers and static data | `lib/` | no JSX; `lib/site.ts` (nav, contacts, socials), `lib/content/*.ts` (page lists), `lib/motion.ts`, `lib/validation.ts`, `lib/cn.ts` |
| Types and prop interfaces | `types/` | `content.ts`, `site.ts`, `sections.ts`, `layout.ts`, `ui.ts`, `i18n.ts` |
| Design tokens and CSS variables | `styles/variables.css` | `@theme` tokens + gutters; imported by `app/globals.css`; never hex in components |
| Static assets | `public/` | images as `.webp`/`.avif`, served through `next/image` |

Today everything sits flat in `components/`. Move a file into its target folder when you touch it
for another reason; don't do a bulk move without asking.

## What exists today

| Thing | Where | Kind |
|---|---|---|
| `Navbar` | `components/common/Navbar.tsx` | server |
| `Hero` | `components/Hero.tsx` | client (canvas/effect in `useEffect`) |
| `About` (Story, Intention, HowItWorks, WhyUs sections) | `components/About.tsx` | client, Framer Motion |
| `Team` (`LinkedInBadge`) | `components/Team.tsx` | client, Framer Motion |
| `Demo` (YouTube embed, lazy play) | `components/Demo.tsx` | client, Framer Motion |
| `Waitlist` (email form → Formspree) | `components/Waitlist.tsx` | client, Framer Motion |
| `Footer` | `components/common/Footer.tsx` | server |
| `TikTokIcon`, `InstagramIcon`, `LinkedInIcon`, `PhoneIcon` | `assets/icons/` | server-safe SVG components |
| `navLinks`, `contactDetails`, `socialLinks`, `homeHref` | `lib/site.ts` | static data |
| `LanguageSwitcher` | `components/common/LanguageSwitcher.tsx` | server; hidden while only one locale exists |
| `page-container`, `page-section` | `app/globals.css` (`@utility`) | safe-grid layout classes |
| `Typography` (size/weight/tone/align/as) | `components/ui/Typography.tsx` | server-safe |
| `Button` (filled/outline/text/icon, `href` → `next/link`, `isLoading`) | `components/ui/Button.tsx` | server-safe |
| `Eyebrow` pill | `components/ui/Eyebrow.tsx` | server-safe; wrap in `motion.div` for reveal |
| `cn` | `lib/cn.ts` | className joiner |
