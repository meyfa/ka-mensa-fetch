import { mergeWhitespace } from '../util/normalization.js'

/**
 * RegExp for separating name and additives list from one another, e.g.
 * "Nasi Goreng (So,Sn,Se,We)".
 * First group: name, second group: comma-separated list of additives.
 */
const NAME_ADDITIVES_REGEXP = /^\s*([\s\S]+\S)\s+\(\s*(\w{1,3}(?:\s*,\s*\w{1,3})*)\s*\)\s*$/

/**
 * Given a string like "Nasi Goreng (So,Sn,Se,We)", determine the meal name and
 * its additives array (e.g. name: "Nasi Goreng",
 * additives: ["So", "Sn", "Se", "We"]).
 *
 * Where additives cannot be determined, the whole string is treated as the
 * meal name and the additives array will be empty.
 *
 * @param str The string to parse.
 * @returns The resulting name,additives object.
 */
export function parseNameAndAdditives (str: string): { name: string, additives: string[] } {
  const match = NAME_ADDITIVES_REGEXP.exec(str)
  if (match != null) {
    return {
      name: mergeWhitespace(match[1]),
      additives: match[2].split(/\s*,\s*/)
    }
  }
  return {
    name: mergeWhitespace(str.trim()),
    additives: []
  }
}
