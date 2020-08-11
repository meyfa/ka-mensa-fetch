'use strict'

const cheerio = require('cheerio')

const mergeWhitespace = require('../util/merge-whitespace')

const parseDatestamp = require('./parse-datestamp')
const parseClassifiers = require('./parse-classifiers')
const parseNameAndAdditives = require('./parse-name-and-additives')

const matchLineName = require('./match-line-name')

// METHODS

/**
 * Given a day-specific table, parse all lines contents.
 *
 * @param {object} $ Cheerio reference.
 * @param {object} $table The table containing line info.
 * @param {string} canteenId The id of the canteen currently being parsed.
 * @returns {object[]} Parsed line contents.
 */
function parseLines ($, $table, canteenId) {
  const $rows = $table.children('tbody').children('tr')
  return $rows.map((_, el) => parseLine($, $(el), canteenId)).get()
}

/**
 * Parse a single line. The result is an object containing `name`, `meals`.
 *
 * Returns null if unexpected content is encountered.
 *
 * @param {object} $ Cheerio reference.
 * @param {object} $row The table row containing the line.
 * @param {string} canteenId The id of the canteen currently being parsed.
 * @returns {?object} Parsed line content.
 */
function parseLine ($, $row, canteenId) {
  const $cells = $row.children()
  if ($cells.length !== 2) {
    return null
  }

  // replace <br> in name with newlines (cheerio issue #839)
  // (important for "[pizza]Werk<br>Pizza" etc.)
  $cells.eq(0).find('br').replaceWith('\n')

  const name = mergeWhitespace($cells.eq(0).text())
  const id = matchLineName(canteenId, name)

  const $mealsTable = $cells.eq(1).children('table')
  if ($mealsTable.length === 1) {
    const meals = parseMeals($, $mealsTable)
    return { id, name, meals }
  }

  return { id, name, meals: [] }
}

/**
 * Parse meal info from the day-and-line-specific table.
 *
 * @param {object} $ Cheerio reference.
 * @param {object} $table The table containing all meals for the line.
 * @returns {object[]} Parsed meals.
 */
function parseMeals ($, $table) {
  const $rows = $table.children('tbody').children('tr')
  return $rows.map((_, el) => parseMeal($, $(el))).get()
}

/**
 * Parse a single meal. The result is an object containing `name`, `price`,
 * `classifiers` and `additives`.
 *
 * Returns null if unexpected content is encountered.
 *
 * @param {object} $ Cheerio reference.
 * @param {object} $row The table row containing the meal.
 * @returns {?object} Parsed meal object.
 */
function parseMeal ($, $row) {
  const $cells = $row.children()
  if ($cells.length !== 3) {
    return null
  }

  const classifiers = parseClassifiers($cells.eq(0).text())
  const { name, additives } = parseNameAndAdditives($cells.eq(1).text())
  const price = $cells.eq(2).text().trim()

  return { name, price, classifiers, additives }
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
 * @param {string} html The HTML string to parse.
 * @param {string} canteenId The canteen id, e.g. 'adenauerring'.
 * @param {Date} referenceDate The date of plan acquisition, for reference.
 * @returns {object[]} The parse results.
 */
function parse (html, canteenId, referenceDate) {
  const $ = cheerio.load(html)
  const $titles = $('h1')

  // canteen name is stored in first <h1>
  const canteenName = $titles.first().text()

  // remaining <h1> elements store plan dates
  return $titles.slice(1, 6).map((_, el) => {
    const dateElement = $(el)
    const date = parseDatestamp(dateElement.text(), referenceDate)
    if (date) {
      return {
        id: canteenId,
        name: canteenName,
        date: date,
        lines: parseLines($, dateElement.next('table'), canteenId)
      }
    }
  }).get()
}

module.exports = parse
