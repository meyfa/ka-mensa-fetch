"use strict";

const request = require("./handicap-request");
const parse = require("./handicap-parse");

/**
 * Fetch the handicap plan and parse it.
 *
 * @param {String} canteenId The canteen to fetch.
 * @param {String} weekId The calendar week to fetch.
 * @return {Promise<Object[]>} Parsed results.
 */
async function fetch(canteenId, weekId) {
    const html = await request(canteenId, weekId);

    return parse(html, canteenId);
}

module.exports = fetch;
