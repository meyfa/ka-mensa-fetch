import fetchSimpleSite from './src/simplesite'
import fetchJSON from './src/jsonapi'
import requestSessionCookie from './src/cookies/request-session-cookie'
import { JsonApiOptions, Options, SimpleSiteOptions } from './src/types/options'
import { CanteenPlan } from './src/types/canteen-plan'

// HELPER FUNCTIONS

/**
 * Convert a string for the source option into normalized form, i.e. to one of the valid source values.
 *
 * @param {?Options} options The options given by the user.
 * @returns {?string} The source value to use.
 */
function resolveSource (options?: Options): 'simplesite' | 'jsonapi' | undefined {
  const source: string = options?.source?.toLowerCase() ?? 'simplesite'
  if (source === 'handicap') return 'simplesite' // <-- backwards compatibility
  if (source === 'simplesite' || source === 'jsonapi') return source
  return undefined
}

// MAIN EXPORT

/**
 * Fetch a set of plans.
 *
 * Options:
 * - source: 'simplesite' (default) or 'jsonapi'.
 * - parallel: whether to run network requests in parallel. Default: false
 *
 * Additional options for 'simplesite' source:
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
async function fetch (options?: Options): Promise<CanteenPlan[]> {
  const source = resolveSource(options)
  if (source == null) {
    throw new Error('options.source invalid')
  }

  const mergedOptions: Options = {
    ...options,
    source
  }

  switch (source) {
    case 'simplesite':
      return await fetchSimpleSite(mergedOptions as SimpleSiteOptions)
    case 'jsonapi':
      return await fetchJSON(mergedOptions as JsonApiOptions)
  }
}

fetch.requestSessionCookie = requestSessionCookie

export = fetch
