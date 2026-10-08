# Review calibration log

Every time a `/review-web` finding is judged wrong (false positive) or a real defect slipped
through (false negative), add one row. Reviewers read this before reporting. When a pattern
repeats, fix the rule in `review-contract.md` or the agent's "how to check", and note the fix in
the last column.

| Date | PR | Rule | Finding | Judgement | Rule change |
|---|---|---|---|---|---|
