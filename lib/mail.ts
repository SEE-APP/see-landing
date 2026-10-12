import 'server-only';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const REQUEST_TIMEOUT_MS = 8000;

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

/** Sends a plain-text email to the team through Resend. Returns false on any failure; nothing is logged. */
export async function sendTeamMail({ subject, text, replyTo }: Mail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, text, reply_to: replyTo }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return response.ok;
  } catch {
    return false;
  }
}
