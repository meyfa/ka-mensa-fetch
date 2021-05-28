import fetchSimpleSite from './src/simplesite'
import fetchJSON from './src/jsonapi'
import requestSessionCookie from './src/cookies/request-session-cookie'

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
async function fetch (options?: any): Promise<object[]> {
  const source: string = options?.source?.toLowerCase() ?? 'simplesite'

  switch (source) {
    case 'handicap': // <-- backwards compatibility (same as 'simplesite')
    case 'simplesite':
      return await fetchSimpleSite(options)
    case 'jsonapi':
      return await fetchJSON(options)
    default:
      throw new Error(`unknown source: "${source}"`)
  }
}

fetch.requestSessionCookie = requestSessionCookie

export = fetch
