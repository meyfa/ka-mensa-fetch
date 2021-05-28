import axios from 'axios'

// TYPES

interface Headers {
  [key: string]: string | string[]
}

// CONSTANTS

/**
 * URL to request for obtaining the cookie.
 *
 * @type {string}
 */
const SITE_URL = 'https://www.sw-ka.de/de/'

/**
 * Conservative request timeout in milliseconds.
 *
 * @type {number}
 */
const REQUEST_TIMEOUT = 30 * 1000 // 30s

/**
 * The user agent to use.
 *
 * The Studierendenwerk does not set cookies on all user agents, hence a
 * user agent needs to be faked.
 *
 * @type {string}
 */
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0'

/**
 * The regular expression to use for session cookie extraction.
 *
 * The cookie value will be in group 1.
 *
 * @type {RegExp}
 */
const COOKIE_REGEXP = /platoCMS=(\w+);/

// METHODS

/**
 * Find the session cookie from the given headers object.
 *
 * @param {?object} headers The response headers object.
 * @returns {?string} The cookie if present.
 */
function findCookie (headers?: Headers): string | undefined {
  const setCookie = headers != null ? headers['set-cookie'] : undefined
  if (setCookie == null) {
    return undefined
  }

  const setCookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

  for (const item of setCookieArray) {
    const match = item.match(COOKIE_REGEXP)
    if (match != null) {
      return match[1]
    }
  }

  return undefined
}

// MAIN EXPORT

/**
 * Obtain a session cookie from the sw-ka website. The cookie value is returned.
 *
 * @returns {Promise<string|undefined>} Resolves to the session cookie, or undefined on failure.
 */
export default async function requestSessionCookie (): Promise<string | undefined> {
  const response = await axios.get(SITE_URL, {
    headers: {
      'User-Agent': USER_AGENT
    },
    timeout: REQUEST_TIMEOUT
  })

  return findCookie(response.headers)
}
