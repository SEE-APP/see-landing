import 'server-only';
import { honeypotField } from '@/lib/content/contact';

export function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

/** Real visitors never see the honeypot field; bots fill it. */
export function isBot(formData: FormData): boolean {
  return read(formData, honeypotField) !== '';
}
