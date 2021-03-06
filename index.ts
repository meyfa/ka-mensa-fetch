import { fetch as fetchSimpleSite } from './src/simplesite'
import { fetch as fetchJson } from './src/jsonapi'
import { JsonApiOptions, Options, SimpleSiteOptions } from './src/types/options'
import { CanteenPlan } from './src/types/canteen-plan'

// HELPER FUNCTIONS

/**
 * Convert a string for the source option into normalized form, i.e. to one of the valid source values.
 *
 * @param {?string} source The source value passed by the user.
 * @returns {?string} The source value to use.
 */
function resolveSource (source: 'simplesite' | 'jsonapi' | undefined): 'simplesite' | 'jsonapi' | undefined {
  // Note that with TypeScript, this is completely unneeded. We keep it here for JavaScript users.
  const normalized: string = source?.toLowerCase() ?? 'simplesite'
  if (normalized === 'simplesite' || normalized === 'jsonapi') return normalized
  return undefined
}

// MAIN EXPORT

// undefined source: use simplesite
export async function fetchMensa (): Promise<CanteenPlan[]>
export async function fetchMensa (source: undefined, options?: SimpleSiteOptions): Promise<CanteenPlan[]>

// for simplesite, options are indeed optional
export async function fetchMensa (source: 'simplesite', options?: SimpleSiteOptions): Promise<CanteenPlan[]>

// for jsonapi, options are mandatory due to auth property
export async function fetchMensa (source: 'jsonapi', options: JsonApiOptions): Promise<CanteenPlan[]>

/**
 * Fetch a set of plans. If no source is specified, 'simplesite' will be used.
 * Options can be provided.
 *
 * General options include:
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
 * @param {string} source Where to fetch from ('simplesite' or 'jsonapi'). Default is 'simplesite'.
 * @param {?object} options The fetcher options.
 * @returns {Promise<object[]>} Resolves to a set of meal plans.
 */
export async function fetchMensa (source: 'simplesite' | 'jsonapi' = 'simplesite', options?: Options): Promise<CanteenPlan[]> {
  const resolvedSource = resolveSource(source)
  if (resolvedSource == null) {
    throw new Error('invalid source given')
  }

  switch (resolvedSource) {
    case 'simplesite':
      return fetchSimpleSite(options as SimpleSiteOptions)
    case 'jsonapi':
      return fetchJson(options as JsonApiOptions)
  }
}

// re-export session cookie function
export { requestSessionCookie } from './src/cookies/request-session-cookie'

// re-export types
export { Line, Canteen } from './src/types/canteen'
export { LegendItem } from './src/types/legend'
export { CanteenPlan, CanteenLine, CanteenMeal } from './src/types/canteen-plan'
export { DateSpec, datelike } from './src/types/date-spec'
export { Options, SimpleSiteOptions, JsonApiOptions, AuthConfig } from './src/types/options'
