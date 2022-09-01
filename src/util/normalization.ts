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

/**
 * Normalize the given human-readable name (such as canteen name, or line name) for indexing into a lookup Map.
 * This consolidates and trims whitespace and lowercases the name.
 *
 * @param name The human-readable name.
 * @returns The normalized name, potentially less pretty, but also with less entropy.
 */
export function normalizeNameForMatching (name: string): string {
  return mergeWhitespace(name.trim()).toLocaleLowerCase(['de-DE', 'en-US'])
}
