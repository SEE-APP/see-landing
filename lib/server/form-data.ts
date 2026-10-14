import 'server-only';
import { honeypotField } from '@/lib/content/contact';

export function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

/** Logs an unexpected action failure by error name only, so no visitor data reaches the logs. */
export function logActionError(action: string, error: unknown): void {
  console.error(`[${action}] failed unexpectedly: ${error instanceof Error ? error.name : 'unknown error'}`);
}

/** Real visitors never see the honeypot field; bots fill it. In development a dropped submission is reported. */
export function isBot(formData: FormData): boolean {
  const filled = read(formData, honeypotField) !== '';
  if (filled && process.env.NODE_ENV === 'development') {
    console.warn('[form] Honeypot field was filled; the submission was dropped as a bot.');
  }
  return filled;
}
