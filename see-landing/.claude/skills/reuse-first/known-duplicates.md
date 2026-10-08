# Known duplicates — consolidation backlog

Switch the copies your task touches to the canonical one; list the rest in the PR. Remove a row
when it's fixed.

| What | Copies | Canonical (target) |
|---|---|---|
| `Eyebrow` section label pill | `components/About.tsx`, `components/Team.tsx` | `components/ui/Eyebrow.tsx` (Server Component, CSS animation) |
| LinkedIn icon | `LinkedInIcon` in `components/Footer.tsx`, `LinkedInBadge` in `components/Team.tsx` | one icon in `components/ui/`, the badge composes it |
| Framer Motion `container`/`item` variants | each section file | CSS keyframes in `globals.css` (motion policy) |
| Section heading styles (h2 size, tracking, subtitle colour) | inline `style` in About, Team, Demo, Waitlist | `components/ui/SectionHeading.tsx` or Tailwind classes |
