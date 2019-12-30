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
 * The returned object has keys `day` (1..31), `month` (0..11), `year` (...).
 * If invalid input was given, null is returned.
 *
 * @param {String} str String to be parsed.
 * @param {Date} reference The reference date for year guessing.
 * @return {?Object} An object containing integers: day, month, year.
 */
function parseDatestamp(str, reference) {
    const match = str.match(DATE_REGEXP);
    if (!match) {
        return null;
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;

    // plausibility check
    if (day < 1 || day > 31 || month < 0 || month > 11) {
        return null;
    }

    const refYear = reference.getFullYear();
    const refMonth = reference.getMonth();

    // check for "half of year"-overlap, i.e. if both `month` and `refMonth`
    // lie in same 6 month-chunk
    // -> if they do, use reference year
    // -> if not, the given datestamp will probably refer to previous/next year
    let year;
    if (month >= 6) {
        year = refMonth >= 6 ? refYear : refYear - 1;
    } else {
        year = refMonth >= 6 ? refYear + 1 : refYear;
    }

    // JS Date has month run from 0 to 11, inclusive
    return { day, month, year };
}

module.exports = parseDatestamp;
