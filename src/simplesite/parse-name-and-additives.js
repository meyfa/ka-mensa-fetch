'use strict'

const mergeWhitespace = require('../util/merge-whitespace')

// CONSTANTS

/**
 * RegExp for separating name and additives list from one another, e.g.
 * "Nasi Goreng (So,Sn,Se,We)".
 * First group: name, second group: comma-separated list of additives.
 *
 * @type {RegExp}
 */
const NAME_ADDITIVES_REGEXP = /^\s*([\s\S]+\S)\s+\(\s*(\w{1,3}(?:\s*,\s*\w{1,3})*)\s*\)\s*$/

// MAIN EXPORT

/**
 * Given a string like "Nasi Goreng (So,Sn,Se,We)", determine the meal name and
 * its additives array (e.g. name: "Nasi Goreng",
 * additives: ["So", "Sn", "Se", "We"]).
 *
 * Where additives cannot be determined, the whole string is treated as the
 * meal name and the additives array will be empty.
 *
 * @param {string} str The string to parse.
 * @returns {object} The resulting name,additives object.
 */
function parseNameAndAdditives (str) {
  const match = str.match(NAME_ADDITIVES_REGEXP)
  if (match) {
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

module.exports = parseNameAndAdditives
