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

    const refYear = reference.getFullYear();
    // JS Date has month run from 0 to 11, inclusive
    const refMonth = reference.getMonth() + 1;

    // check for "half of year"-overlap, i.e. if both `month` and `refMonth`
    // lie in same 6 month-chunk
    // -> if they do, use reference year
    // -> if not, the given datestamp will probably refer to previous/next year
    let year;
    if (month >= 7) {
        year = refMonth >= 7 ? refYear : refYear - 1;
    } else {
        year = refMonth >= 7 ? refYear + 1 : refYear;
    }

    return { day, month, year };
}

module.exports = parseDatestamp;
