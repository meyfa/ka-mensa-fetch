'use strict'

const request = require('./jsonapi-request')
const parse = require('./jsonapi-parse')

/**
 * Fetch the JSON API plan and parse it.
 *
 * Options:
 * - auth: object (user, password) for authentication with the API.
 *
 * @param {object} options The fetcher options.
 * @returns {Promise<object[]>} Parsed results.
 */
async function fetch (options) {
  const auth = options && options.auth
    ? options.auth
    : null

  if (!auth) {
    throw new Error('auth option is required')
  }

  const json = await request(auth)
  return parse(json)
}

module.exports = fetch
