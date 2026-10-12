import { waitlistEndpoint } from '@/lib/site';

/** Sends the address to Formspree. Resolves `true` when it was accepted. */
export async function joinWaitlist(email: string): Promise<boolean> {
  try {
    const response = await fetch(waitlistEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
