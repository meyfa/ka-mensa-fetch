"use strict";

const axios = require("axios");

const BASE_URL = "https://www.sw-ka.de/de/essen/";

/**
 * Retrieve the handicap HTML view for the given canteen and week id.
 *
 * @param {String} canteenId The canteen, e.g. "adenauerring" or "moltke".
 * @param {String|Number} weekId The week number (1..52).
 * @return {Promise} Resolves to HTML code on success (completely unprocessed).
 */
async function request(canteenId, weekId) {
    const response = await axios.get(BASE_URL, {
        params: {
            STYLE: "popup_plain",
            view: "ok",
            c: canteenId,
            kw: weekId,
        },
    });

    return response.data;
}

module.exports = request;
