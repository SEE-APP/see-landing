---
name: pr-from-session
description: Summarize what was actually implemented in this conversation, formatted as a PR description
disable-model-invocation: true
---

<context>
We worked together in this conversation on a specific coding task. I need a summary of this session that I can paste directly into a Pull Request description.
</context>

<task>
Review this entire conversation from start to finish and summarize the work that was actually completed — not what was discussed, but what was actually implemented in the code.
</task>

<approach>
- Rely only on what actually happened in this conversation — don't invent or assume anything.
- If there were multiple distinct changes/stages, group them logically.
- Highlight cause and effect — what problem existed and how it was resolved.
- If there are known limitations, side effects, or next steps, call them out separately.
</approach>

<format>
Output in markdown, as three separate sections:

1. **PR Title** — one line, conventional commit style (e.g. `feat:`, `fix:`, `refactor:`)
2. **Short description** — 2–4 sentences, for the top of the PR, giving a quick sense of what changed and why
3. **Detailed description** — broken into sections:
   - Problem / Context
   - Changes (organized by file or component)
   - Why this approach (if there were alternatives that were rejected)
   - Testing / Verification
   - Known limitations / Follow-ups (if any)

Write it so it's ready to paste directly into the GitHub PR field.
</format>
