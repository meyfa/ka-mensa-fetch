"use strict";

const request = require("./handicap-request");
const parse = require("./handicap-parse");

/**
 * Fetch the handicap plan and parse it.
 *
 * Options must contain:
 * - canteenId: the canteen plan to fetch (e.g. "adenauerring").
 * - weekId: the week number to fetch (1..52).
 *
 * @param {Object} options The options describing what to fetch.
 * @return {Object[]} Parsed results.
 */
async function fetch(options) {
    const html = await request(options.canteenId, options.weekId);

    return parse(html, options.canteenId);
}

module.exports = fetch;
