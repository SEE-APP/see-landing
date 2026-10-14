import 'server-only';
import { getEnv } from '@/lib/server/env';
import { resendPost } from '@/lib/server/resend';

/**
 * Adds the address to the waitlist segment in Resend. Creating a contact that already exists fails,
 * so that case falls back to adding the existing contact to the segment: signing up twice still succeeds.
 */
export async function addWaitlistContact(email: string): Promise<boolean> {
  const segmentId = getEnv('RESEND_SEGMENT_ID');
  if (!segmentId) return false;

  const created = await resendPost('/contacts', { email, unsubscribed: false, segments: [{ id: segmentId }] });
  if (created?.ok) return true;
  if (!created) return false;

  const added = await resendPost(`/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`);
  return added?.ok ?? false;
}
