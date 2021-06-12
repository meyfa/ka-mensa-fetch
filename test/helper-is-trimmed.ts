/**
 * Checks whether the given string is trimmed, i.e. it is free of any leading or trailing whitespace.
 *
 * @param {string} s The string.
 * @returns {boolean} Whether the string is trimmed.
 */
export default function isTrimmed (s: string): boolean {
  return s.trim() === s
}
