import 'server-only';
import { getEnv } from '@/lib/server/env';

const RESEND_API = 'https://api.resend.com';
const REQUEST_TIMEOUT_MS = 8000;

/** `rejected`: Resend refused this request; `failed`: missing or refused key, network error or timeout. */
type ResendResult = 'ok' | 'rejected' | 'failed';

/** Keeps addresses out of the logs when a path contains one (`/contacts/{email}/…`). */
function loggablePath(path: string): string {
  return path.replace(/[^/]*(@|%40)[^/]*/gi, '<email>');
}

/** Resend's error `name` (e.g. `validation_error`). The `message` is never logged: it can contain addresses. */
async function errorName(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === 'object' && 'name' in body && typeof body.name === 'string') return body.name;
  } catch {}
  return 'unknown';
}

/** POSTs JSON to the Resend API. Failures are logged with the status and error name only. */
export async function resendPost(path: string, body?: unknown): Promise<ResendResult> {
  const apiKey = getEnv('RESEND_API_KEY');
  if (!apiKey) return 'failed';

  try {
    const response = await fetch(`${RESEND_API}${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (response.ok) return 'ok';

    console.error(`[resend] POST ${loggablePath(path)} failed: ${response.status} ${await errorName(response)}`);
    return response.status === 401 || response.status === 403 ? 'failed' : 'rejected';
  } catch (error) {
    const reason = error instanceof Error ? error.name : 'unknown';
    console.error(`[resend] POST ${loggablePath(path)} did not complete: ${reason}`);
    return 'failed';
  }
}
