import 'server-only';

export type ServerEnvName = 'RESEND_API_KEY' | 'RESEND_SEGMENT_ID' | 'CONTACT_TO_EMAIL' | 'CONTACT_FROM_EMAIL';

const warned = new Set<ServerEnvName>();

/** Reads a server-only variable. In development a missing one is reported once by name (never by value). */
export function getEnv(name: ServerEnvName): string | null {
  const value = process.env[name]?.trim();
  if (value) return value;

  if (process.env.NODE_ENV === 'development' && !warned.has(name)) {
    warned.add(name);
    console.warn(`[env] ${name} is not set. Add it to .env.local (see .env.example).`);
  }
  return null;
}
