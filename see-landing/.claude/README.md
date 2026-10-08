# AI setup (Cursor + Claude Code): SEE landing

Committed so every developer's agent works the same way and reviews apply the same rules.
Open this folder (`see-landing/see-landing/`, next to `package.json`) as the Cursor workspace, or run
Claude Code from it; the git root is one level up. Both tools load `AGENTS.md`, `.claude/skills`,
`.claude/agents` and the hooks in `.claude/settings.json`. Cursor doesn't read `.claude/rules`, so
`.cursor/rules/*.mdc` wraps them with globs (the rule text stays in `.claude/rules`).

```
AGENTS.md                     the project rules for every tool: Next 16 warning, goals, gates, rendering, structure, debt, workflow, git
CLAUDE.md                     only `@AGENTS.md` (Claude Code imports it; Cursor reads AGENTS.md directly)
.cursor/rules/*.mdc           Cursor wrappers: globs → @.claude/rules/<same name>.md
.claude/
├── settings.json             shared permissions, hooks, attribution off
├── settings.local.json       your personal overrides (git-ignored)
├── rules/                    path-scoped, loaded when Claude touches matching files
│   ├── components.md         server/client, motion policy, markup, structure, CTA
│   ├── app-router.md         static rendering, metadata, layout, Server Actions, next.config
│   └── styles.md             Tailwind tokens, v4 target, keyframes, contrast
├── agents/
│   ├── frontend-designer.md  build/polish UI within the rules
│   ├── frontend-security.md  form, headers/CSP, env, links, deps
│   ├── seo.md                Metadata API, sitemap/robots/OG, JSON-LD, CWV
│   └── web-*-reviewer.md     the 4 read-only reviewers /review-web runs (security, perf, a11y-ui, architecture)
├── skills/
│   ├── review-web/           /review-web: SKILL.md, review-contract.md (rule IDs, severity, report), calibration-log.md
│   ├── react-discipline/     RSC boundaries, memoization, effects, forms, imports
│   ├── reuse-first/          SKILL.md + catalog.md (where code lives) + known-duplicates.md
│   ├── pr-from-branch/ …     /pr-from-branch, /pr-from-session, /review-critique, /review-fe-branch
│   │                         (user-invoked only: disable-model-invocation; skills so Cursor and Claude Code both load them)
│   └── …                     design/taste, animation, Vercel React rules, deploy-to-vercel, prototype, karpathy-guidelines
├── hooks/                    guard-bash, guard-write, scan-secrets, nudge-console (+ lib.sh)
├── design-references/        Apple, Linear, Stripe, Vercel, Cursor, Cal, Raycast — structure only
└── reviews/                  saved /review-web reports (git-ignored)
```

## Daily use

1. **Build:** describe the task; for UI, Claude uses `frontend-designer` and the path rules. Before
   writing a new component it runs `reuse-first`.
2. **Finish (author):** run the gates from `AGENTS.md` (`npm run lint && npm run build`), then
   `/review-web`. Fix every BLOCKER/MAJOR, re-run, put the verdict line in the PR description.
   `/review-web main full` runs all four reviewers with Opus on security.
3. **Review (reviewer):** check out the branch, run `/review-web`. Same range, rules and verdict
   logic, so reports are comparable (`.claude/reviews/<branch>__<sha>.md`).
4. Disagree with a finding, or found a bug the review missed? Add a row to
   `skills/review-web/calibration-log.md` in the same PR.

Setup once: `jq` or `node` on PATH (the hooks use either). On Windows the hooks run in Git Bash.

## Hooks (`settings.json`)

| Hook | Does |
|---|---|
| `hooks/guard-bash.sh` (PreToolUse Bash) | blocks force-push, `--no-verify`, pushes to `main`/`master`, broad or `.env` `git add`, `git commit -a`, reading `.env` via shell, `vercel --prod` |
| `hooks/guard-write.sh` (PreToolUse Write/Edit) | blocks writing `.env*` files (templates allowed) |
| `hooks/scan-secrets.sh` (PostToolUse) | warns Claude when a written file contains a live-looking credential |
| `hooks/nudge-console.sh` (PostToolUse) | warns about `console.log/debug/trace` in `app/`, `components/`, `lib/` |

A PostToolUse hook must `exit 2` for Claude to see its message. `permissions.deny` keeps Claude from
reading `.env*` and `.mcp.json`.

## Where things came from

| Piece | Source | Changed |
|---|---|---|
| Review system, reviewer agents, hooks, react-discipline, reuse-first | Earth Voyage web | rewritten for Next.js/Vercel; no Jira, RC branches, anchors or shared sync layer; correctness and perf-fix agents dropped |
| frontend-designer, frontend-security, seo, design-references, taste skills | Ebralidze portfolio | rewritten for App Router, Tailwind, Vercel, waitlist |
| Animation, Vercel, design-guideline skills, PR/review workflows | global `~/.claude` (skills and commands) | copied as is; commands turned into skills, review conventions adapted |
| Rendering/perf/SEO rules | landing-page research | adapted: Vercel SSG instead of static export, Server Action form, CSS-first motion, store CTAs deferred until launch |

## Keeping it true

- Change a review rule in `review-contract.md` and the agent's "how to check", not in one place.
- Promoted a component or removed a duplicate? Update `reuse-first/catalog.md` / `known-duplicates.md`.
- Fixed a Known debt item? Remove it from `AGENTS.md`.
- A `paths:` glob in `rules/` must match real files; re-check after moving folders.
