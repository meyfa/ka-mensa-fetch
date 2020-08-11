'use strict'

const request = require('./handicap-request')
const parse = require('./handicap-parse')

/**
 * Fetch the handicap plan and parse it.
 *
 * @param {string} canteenId The canteen to fetch.
 * @param {string} weekId The calendar week to fetch.
 * @param {?string} sessionCookie Value of the session cookie.
 * @returns {Promise<object[]>} Parsed results.
 */
async function fetch (canteenId, weekId, sessionCookie) {
  const html = await request(canteenId, weekId, sessionCookie)
  const reference = new Date()

  return parse(html, canteenId, reference)
}

module.exports = fetch
