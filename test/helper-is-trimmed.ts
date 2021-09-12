/**
 * Checks whether the given string is trimmed, i.e. it is free of any leading or trailing whitespace.
 *
 * @param s The string.
 * @returns Whether the string is trimmed.
 */
export function isTrimmed (s: string): boolean {
  return s.trim() === s
}
