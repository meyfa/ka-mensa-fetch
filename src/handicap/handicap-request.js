"use strict";

const axios = require("axios");

// CONSTANTS

/**
 * Handicap web view URL.
 * @type {String}
 */
const BASE_URL = "https://www.sw-ka.de/de/essen/";

/**
 * Conservative request timeout in milliseconds.
 * @type {Number}
 */
const REQUEST_TIMEOUT = 30 * 1000; // 30s

/**
 * Conservative number for maximum response length in bytes.
 * @type {Number}
 */
const REQUEST_MAX_LENGTH = 100 * 1024; // 100kiB


// MAIN EXPORT

/**
 * Retrieve the handicap HTML view for the given canteen and week id.
 *
 * @param {String} canteenId The canteen, e.g. "adenauerring" or "moltke".
 * @param {String|Number} weekId The week number (1..52).
 * @return {Promise<String>} Resolves to HTML code on success (unprocessed).
 */
async function request(canteenId, weekId) {
    const response = await axios.get(BASE_URL, {
        params: {
            STYLE: "popup_plain",
            view: "ok",
            c: canteenId,
            kw: weekId,
        },
        timeout: REQUEST_TIMEOUT,
        maxContentLength: REQUEST_MAX_LENGTH,
    });

    return response.data;
}

module.exports = request;
