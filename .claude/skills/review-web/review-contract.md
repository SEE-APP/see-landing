# Review contract — SEE landing page

Every `/review-web` reviewer follows this file. Same range, same severity scale, same verdict logic,
same report shape, so two reviews of the same branch are comparable.

## 1. Scope

- The range is exactly `MERGE_BASE...HEAD` given by the orchestrator. Uncommitted changes are out of
  scope. Use `git diff --relative` (the app lives one folder below the git root).
- Report only defects the diff **introduces or extends** (e.g. adds another copy of a known
  duplicate). Pre-existing debt in untouched code goes in "Pre-existing", max 5 items, never affects
  the verdict. AGENTS.md "Known debt" is pre-existing by definition.
- A finding must be **reachable** (a real input, device or state triggers it), **introduced** by
  this range and **material**. Otherwise put it under "Unverified".
- Read code at HEAD (`git show HEAD:<path>` if the checkout differs). Read the **rules**
  (`AGENTS.md`, `.claude/**`) from the working tree.
- Read-only. Never edit, commit, checkout, reset, push or post comments.

## 2. Severity

| Severity | Definition |
|---|---|
| **BLOCKER** | Must not merge. Exploitable, loses waitlist signups, breaks the page or the build, or fails a gate. |
| **MAJOR** | Real bug or rule violation that will cause an incident or spread if merged. Fix in this PR. |
| **MINOR** | Convention violation with limited impact. Fix in this PR or note it. |
| **NIT** | Optional polish. Never blocks. |

Severity examples below are **floors**: a finding matching one is at least that severity.

Duplication (ARCH-REUSE-*): MAJOR for a whole copied component/helper; MINOR for copied
expressions/constants; NIT for a redeclared single-use constant.

Before reporting, read [calibration-log.md](calibration-log.md); if a finding matches a logged
false positive, drop it or say what is different.

## 3. Verdict (derived, never chosen)

- any BLOCKER → **BLOCKED**
- else any MAJOR → **CHANGES_REQUIRED**
- else any MINOR/NIT → **APPROVE_WITH_NITS**
- else → **APPROVE**

## 4. Finding format (exact)

```
[SEVERITY][RULE-ID] path/to/file.ext:LINE — what is wrong and the concrete trigger — minimal fix
```

One finding per defect; the same defect at several lines → one finding, lines comma-separated. All
three ` — ` parts are required (`— no fix needed` for a NIT without one). Paths are app-relative.

## 5. Coverage line

After its findings each agent prints one line:
`COVERAGE <PREFIX> checked <n>/<total> · FAIL <ids or none> · N/A <ids>`.

## 6. Rules

### SEC — security (`web-security-reviewer`)

| ID | Rule | Examples |
|---|---|---|
| SEC-XSS-01 | No unescaped external/user data into HTML, URLs or script | BLOCKER: `dangerouslySetInnerHTML` with non-static data |
| SEC-FORM-01 | Waitlist submission validated server-side, bot-protected, generic errors, no email in logs | MAJOR: Server Action without validation |
| SEC-ENV-01 | No secrets in git, `NEXT_PUBLIC_*` or client imports | BLOCKER: key committed or exposed to the client |
| SEC-HDR-01 | Security headers kept; every new origin in CSP; no `'unsafe-eval'`/`*` without reason | MAJOR: new third-party origin not in CSP |
| SEC-LINK-01 | `target="_blank"` has `rel="noopener noreferrer"`; iframes titled, lazy, minimal `allow` | MINOR |
| SEC-PII-01 | No PII in analytics events, UTM, URLs or logs | MAJOR |
| SEC-DEP-01 | Every new dependency justified | MAJOR: unexplained runtime dependency |

### PERF — performance (`web-perf-reviewer`)

