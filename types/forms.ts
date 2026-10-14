/**
 * Why a form submission failed as a whole (not a single field). Each code has its own message in the dictionary.
 * `rateLimited`: too many submissions from this visitor; `unavailable`: the email service failed or is not configured.
 */
export type FormErrorCode = 'rateLimited' | 'unavailable';
