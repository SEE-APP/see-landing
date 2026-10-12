---
name: review-web
description: Team-standard code review for the SEE landing page (Next.js 16). Resolves the review range against origin/main, runs the gates (lint, build), then runs the four reviewer agents (security, perf, a11y/UI, architecture/reuse) and merges them into one report with a derived verdict. Use when a task is finished (author self-review) or when reviewing someone else's branch, instead of an ad-hoc review.
argument-hint: "[base-branch|base-commit] [full]  e.g. main — omit base to use origin/main; full = all agents, Opus for security"
disable-model-invocation: true
---

# /review-web — the one review everybody runs

The author runs it before opening the PR; the reviewer runs it on the same branch. Same range, same
gates, same agents, same rule IDs, same verdict logic. Severity, verdict, finding format and the
report template are in [review-contract.md](review-contract.md) — read it first.

Read-only. Do not edit code, commit, push or post comments unless the user asks afterwards.

## Step 1 — Range

The git root is one level above the app; run everything from the app folder and use `--relative` so
paths are app-relative.

```bash
git fetch origin --quiet
BASE=origin/main                  # or the first argument in $ARGUMENTS that isn't "full"
MERGE_BASE=$(git merge-base "$BASE" HEAD)
git rev-parse --abbrev-ref HEAD; git rev-parse --short HEAD; git rev-parse --short "$MERGE_BASE"
git diff --relative --name-status "$MERGE_BASE"...HEAD
git status --porcelain --untracked-files=no -- .
```

If `git status` shows changes, tell the user uncommitted work is not reviewed. If the diff is empty,
say so and stop. Never guess a base: if `merge-base` fails, ask.

## Step 2 — Gates (run all, record PASS / FAIL / BLOCKED (reason))

```bash
set -o pipefail
npm run lint 2>&1 | tail -40
npm run build 2>&1 | tail -40
```

No `node_modules` → `BLOCKED (npm ci needed)`. From the build output keep the route table lines:
`/` must stay `○ (Static)`; note its size/first-load JS. A new gate error the branch introduces is a
`[BLOCKER][GATE]` finding; errors that also exist at `MERGE_BASE` are "Pre-existing" (check by
running the gate in a temporary worktree:
`git worktree add --detach ../.review-base "$MERGE_BASE"`, `npm ci`, gate, then
`git worktree remove ../.review-base`). Never paste a full log into the context or the prompts.

## Step 3 — Reviewers, one message

An agent runs when at least one changed file matches its paths. `full` selects every agent.

| agent | runs when a changed file matches |
|---|---|
| `web-security-reviewer` | `app/**`, `components/**`, `lib/**`, `next.config.ts`, `vercel.json`, `.env*`, `package.json`, `package-lock.json` |
| `web-perf-reviewer` | `app/**`, `components/**`, `lib/**`, `public/**`, `next.config.ts`, `package.json`, `tailwind.config.ts`, `postcss.config.mjs` |
| `web-a11y-ui-reviewer` | `**/*.tsx`, `**/*.css`, `tailwind.config.ts` |
| `web-architecture-reviewer` | `app/**`, `components/**`, `lib/**`, `package.json` |

**High-risk paths** (→ pass `model: "opus"` to `web-security-reviewer`): any `'use server'` file,
`app/actions*.ts`, `app/api/**`, `components/**/Waitlist*`, `components/waitlist/**`,
`next.config.ts`, `vercel.json`, `.env*`. Also Opus when `full` is given.

Launch the selected agents in **one message** with the identical prompt:

```
Review range (do not re-resolve):
BASE=<base> MERGE_BASE=<sha> HEAD=<sha> BRANCH=<branch>
Diff: git diff --relative <MERGE_BASE>...<HEAD>
Changed files:
<name-status list>

Gate results (one line per gate, errors only):
<gate lines>

Intent: <PR title/body or the user's task, else "unknown">

Follow .claude/skills/review-web/review-contract.md exactly: scope, severity, finding format,
and end with your one COVERAGE line.
```

Record every agent that didn't run (`PERF skipped: no matching files`).

## Step 4 — Merge and verify

De-duplicate by (file, line, defect); keep the highest severity and the first rule ID in the order
SEC, A11Y, UI, PERF, ARCH, HYG. Re-verify every BLOCKER and MAJOR by reading the cited lines at HEAD;
if the trigger can't be confirmed, move it to "Unverified". Restore any severity an agent lowered
below a contract example. Derive the verdict mechanically.

## Step 5 — Report

Write the report with **Bash** to `.claude/reviews/<branch-with-slashes-as-dashes>__<short sha>.md`
(git-ignored): `mkdir -p .claude/reviews && cat > <file> <<'REVIEW' … REVIEW`, then print it with
`cat <file>` — the printed report is the file. Use the template in the contract; every finding is its
own `path:LINE` line. A short prose summary may follow, never replace it.

## Step 6 — Close the loop

A rejected finding, or a defect that got through, becomes a row in
[calibration-log.md](calibration-log.md) in the same PR. When a pattern repeats, change the rule in
review-contract.md (and the agent's "how to check"), not just the log.
