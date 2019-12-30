"use strict";

// CONSTANTS

/**
 * RegExp for matching a classifier list e.g. "[VEG,LAB]".
 * First group: comma-separated list of classifiers.
 *
 * @type {RegExp}
 */
const CLASSIFIERS_REGEXP = /^\s*\[([\w,]+)\]\s*$/;


// MAIN EXPORT

/**
 * Parse a classifiers string into its components
 * (e.g. "[VEG,LAB]" into ["VEG", "LAB"]).
 *
 * @param {String} str The classifiers string.
 * @return {String[]} The classifiers array.
 */
function parseClassifiers(str) {
    const match = str.match(CLASSIFIERS_REGEXP);
    if (match) {
        return match[1].split(/\s*,\s*/);
    }
    return [];
}

module.exports = parseClassifiers;
