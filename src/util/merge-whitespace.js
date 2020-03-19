'use strict'

/**
 * Replace every run of whitespace (at least one whitespace character) with a
 * single space.
 *
 * Effectively treats whitespace the way a browser would.
 *
 * @param {string} str Subject string.
 * @returns {string} The string with all whitespaces merged.
 */
function mergeWhitespace (str) {
  return str.replace(/\s+/g, ' ')
}

module.exports = mergeWhitespace
