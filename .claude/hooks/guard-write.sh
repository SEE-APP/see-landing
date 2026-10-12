#!/usr/bin/env bash
# PreToolUse(Write|Edit) guard: env files are edited by hand only.
# Templates (.env.example / .env.sample / .env.template) stay editable. Needs jq or node (lib.sh).
. "$(dirname "$0")/lib.sh"
FILE=$(hook_field .tool_input.file_path) || exit 2
FILE="${FILE//\\//}"   # Windows paths use backslashes; the patterns below expect /
[ -z "$FILE" ] && exit 0

if echo "$FILE" | grep -qE '(^|/)\.env(\.[A-Za-z0-9_.-]+)?$' \
  && ! echo "$FILE" | grep -qE '\.env\.(example|sample|template)$'; then
  echo "Blocked: refusing to write environment file $FILE. Edit env files manually." >&2
  exit 2
fi
exit 0
