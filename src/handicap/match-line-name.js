"use strict";

const canteens = require("../../data/canteens.json");


// CONSTANTS

/**
 * An object mapping canteen ids to objects mapping line names to line ids for
 * backwards resolution.
 *
 * @type {Object}
 */
const LINE_IDS_MAPPING = (() => {
    const mapping = {};
    for (const canteen of canteens) {
        const lineMapping = {};
        for (const line of canteen.lines) {
            lineMapping[line.name] = line.id;
        }
        mapping[canteen.id] = Object.freeze(lineMapping);
    }
    return Object.freeze(mapping);
})();


// MAIN EXPORT

/**
 * Match a line name for the given canteen, determining its id.
 *
 * Returns null if the canteen id is invalid or the line could not be matched.
 *
 * @param {String} canteenId The id of the canteen.
 * @param {String} name The human-readable line name.
 * @return {?String} The line id.
 */
function matchLineName(canteenId, name) {
    // sanity check canteenId
    if (!LINE_IDS_MAPPING[canteenId]) {
        return null;
    }
    // sanitize and lookup
    const id = LINE_IDS_MAPPING[canteenId][name.trim()];
    return id || null;
}

module.exports = matchLineName;
