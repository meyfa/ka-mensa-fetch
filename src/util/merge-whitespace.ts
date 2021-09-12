/**
 * Replace every run of whitespace (at least one whitespace character) with a
 * single space.
 *
 * Effectively treats whitespace the way a browser would.
 *
 * @param str Subject string.
 * @returns The string with all whitespaces merged.
 */
export function mergeWhitespace (str: string): string {
  return str.replace(/\s+/g, ' ')
}
