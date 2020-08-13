'use strict'

const fetchHandicap = require('./src/handicap')
const fetchJSON = require('./src/jsonapi')
const requestSessionCookie = require('./src/cookies/request-session-cookie')

// MAIN EXPORT

/**
 * Fetch a set of plans.
 *
 * Options:
 * - source: 'handicap' (default) or 'jsonapi'.
 *
 * Additional options for 'handicap' source:
 * - canteens: array of canteen ids. Default: (all)
 * - dates: array of date specifications. Default: (current week)
 * - sessionCookie: optional session cookie
 *
 * Additional options for 'jsonapi' source:
 * - auth: REQUIRED! object (user, password) for authentication with the API.
 *
 * The result is an array containing meal plans.
 *
 * WARNING: The result may contain all, some or none of the plans that were
 * requested. It may also contain additional or even completely different plans.
 * Handle with care.
 *
 * @param {?object} options The fetcher options.
 * @returns {Promise<object[]>} Resolves to a set of meal plans.
 */
async function fetch (options) {
  const source = options && options.source
    ? options.source.toLowerCase()
    : 'handicap'

  switch (source) {
    case 'handicap':
      return fetchHandicap(options)
    case 'jsonapi':
      return fetchJSON(options)
    default:
      throw new Error('unknown source: "' + options.source + '"')
  }
}

module.exports = fetch

module.exports.requestSessionCookie = requestSessionCookie
