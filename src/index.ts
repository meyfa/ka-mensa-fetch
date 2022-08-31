import { fetch as fetchSimpleSite } from './simplesite/index.js'
import { fetch as fetchJson } from './jsonapi/index.js'
import { JsonApiOptions, Options, SimpleSiteOptions } from './types/options.js'
import { CanteenPlan } from './types/canteen-plan.js'

/**
 * Convert a string for the source option into normalized form, i.e. to one of the valid source values.
 *
 * @param source The source value passed by the user.
 * @returns The source value to use.
 */
function resolveSource (source: 'simplesite' | 'jsonapi' | undefined): 'simplesite' | 'jsonapi' | undefined {
  // Note that with TypeScript, this is completely unneeded. We keep it here for JavaScript users.
  const normalized: string = source?.toLowerCase() ?? 'simplesite'
  if (normalized === 'simplesite' || normalized === 'jsonapi') return normalized
  return undefined
}

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
 * @param source Where to fetch from ('simplesite' or 'jsonapi'). Default is 'simplesite'.
 * @param options The fetcher options.
 * @returns Resolves to a set of meal plans.
 */
export async function fetchMensa (source: 'simplesite' | 'jsonapi' = 'simplesite', options?: Options): Promise<CanteenPlan[]> {
  const resolvedSource = resolveSource(source)
  if (resolvedSource == null) {
    throw new Error('invalid source given')
  }

  switch (resolvedSource) {
    case 'simplesite':
      return await fetchSimpleSite(options as SimpleSiteOptions)
    case 'jsonapi':
      return await fetchJson(options as JsonApiOptions)
  }
}

// re-export session cookie function
export { requestSessionCookie } from './cookies/request-session-cookie.js'

// re-export types
export { Line, Canteen } from './types/canteen.js'
export { LegendItem } from './types/legend.js'
export { CanteenPlan, CanteenLine, CanteenMeal } from './types/canteen-plan.js'
export { DateSpec, datelike } from './types/date-spec.js'
export { Options, SimpleSiteOptions, JsonApiOptions, AuthConfig } from './types/options.js'

// re-export data
export { canteens } from './data/canteens.js'
export { legend } from './data/legend.js'
