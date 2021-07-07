import { datelike } from './date-spec'

/**
 * Fetcher options object. Depending on the value of source, additional options might be available.
 *
 * @see SimpleSiteOptions
 * @see JsonApiOptions
 */
export interface Options {
  parallel?: boolean
}

/**
 * Options object for fetching via 'simplesite' source.
 */
export interface SimpleSiteOptions extends Options {
  canteens?: string[]
  dates?: datelike[]
  sessionCookie?: string
}

/**
 * Options object for fetching via 'jsonapi' source.
 */
export interface JsonApiOptions extends Options {
  // mandatory!
  auth: AuthConfig
}

/**
 * Authentication data for the API.
 */
export interface AuthConfig {
  user: string
  password: string
}
