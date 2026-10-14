'use server';

import { fieldLimits } from '@/lib/content/contact';
import { isBot, read } from '@/lib/server/form-data';
import { addWaitlistContact } from '@/lib/server/waitlist';
import { isValidEmail } from '@/lib/validation';
import type { WaitlistState } from '@/types/sections';

export async function joinWaitlist(_previous: WaitlistState, formData: FormData): Promise<WaitlistState> {
  if (isBot(formData)) return { status: 'success' };

  const email = read(formData, 'email');
  if (email.length > fieldLimits.email || !isValidEmail(email)) return { status: 'error', email };

  return (await addWaitlistContact(email)) ? { status: 'success' } : { status: 'error', email };
}
