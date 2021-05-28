import request, { METADATA_ENDPOINT, PLANS_ENDPOINT } from './jsonapi-request'
import parseMetadata from './jsonapi-parse-metadata'
import parsePlans from './jsonapi-parse-plans'
import { JsonApiOptions } from '../types/options'
import { CanteenPlan } from '../types/canteen-plan'

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
export default async function fetch (options: JsonApiOptions): Promise<CanteenPlan[]> {
  const auth = options?.auth
  if (auth == null) {
    throw new Error('auth option is required')
  }
  const parallel = options?.parallel ?? false

  const metadataPromise = request(auth, METADATA_ENDPOINT)
  if (!parallel) await metadataPromise // synchronize

  const plansJson = await request(auth, PLANS_ENDPOINT)

  const reference = new Date()
  const metadata = parseMetadata(await metadataPromise)
  return parsePlans(plansJson, reference, metadata)
}
