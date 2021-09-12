import axios from 'axios'

// CONSTANTS

/**
 * URL of the simplified web view.
 */
const BASE_URL = 'https://www.sw-ka.de/de/essen/'

/**
 * Conservative request timeout in milliseconds.
 */
const REQUEST_TIMEOUT = 30 * 1000 // 30s

/**
 * Conservative number for maximum response length in bytes.
 */
const REQUEST_MAX_LENGTH = 1024 * 1024 // 1 MiB

// MAIN EXPORT

/**
 * Retrieve the HTML view for the given canteen and week id.
 *
 * @param canteenId The canteen, e.g. 'adenauerring' or 'moltke'.
 * @param weekId The week number (1..52).
 * @param sessionCookie Value of the session cookie.
 * @returns Resolves to HTML code on success (unprocessed).
 */
export async function request (canteenId: string, weekId: string | number, sessionCookie?: string): Promise<string> {
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