| ID | Rule | Examples |
|---|---|---|
| PERF-CLIENT-01 | `'use client'` only on leaves that need the browser; never on page/layout | MAJOR: page or whole section made client |
| PERF-CLIENT-02 | No static data/markup or heavy imports in client files | MINOR; MAJOR if > ~20KB added to `/` first-load JS |
| PERF-ANIM-01 | Motion policy: CSS first; Framer Motion only in a client leaf via `LazyMotion` + `m`; transform/opacity only | MAJOR: new `framer-motion` import for a fade/slide CSS can do |
| PERF-STATIC-01 | `/` stays static; no `output: 'export'`, no `images.unoptimized` | BLOCKER: `/` becomes dynamic without a reason |
| PERF-IMG-01 | `next/image` with dimensions/`sizes`; `priority` only on the hero; WebP/AVIF | MAJOR: raw `<img>` above the fold; MINOR below |
| PERF-FONT-01 | Fonts via `next/font`; ≤ 2 families | MAJOR: font CDN `<link>` |
| PERF-RENDER-01 | react-discipline memo/effect rules; passive + cleaned-up listeners | MINOR |

### A11Y — accessibility (`web-a11y-ui-reviewer`)

| ID | Rule | Examples |
|---|---|---|
| A11Y-NAME-01 | Every interactive element and image has an accessible name / alt | MAJOR: icon-only link without label |
| A11Y-KBD-01 | Everything clickable is a `<button>`/`<a>`, focusable, with a visible `focus-visible` style | MAJOR: `onClick` on a `<div>` |
| A11Y-FORM-01 | Labelled inputs, linked error text, announced status | MAJOR: waitlist input without a label |
| A11Y-MOTION-01 | All new motion honours `prefers-reduced-motion` | MINOR; MAJOR for looping/parallax motion |
| A11Y-HEAD-01 | One `<h1>`, no skipped heading levels, named sections | MINOR |
| A11Y-CONTRAST-01 | Text contrast ≥ 4.5:1 (large ≥ 3:1) on its background | MAJOR for body text |

### UI — design system (`web-a11y-ui-reviewer`)

| ID | Rule | Examples |
|---|---|---|
| UI-TOKEN-01 | Colours from the Tailwind theme; no hex/rgb literals (incl. `bg-[#…]`) in components | MINOR |
| UI-CSS-01 | No static `style={{}}`, no JS hover/focus style handlers, no `!important` | MINOR |
| UI-COMP-01 | Reuse shared UI (catalog) instead of new near-copies | MINOR (ARCH-REUSE-* if a whole component is copied) |
| UI-RESP-01 | Layout works at 393px and desktop | MAJOR: horizontal scroll or clipped CTA on mobile |

### ARCH / HYG — architecture and hygiene (`web-architecture-reviewer`)

| ID | Rule | Examples |
|---|---|---|
| ARCH-REUSE-01 | Don't re-implement what an existing export does | MAJOR for a whole component |
| ARCH-REUSE-02 | Promote a private helper instead of copying it | MAJOR |
| ARCH-REUSE-03 | Don't add another copy of a `known-duplicates.md` entry (cite the row) | MAJOR |
| ARCH-RSC-01 | Correct server/client boundaries; no server-only modules imported by client code | MAJOR |
| ARCH-DATA-01 | Server Action for form submission on Vercel; route handlers only with a reason | MINOR |
| ARCH-STRUCT-01 | New files in the target folders: `components/{landing,common,ui,waitlist}`, `lib/` | MINOR |
| ARCH-IMPORT-01 | `@/` imports, no barrels, no deep relatives | MINOR |
| ARCH-SIZE-01 | Files > ~250 lines don't grow; split sections | MINOR |
| ARCH-DEP-01 | No form/state/UI-kit/animation libraries without agreement | MAJOR |
| HYG-LOG-01 | No `console.*` left in `app/` or `components/` | MINOR |
| HYG-CMT-01 | No what-comments, no commented-out code | NIT |
| HYG-DEAD-01 | No unused exports, components or `public/` assets | MINOR |

### GATE

`[BLOCKER][GATE]` for each lint/build error the branch introduces.

## 7. Report template

```
# Review — <branch> @ <HEAD short> vs <BASE> (merge-base <short>)

**Verdict: <BLOCKED | CHANGES_REQUIRED | APPROVE_WITH_NITS | APPROVE>**
Blockers <n> · Major <n> · Minor <n> · Nit <n>

## Gates
lint PASS|FAIL · build PASS|FAIL (/ static ○, first-load JS <n> kB)
## Findings
## Unverified
## Pre-existing (not blocking)
## Rule coverage
<agents' COVERAGE lines + skipped agents>
```

Answer the user in their language; keep rule IDs, severities and the verdict in English.
