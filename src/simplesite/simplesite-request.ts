import axios from 'axios'

// CONSTANTS

/**
 * Handicap web view URL.
 *
 * @type {string}
 */
const BASE_URL = 'https://www.sw-ka.de/de/essen/'

/**
 * Conservative request timeout in milliseconds.
 *
 * @type {number}
 */
const REQUEST_TIMEOUT = 30 * 1000 // 30s

/**
 * Conservative number for maximum response length in bytes.
 *
 * @type {number}
 */
const REQUEST_MAX_LENGTH = 1024 * 1024 // 1 MiB

// MAIN EXPORT

/**
 * Retrieve the HTML view for the given canteen and week id.
 *
 * @param {string} canteenId The canteen, e.g. 'adenauerring' or 'moltke'.
 * @param {string|number} weekId The week number (1..52).
 * @param {?string} sessionCookie Value of the session cookie.
 * @returns {Promise<string>} Resolves to HTML code on success (unprocessed).
 */
export default async function request (canteenId: string, weekId: string | number, sessionCookie?: string): Promise<string> {
  const headers = {
    Cookie: sessionCookie != null && sessionCookie !== '' ? `platoCMS=${sessionCookie}` : undefined
  }

  const response = await axios.get(BASE_URL, {
    params: {
      STYLE: 'popup_plain',
      view: 'ok',
      c: canteenId,
      kw: weekId
    },
    headers,
    timeout: REQUEST_TIMEOUT,
    maxContentLength: REQUEST_MAX_LENGTH
  })

  return response.data
}
