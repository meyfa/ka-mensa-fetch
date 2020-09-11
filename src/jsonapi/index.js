'use strict'

const request = require('./jsonapi-request')
const parseMetadata = require('./jsonapi-parse-metadata')
const parsePlans = require('./jsonapi-parse-plans')

/**
 * Fetch the JSON API plan and parse it.
 *
 * Options:
 * - auth: object (user, password) for authentication with the API.
 * - parallel: whether to run all network requests in parallel. Default: false
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
  const parallel = options && options.parallel

  const metadataPromise = request(auth, request.METADATA_ENDPOINT)
  if (!parallel) await metadataPromise // synchronize

  const plansJson = await request(auth, request.PLANS_ENDPOINT)

  const reference = new Date()
  const metadata = parseMetadata(await metadataPromise)
  return parsePlans(plansJson, reference, metadata)
}

module.exports = fetch
