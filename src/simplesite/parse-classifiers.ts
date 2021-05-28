// CONSTANTS

/**
 * RegExp for matching a classifier list e.g. "[VEG,LAB]".
 * First group: comma-separated list of classifiers.
 *
 * @type {RegExp}
 */
const CLASSIFIERS_REGEXP = /^\s*\[([\w,]+)\]\s*$/

// MAIN EXPORT

/**
 * Parse a classifiers string into its components
 * (e.g. "[VEG,LAB]" into ["VEG", "LAB"]).
 *
 * @param {string} str The classifiers string.
 * @returns {string[]} The classifiers array.
 */
export default function parseClassifiers (str: string): string[] {
  const match = str.match(CLASSIFIERS_REGEXP)
  if (match != null) {
    return match[1].split(/\s*,\s*/)
  }
  return []
}
