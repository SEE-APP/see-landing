import 'server-only';
import { headers } from 'next/headers';

interface Counter {
  count: number;
  resetAt: number;
}

interface RateLimit {
  /** Submissions allowed per window. */
  limit: number;
  windowMs: number;
}

const MAX_TRACKED_KEYS = 10_000;
const TEN_MINUTES = 10 * 60 * 1000;

/** Per visitor: enough for a retry or a typo fix, not for a script. */
const formRateLimits = {
  waitlist: { limit: 5, windowMs: TEN_MINUTES },
  contact: { limit: 5, windowMs: TEN_MINUTES },
  meeting: { limit: 3, windowMs: TEN_MINUTES },
} as const satisfies Record<string, RateLimit>;

/**
 * Fixed-window counters kept in this server instance's memory. Vercel runs several short-lived instances,
 * so this stops scripted bursts from one visitor, not a distributed attack (that needs a shared store).
 */
const windows = new Map<string, Counter>();

function prune(now: number) {
  for (const [key, entry] of windows) {
    if (entry.resetAt <= now) windows.delete(key);
  }
  if (windows.size > MAX_TRACKED_KEYS) windows.clear();
}

/**
 * The visitor's IP. Vercel overwrites `x-forwarded-for`, so it can't be spoofed there; on another host behind
 * no trusted proxy a client could set it. `unknown` when there is none (local tools).
 */
async function clientIp(): Promise<string> {
  const list = await headers();
  return list.get('x-forwarded-for')?.split(',')[0]?.trim() || list.get('x-real-ip')?.trim() || 'unknown';
}

/** Counts one submission for this visitor and form. Resolves `false` once the limit for the window is used up. */
export async function takeRateLimit(form: keyof typeof formRateLimits): Promise<boolean> {
  const { limit, windowMs }: RateLimit = formRateLimits[form];
  const now = Date.now();
  if (windows.size > MAX_TRACKED_KEYS / 2) prune(now);

  const key = `${form}:${await clientIp()}`;
  const entry = windows.get(key);
  if (!entry || entry.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
