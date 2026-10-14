/** Longest value accepted for each field; also set as `maxLength` on the inputs. */
export const fieldLimits = {
  name: 100,
  email: 254,
  message: 4000,
  timezone: 100,
  notes: 2000,
} as const;

/** Name of the hidden bot-trap field. Not a name autofill recognises (like `website`), so real visitors never fill it. */
export const honeypotField = 'hp_ref';
