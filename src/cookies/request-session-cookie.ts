import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

/**
 * URL to request for obtaining the cookie.
 */
const SITE_URL = 'https://www.sw-ka.de/de/'

/**
 * Conservative request timeout in milliseconds.
 */
const REQUEST_TIMEOUT = 30 * 1000 // 30s

/**
 * The user agent to use.
 *
 * The Studierendenwerk does not set cookies on all user agents, hence a
 * user agent needs to be faked.
 */
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0'

/**
 * The regular expression to use for session cookie extraction.
 *
 * The cookie value will be in group 1.
 */
const COOKIE_REGEXP = /platoCMS=(\w+);/

/**
 * Find the session cookie from the given headers object.
 *
 * @param headers The response headers object.
 * @returns The cookie if present.
 */
function findCookie (headers?: AxiosResponseHeaders | RawAxiosResponseHeaders): string | undefined {
  const setCookie = headers != null ? headers['set-cookie'] : undefined
  if (setCookie == null) {
    return undefined
  }

  const setCookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

  for (const item of setCookieArray) {
    const match = COOKIE_REGEXP.exec(item.toString())
    if (match != null) {
      return match[1]
    }
  }

  return undefined
}

/**
 * Obtain a session cookie from the sw-ka website. The cookie value is returned.
 *
 * @returns Resolves to the session cookie, or undefined on failure.
 */
export async function requestSessionCookie (): Promise<string | undefined> {
  const response = await axios.get(SITE_URL, {
    headers: {
      'User-Agent': USER_AGENT
    },
    timeout: REQUEST_TIMEOUT
  })

  return findCookie(response.headers)
}
