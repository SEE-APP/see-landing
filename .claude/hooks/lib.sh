#!/usr/bin/env bash
# Shared by the hooks in this folder. Reads the hook payload (JSON on stdin) once and extracts a field.
# Uses jq when present, else node (Windows Git Bash usually has node but not jq). If neither exists
# the guard must not silently allow everything: hook_field fails and the caller blocks.
HOOK_INPUT="$(cat)"

hook_field() {  # $1 = jq path, e.g. .tool_input.command
  if command -v jq >/dev/null 2>&1; then
    printf '%s' "$HOOK_INPUT" | jq -r "$1 // empty"
  elif command -v node >/dev/null 2>&1; then
    printf '%s' "$HOOK_INPUT" | node -e '
      let s = ""; process.stdin.on("data", d => (s += d)).on("end", () => {
        let v; try { v = JSON.parse(s); } catch { process.exit(0); }
        for (const k of process.argv[1].split(".").filter(Boolean)) v = v == null ? v : v[k];
        if (v != null) process.stdout.write(String(v));
      });' "$1"
  else
    echo "Claude hooks need jq or node on PATH; install one (winget install jqlang.jq)." >&2
    return 1
  fi
}
