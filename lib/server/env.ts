import 'server-only';

type ServerEnvName = 'RESEND_API_KEY' | 'RESEND_SEGMENT_ID' | 'CONTACT_TO_EMAIL' | 'CONTACT_FROM_EMAIL';

const reported = new Set<ServerEnvName>();

/** Reads a server-only variable. A missing one is logged once per server instance, by name (never by value). */
export function getEnv(name: ServerEnvName): string | null {
  const value = process.env[name]?.trim();
  if (value) return value;

  if (!reported.has(name)) {
    reported.add(name);
    console.error(`[env] ${name} is not set. Add it to .env.local locally or to the Vercel project settings.`);
  }
  return null;
}
