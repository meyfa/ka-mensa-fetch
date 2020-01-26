"use strict";

const moment = require("moment");

const fetchHandicap = require("./src/handicap");
const canteens = require("./data/canteens.json");


// CONSTANTS

/**
 * Array of known canteen ids.
 * @type {String[]}
 */
const CANTEEN_IDS = Object.freeze(canteens.map(c => c.id));


// HELPER METHODS

/**
 * Get the current calendar week.
 *
 * @return {Number} The current week.
 */
function getCurrentWeek() {
    return moment().isoWeek();
}

/**
 * Check whether the given date can be fetched. A date can be fetched if it is
 * neither too far in the past nor too far in the future.
 *
 * @param {Object} date The date to check.
 * @return {Boolean} Whether the date is supported.
 */
function isDateSupported(date) {
    const now = moment();
    const m = moment(date);
    // week must not be in the past and not too far in the future
    return !m.isBefore(now, "isoWeek") && now.diff(m, "weeks") < 10;
}

/**
 * Convert an array of date specifications into a Set of calendar week
 * numbers.
 *
 * @param {Object[]} dates Array of date specifications.
 * @return {Set<Number>} Week numbers for the given dates.
 */
function convertToWeeks(dates) {
    return new Set(dates.map(d => moment(d).isoWeek()));
}


// MAIN EXPORT

/**
 * Fetch a set of plans.
 *
 * Options:
 * - canteens: array of canteen ids. Default: (all)
 * - dates: array of date specifications. Default: (current week)
 *
 * The result is an array containing meal plans.
 *
 * WARNING: The result may contain all, some or none of the plans that were
 * requested. It may also contain additional or even completely different plans.
 * Handle with care.
 *
 * @param {?Object} options The fetcher options.
 * @return {Promise<Object[]>} Resolves to a set of meal plans.
 */
async function fetch(options) {
    const ids = options && options.canteens
        ? options.canteens
        : CANTEEN_IDS;
    const weeks = options && options.dates
        ? convertToWeeks(options.dates.filter(isDateSupported))
        : [getCurrentWeek()];

    let combinedResults = [];

    for (const week of weeks) {
        for (const id of ids) {
            const results = await fetchHandicap(id, week);
            combinedResults.push(...results);
        }
    }

    return combinedResults;
}

module.exports = fetch;
