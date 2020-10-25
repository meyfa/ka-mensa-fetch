'use strict'

const canteens = require('../../data/canteens.json')
const request = require('./simplesite-request')
const parse = require('./simplesite-parse')

const {
  getCurrentWeek,
  isDateSupported,
  convertToWeeks
} = require('./simplesite-date-util')

// CONSTANTS

/**
 * Array of known canteen ids.
 *
 * @type {string[]}
 */
const CANTEEN_IDS = Object.freeze(canteens.map(c => c.id))

// HELPER METHODS

/**
 * Fetch a single instance of the plan and parse it.
 *
 * @param {string} canteenId The canteen to fetch.
 * @param {string} weekId The calendar week to fetch.
 * @param {?string} sessionCookie Value of the session cookie.
 * @returns {Promise<object[]>} Parsed results.
 */
async function fetchSingle (canteenId, weekId, sessionCookie) {
  const html = await request(canteenId, weekId, sessionCookie)
  const reference = new Date()

  return parse(html, canteenId, reference)
}

// MAIN EXPORT

/**
 * Fetch a set of plans from the simple web view.
 *
 * Options:
 * - canteens: array of canteen ids. Default: (all)
 * - dates: array of date specifications. Default: (current week)
 * - sessionCookie: optional session cookie. Default: null
 * - parallel: whether to run all network requests in parallel. Default: false
 *
 * @param {?object} options The fetcher options.
 * @returns {Promise<object[]>} Parsed results.
 */
async function fetch (options) {
  const ids = options && options.canteens
    ? options.canteens
    : CANTEEN_IDS
  const weeks = options && options.dates
    ? convertToWeeks(options.dates.filter(isDateSupported))
    : [getCurrentWeek()]
  const sessionCookie = options && options.sessionCookie
    ? options.sessionCookie
    : null
  const parallel = options && options.parallel

  const promises = []

  for (const week of weeks) {
    for (const id of ids) {
      const promise = fetchSingle(id, week, sessionCookie)
      promises.push(promise)
      if (!parallel) await promise // synchronize
    }
  }

  // TODO: replace with Array.protoype.flat once Node 10 is EOL
  return [].concat(...(await Promise.all(promises)))
}

module.exports = fetch
