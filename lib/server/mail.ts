import 'server-only';
import { getEnv } from '@/lib/server/env';
import { resendPost } from '@/lib/server/resend';

interface Mail {
  subject: string;
  text: string;
  /** The visitor's address, so the team can answer with "Reply". */
  replyTo: string;
}

/** Collapses line breaks so a visitor-supplied value stays on one line of the subject. */
export function oneLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Sends a plain-text email to the team through Resend. Returns false on any failure. */
export async function sendTeamMail({ subject, text, replyTo }: Mail): Promise<boolean> {
  const to = getEnv('CONTACT_TO_EMAIL');
  const from = getEnv('CONTACT_FROM_EMAIL');
  if (!to || !from) return false;

  return (await resendPost('/emails', { from, to: [to], subject, text, reply_to: replyTo })) === 'ok';
}
