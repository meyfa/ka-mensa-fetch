import DateSpec from './date-spec'

/**
 * Fetcher options object. Depending on the value of source, additional options might be available.
 *
 * @see SimpleSiteOptions
 * @see JsonApiOptions
 */
export interface Options {
  source: 'simplesite' | 'jsonapi'
  parallel?: boolean
}

/**
 * Options object for fetching via 'simplesite' source.
 */
export interface SimpleSiteOptions extends Options {
  source: 'simplesite'
  canteens?: string[]
  dates?: Array<DateSpec | Date | string | number>
  sessionCookie?: string
}

/**
 * Options object for fetching via 'jsonapi' source.
 */
export interface JsonApiOptions extends Options {
  source: 'jsonapi'
  auth: AuthConfig
}

/**
 * Authentication data for the API.
 */
export interface AuthConfig {
  user: string
  password: string
}
