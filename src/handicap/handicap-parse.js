"use strict";

const cheerio = require("cheerio");

const canteens = require("../../data/canteens.json");
const mergeWhitespace = require("../util/merge-whitespace");
const parseDatestamp = require("../util/parse-datestamp");


// CONSTANTS

/**
 * RegExp for matching a classifier list e.g. "[VEG,LAB]".
 * First group: comma-separated list of classifiers.
 *
 * @type {RegExp}
 */
const CLASSIFIERS_REGEXP = /^\s*\[([\w,]+)\]\s*$/;

/**
 * RegExp for separating name and additives list from one another, e.g.
 * "Nasi Goreng (So,Sn,Se,We)".
 * First group: name, second group: comma-separated list of additives.
 *
 * @type {RegExp}
 */
const NAME_ADDITIVES_REGEXP = /^\s*([\s\S]+\S)\s+\((\w{1,3}(?:,\w{1,3})*)\)\s*$/;

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


// METHODS

/**
 * Given a day-specific table, parse all lines contents.
 *
 * @param {Object} $ Cheerio reference.
 * @param {Object} $table The table containing line info.
 * @param {String} canteenId The id of the canteen currently being parsed.
 * @return {Object[]} Parsed line contents.
 */
function parseLines($, $table, canteenId) {
    const lines = [];

    const $rows = $table.children("tbody").children("tr");
    $rows.each((_, el) => {
        const $row = $(el);
        if ($row.children().length === 2) {
            lines.push(parseLine($, $row, canteenId));
        }
    });

    return lines;
}

/**
 * Parse a single line. The result is an object containing `name`, `meals`.
 *
 * @param {Object} $ Cheerio reference.
 * @param {Object} $row The table row containing the line.
 * @param {String} canteenId The id of the canteen currently being parsed.
 * @return {Object} Parsed line content.
 */
function parseLine($, $row, canteenId) {
    const $cells = $row.children();

    // replace <br> in name with newlines (cheerio issue #839)
    // (important for "[pizza]Werk<br>Pizza" etc.)
    $cells.eq(0).find("br").replaceWith("\n");

    const name = mergeWhitespace($cells.eq(0).text());
    // resolve id from name
    const id = LINE_IDS_MAPPING[canteenId]
        ? LINE_IDS_MAPPING[canteenId][name] || null : null;

    const $mealsTable = $cells.eq(1).children("table");
    if ($mealsTable.length === 1) {
        const meals = parseMeals($, $mealsTable);
        return { id, name, meals };
    }

    return { id, name, meals: [] };
}

/**
 * Parse meal info from the day-and-line-specific table.
 *
 * @param {Object} $ Cheerio reference.
 * @param {Object} $table The table containing all meals for the line.
 * @return {Object[]} Parsed meals.
 */
function parseMeals($, $table) {
    const meals = [];

    const $rows = $table.children("tbody").children("tr");
    $rows.each((_, el) => {
        const $row = $(el);
        if ($row.children().length === 3) {
            meals.push(parseMeal($, $row));
        }
    });

    return meals;
}

/**
 * Parse a single meal. The result is an object containing `name`, `price`,
 * `classifiers` and `additives`.
 *
 * @param {Object} $ Cheerio reference.
 * @param {Object} $row The table row containing the meal.
 * @return {Object} Parsed meal object.
 */
function parseMeal($, $row) {
    const $cells = $row.children();

    const classifiers = parseClassifiers($cells.eq(0).text());
    const { name, additives } = parseNameAndAdditives($cells.eq(1).text());
    const price = $cells.eq(2).text().trim();

    return { name, price, classifiers, additives };
}

/**
 * Parse a classifiers string (e.g. "[VEG,LAB]" parsed into ["VEG", "LAB"]).
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

/**
 * Given a string like "Nasi Goreng (So,Sn,Se,We)", determine the meal name and
 * its additives array (e.g. name: "Nasi Goreng",
 * additives: ["So", "Sn", "Se", "We"]).
 *
 * Where additives cannot be determined, the whole string is treated as the
 * meal name and the additives array will be empty.
 *
 * @param {String} str The string to parse.
 * @return {Object} The resulting name,additives object.
 */
function parseNameAndAdditives(str) {
    const match = str.match(NAME_ADDITIVES_REGEXP);
    if (match) {
        return {
            name: mergeWhitespace(match[1]),
            additives: match[2].split(/\s*,\s*/),
        };
    }
    return {
        name: mergeWhitespace(str.trim()),
        additives: [],
    };
}


// MAIN EXPORT

/**
 * Parse the given HTML for the given canteen id. Returns an array of objects
 * of the following form:
 *
 * - id: canteen id
 * - name: canteen name
 * - date: date of meal plan
 * - lines: array describing lines and their meals
 *
 * The array entries differ only by their date and the lines array, i.e. canteen
 * is fixed.
 *
 * @param {String} html The HTML string to parse.
 * @param {String} canteenId [description]
 * @return {Object[]} The parse results.
 */
function parse(html, canteenId) {
    const $ = cheerio.load(html);

    // canteen name is stored in first <h1>
    const canteenName = $("h1").first().text();

    const results = [];

    // remaining <h1> elements store plan dates
    $("h1").slice(1, 6).each((_, el) => {
        const dateElement = $(el);
        const date = parseDatestamp(dateElement.text(), new Date());

        const tableElement = dateElement.next("table");
        const lines = parseLines($, tableElement, canteenId);

        results.push({
            id: canteenId,
            name: canteenName,
            date: date,
            lines: lines,
        });
    });

    return results;
}

module.exports = parse;
