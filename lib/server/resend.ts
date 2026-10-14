import 'server-only';
import { getEnv } from '@/lib/server/env';

const RESEND_API = 'https://api.resend.com';
const REQUEST_TIMEOUT_MS = 8000;

/** POSTs JSON to the Resend API. Resolves `null` when the key is missing or the request fails; nothing is logged. */
export async function resendPost(path: string, body?: unknown): Promise<Response | null> {
  const apiKey = getEnv('RESEND_API_KEY');
  if (!apiKey) return null;

  try {
    return await fetch(`${RESEND_API}${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    return null;
  }
}
