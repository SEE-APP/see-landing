---
name: pr-from-branch
description: Diff the current branch against its base branch and write a PR description from the actual code changes
disable-model-invocation: true
---

<context>
It's based on actual code changes. I need you to compare the current git branch against the branch it was created from (its base/parent branch), and summarize the real diff for a Pull Request description.
</context>

<task>
Determine the current branch and the base branch it originated from, compare them using git, and summarize the actual code changes.
</task>

<approach>
- Identify the current branch name (`git branch --show-current`).
- Identify the base branch this branch was created from. Use `git merge-base` / `git log --graph --oneline --all` or check the most likely parent (e.g. `main`, `master`, `develop`). If it's ambiguous, ask me to confirm rather than guessing.
- Run a full diff between the base and current branch (e.g. `git diff <base>...<current>`) and review the commit history between them (`git log <base>..<current>`).
- Base the summary strictly on what the diff and commits actually show — don't invent or assume anything beyond that.
- If there are multiple distinct commits/changes, group them logically.
- Highlight cause and effect — what problem existed and how it was resolved.
- Note any limitations, side effects, or follow-ups that are visible from the diff itself.
</approach>

<format>
Output in markdown, as three separate sections:

1. **PR Title** — one line, conventional commit style (e.g. `feat:`, `fix:`, `refactor:`)
2. **Short description** — 2–4 sentences, for the top of the PR, giving a quick sense of what changed and why
3. **Detailed description** — broken into sections:
   - Problem / Context
   - Changes (organized by file or component, based on the diff)
   - Why this approach (if alternatives are evident from commit messages or comments)
   - Testing / Verification (based on what's visible in the diff — new/changed tests, etc.)
   - Known limitations / Follow-ups (if any)

Write it so it's ready to paste directly into the GitHub PR field.
</format>
