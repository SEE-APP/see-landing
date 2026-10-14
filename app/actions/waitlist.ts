'use server';

import { isBot, logActionError, read } from '@/lib/server/form-data';
import { takeRateLimit } from '@/lib/server/rate-limit';
import { addWaitlistContact } from '@/lib/server/waitlist';
import { checkEmail } from '@/lib/validation';
import type { WaitlistState } from '@/types/forms';

export async function joinWaitlist(_previous: WaitlistState, formData: FormData): Promise<WaitlistState> {
  if (isBot(formData)) return { status: 'success' };

  const email = read(formData, 'email');
  if (checkEmail(email)) return { status: 'error', error: 'invalid', email };

  try {
    if (!(await takeRateLimit('waitlist'))) return { status: 'error', error: 'rateLimited', email };

    return (await addWaitlistContact(email))
      ? { status: 'success' }
      : { status: 'error', error: 'unavailable', email };
  } catch (error) {
    logActionError('waitlist', error);
    return { status: 'error', error: 'unavailable', email };
  }
}
