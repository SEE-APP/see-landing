import 'server-only';
import { getEnv } from '@/lib/server/env';
import { resendPost } from '@/lib/server/resend';

/**
 * Adds the address to the waitlist segment in Resend. If creating the contact is rejected (for example an
 * existing contact Resend won't recreate), it falls back to adding that contact to the segment.
 */
export async function addWaitlistContact(email: string): Promise<boolean> {
  const segmentId = getEnv('RESEND_SEGMENT_ID');
  if (!segmentId) return false;

  const created = await resendPost('/contacts', { email, unsubscribed: false, segments: [{ id: segmentId }] });
  if (created !== 'rejected') return created === 'ok';

  const added = await resendPost(`/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`);
  return added === 'ok';
}
