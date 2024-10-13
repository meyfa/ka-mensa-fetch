/**
 * RegExp for matching a classifier list e.g. "[VEG,LAB]".
 * First group: comma-separated list of classifiers.
 */
const CLASSIFIERS_REGEXP = /^\s*\[([\w,]+)\]\s*$/

/**
 * Parse a classifiers string into its components
 * (e.g. "[VEG,LAB]" into ["VEG", "LAB"]).
 *
 * @param str The classifiers string.
 * @returns The classifiers array.
 */
export function parseClassifiers (str: string): string[] {
  const match = CLASSIFIERS_REGEXP.exec(str)
  if (match != null) {
    return match[1].split(/\s*,\s*/)
  }
  return []
}
