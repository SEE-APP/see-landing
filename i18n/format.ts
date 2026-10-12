/** Fills `{key}` placeholders: format('{name} on LinkedIn', { name: 'Nika' }). */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
