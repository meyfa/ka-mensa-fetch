import { METADATA_ENDPOINT, PLANS_ENDPOINT, request } from './jsonapi-request.js'
import { parseMetadata } from './jsonapi-parse-metadata.js'
import { parsePlans } from './jsonapi-parse-plans.js'
import { JsonApiOptions } from '../types/options.js'
import { CanteenPlan } from '../types/canteen-plan.js'

/**
 * Fetch the JSON API plan and parse it.
 *
 * Options:
 * - auth: object (user, password) for authentication with the API.
 * - parallel: whether to run all network requests in parallel. Default: false
 *
 * @param options The fetcher options.
 * @returns Parsed results.
 */
export async function fetch (options: JsonApiOptions): Promise<CanteenPlan[]> {
  const auth = options.auth
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (auth == null) {
    throw new Error('auth option is required')
  }
  const parallel = options.parallel ?? false

  const metadataPromise = request(auth, METADATA_ENDPOINT)
  if (!parallel) await metadataPromise // synchronize

  const plansJson = await request(auth, PLANS_ENDPOINT)

  const reference = new Date()
  const metadata = parseMetadata(await metadataPromise)
  return parsePlans(plansJson, reference, metadata)
}
