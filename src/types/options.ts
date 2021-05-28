import DateSpec from './date-spec'

export interface Options {
  source: 'simplesite' | 'jsonapi'
  parallel?: boolean
}

export interface SimpleSiteOptions extends Options {
  source: 'simplesite'
  canteens?: string[]
  dates?: Array<DateSpec | Date | string | number>
  sessionCookie?: string
}

export interface JsonApiOptions extends Options {
  source: 'jsonapi'
  auth: AuthConfig
}

export interface AuthConfig {
  user: string
  password: string
}
