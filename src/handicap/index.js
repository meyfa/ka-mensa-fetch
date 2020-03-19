'use strict'

const request = require('./handicap-request')
const parse = require('./handicap-parse')

/**
 * Fetch the handicap plan and parse it.
 *
 * @param {string} canteenId The canteen to fetch.
 * @param {string} weekId The calendar week to fetch.
 * @returns {Promise<object[]>} Parsed results.
 */
async function fetch (canteenId, weekId) {
  const html = await request(canteenId, weekId)

  return parse(html, canteenId)
}

module.exports = fetch
