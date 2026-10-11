# Catalog — where shared code lives (SEE landing)

## Homes

| Kind | Home | Notes |
|---|---|---|
| Route, metadata, sitemap, robots, OG image | `app/[lang]/` | `page.tsx` / `layout.tsx` stay Server Components and load the dictionary |
| Copy and translations | `i18n/dictionaries/en.ts` | every user-facing string; `Dictionary` type is inferred from it |
| Locale config, dictionary loader, `format` | `i18n/` | `locales`, `hasLocale`, `getDictionary`, `{placeholder}` filling |
| Server Actions | `app/actions.ts` (or `app/<feature>/actions.ts`) | `'use server'`; secrets from `process.env` only |
| Page sections | `components/landing/` (target) | Story, FindYourCircle, Intention, Team, Waitlist (moved); Hero (not yet); Server Components with small client leaves |
| Site chrome | `components/common/` | Navbar, MobileNav, Footer, ThemeSwitcher, LanguageSwitcher (in the root layout) |
| Primitives | `components/ui/` | Typography, Button, NumberedList, EditorialHeading, Dropdown, PopoverPanel; Input (target) |
| Custom SVG icons | `assets/icons/` | one component per file, `IconProps` from `types/ui.ts`; use `lucide-react` when it has the icon |
| Waitlist form | `components/waitlist/` | WaitlistForm is the client leaf; the request is `joinWaitlist` in `lib/waitlist.ts` |
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
| `AutoHideHeader` (sticky `<header>` that slides up on scroll down, back on scroll up or focus) | `components/common/AutoHideHeader.tsx` | client leaf; wraps the Navbar content |
| `BrandLink` (logo + wordmark home link) | `components/common/BrandLink.tsx` | server; used by Navbar, MobileNav and Footer |
| `Hero` | `components/landing/Hero.tsx` | server |
| `Story`, `StoryTimeline` | `components/landing/` | server |
| `Intention` (section), `IntentionCards` (multi-select list), `IntentionOption` (visual content of one row; the button lives in `IntentionCards`) | `components/landing/` | server section, client leaf |
| `FindYourCircle`, `CircleSteps` | `components/landing/` | server |
| `Team` (section), `TeamMembers` (photo grid), `TeamMemberCard` (photo, name, role, LinkedIn link) | `components/landing/` | server |
| `Waitlist` (centered closing CTA), `WaitlistRings` (faint concentric rings SVG behind it) | `components/landing/` | server |
| `WaitlistForm` (email field + filled button in one bordered pill, idle/loading/error), `WaitlistSuccess` | `components/waitlist/` | client leaf, server-safe |
| `Footer` (layout), `FooterColumn` (h2 title + content), `FooterNav` (footer links), `FooterContacts` (email/phone with icons) | `components/common/` | server |
| `SocialLinks` (Instagram/LinkedIn/TikTok icon links) | `components/common/SocialLinks.tsx` | server; reuse wherever social links appear |
| `TikTokIcon`, `InstagramIcon`, `LinkedInIcon`, `PhoneIcon` | `assets/icons/` | server-safe SVG components |
| `navLinks`, `footerLinks`, `ctaHash`, `contactDetails`, `socialLinks`, `homeHref` | `lib/site.ts` | static data |
| `LanguageSwitcher` (`variant`: `header` dropdown, `footer` globe + upward dropdown, `menu` collapsible `<details>` row), `LanguageOptions` (shared items) | `components/common/`; all show only the current language until opened, so they scale to any number of locales | server; hidden while only one locale exists |
| `MobileNav` (hamburger + full-width popover menu, below `lg`) | `components/common/MobileNav.tsx` | server |
| `page-container`, `page-section` | `app/globals.css` (`@utility`) | safe-grid layout classes |
| `Typography` (`variant` display/body-lg/body, or `size`/`weight`/`tone`; `tracking`, `as`) | `components/ui/Typography.tsx` | server-safe |
| `Button` (filled/outline, `size` md/sm, `shape` pill/rounded, `href` → `next/link`, `isLoading`) | `components/ui/Button.tsx` | server-safe |
| `Dropdown` (native popover menu, plain-text trigger, flat hairline panel; `placement="top"` opens upward), `DropdownItem` (menu link) | `components/ui/Dropdown.tsx`, `components/ui/DropdownItem.tsx` | server; panel CSS (`.dropdown-panel*`) in `styles/popover.css` |
| `PopoverPanel` (`popover="auto"` div, closes after a link click; `modal` adds dialog role, focus move and focus trap) | `components/ui/PopoverPanel.tsx` | client leaf; use via `Dropdown` or with a `popoverTarget` button |
| `NumberedList` (rail of numbered/dated columns; `size`, `isCurrent`, `accentMarkers`) | `components/ui/NumberedList.tsx` | server-safe; bound by `CircleSteps` and `StoryTimeline` |
| `LandingSection` (section + `page-container` + `max-w-content` column + heading + content spacing) | `components/ui/LandingSection.tsx` | server-safe; wrap every landing section in it (Story, FindYourCircle, Intention, Team) |
| `EditorialHeading` (h2 with `id` left, optional muted paragraphs right, no badge) | `components/ui/EditorialHeading.tsx` | server-safe; rendered by `LandingSection` |
| `focus-ring` utility (2px accent outline, 2px offset on `:focus-visible`; `focus-ring-inset` and `focus-ring-within` variants) | `app/globals.css` | use instead of repeating `focus-visible:outline-*` classes |
| `cn` | `lib/cn.ts` | className joiner |
