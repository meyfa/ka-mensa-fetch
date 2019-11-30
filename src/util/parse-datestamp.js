"use strict";

// CONSTANTS

/**
 * RegExp for parsing date strings of the following form: "Mo 02.12.".
 * First group: day (1..31), second group: month (1..12).
 *
 * @type {RegExp}
 */
const DATE_REGEXP = /^\s*(?:Mo|Di|Mi|Do|Fr|Sa|So)\s*(\d+)\.(\d+)\.\s*$/;


// MAIN EXPORT

/**
 * Parse a datestamp string of the form "Mo 02.12." with respect to a reference
 * date.
 *
 * The returned object has keys `day` (1..31), `month` (1..12), `year` (...).
 *
 * @param {String} str String to be parsed.
 * @param {Date} reference The reference date for year guessing.
 * @return {Object} An object containing integers: day, month, year.
 */
function parseDatestamp(str, reference) {
    const match = str.match(DATE_REGEXP);

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);

    return { day, month, year: reference.getFullYear() };
}

module.exports = parseDatestamp;
