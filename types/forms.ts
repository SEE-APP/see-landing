/** Why a valid submission could not go through; shared by every form. */
export type FormErrorCode = 'rateLimited' | 'unavailable';

/** Why a waitlist signup failed: `invalid` is a bad address; the rest are shared form errors. */
export type WaitlistErrorCode = 'invalid' | FormErrorCode;

/** What the waitlist Server Action returns. `email` refills the field after an error. */
export interface WaitlistState {
  status: 'idle' | 'success' | 'error';
  error?: WaitlistErrorCode;
  email?: string;
}
