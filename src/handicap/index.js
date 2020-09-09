'use strict'

const moment = require('moment')

const canteens = require('../../data/canteens.json')
const request = require('./handicap-request')
const parse = require('./handicap-parse')

// CONSTANTS

/**
 * Array of known canteen ids.
 *
 * @type {string[]}
 */
const CANTEEN_IDS = Object.freeze(canteens.map(c => c.id))

// HELPER METHODS

/**
 * Get the current calendar week.
 *
 * @returns {number} The current week.
 */
function getCurrentWeek () {
  return moment().isoWeek()
}

/**
 * Check whether the given date can be fetched. A date can be fetched if it is
 * neither too far in the past nor too far in the future.
 *
 * @param {object} date The date to check.
 * @returns {boolean} Whether the date is supported.
 */
function isDateSupported (date) {
  const now = moment()
  const m = moment(date)
  // week must not be in the past and not too far in the future
  return !m.isBefore(now, 'isoWeek') && now.diff(m, 'weeks') < 10
}

/**
 * Convert an array of date specifications into a Set of calendar week
 * numbers.
 *
 * @param {object[]} dates Array of date specifications.
 * @returns {Set<number>} Week numbers for the given dates.
 */
function convertToWeeks (dates) {
  return new Set(dates.map(d => moment(d).isoWeek()))
}

/**
 * Fetch a single instance of the handicap plan and parse it.
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
 * Fetch a set of plans from the handicap view.
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
