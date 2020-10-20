'use strict'

const axios = require('axios')

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
 * @returns {string|null} The cookie if present.
 */
function findCookie (headers) {
  const setCookie = headers && headers['set-cookie']
  if (!setCookie) {
    return null
  }

  const setCookieArray = typeof setCookie === 'string'
    ? [setCookie]
    : setCookie

  for (const item of setCookieArray) {
    const match = item.match(COOKIE_REGEXP)
    if (match) {
      return match[1]
    }
  }

  return null
}

// MAIN EXPORT

/**
 * Retrieve the handicap HTML view for the given canteen and week id.
 *
 * @returns {Promise<string>} Resolves to the session cookie, or null on failure.
 */
async function requestSessionCookie () {
  const response = await axios.get(SITE_URL, {
    headers: {
      'User-Agent': USER_AGENT
    },
    timeout: REQUEST_TIMEOUT
  })

  return findCookie(response.headers)
}

module.exports = requestSessionCookie
