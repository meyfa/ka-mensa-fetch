'use strict'

const request = require('./jsonapi-request')
const parse = require('./jsonapi-parse')

/**
 * Fetch the JSON API plan and parse it.
 *
 * @param {object} auth Authentication (user, password) for the API.
 * @returns {Promise<object[]>} Parsed results.
 */
async function fetch (auth) {
  const json = await request(auth)

  return parse(json)
}

module.exports = fetch
