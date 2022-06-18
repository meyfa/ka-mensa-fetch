import axios, { AxiosRequestHeaders } from 'axios'

// CONSTANTS

/**
 * URL of the simplified web view.
 */
const BASE_URL = 'https://www.sw-ka.de/de/hochschulgastronomie/speiseplan/'

/**
 * Conservative request timeout in milliseconds.
 */
const REQUEST_TIMEOUT = 30 * 1000 // 30s

/**
 * Conservative number for maximum response length in bytes.
 */
const REQUEST_MAX_LENGTH = 1024 * 1024 // 1 MiB

// UTILITY METHODS

/**
 * Ensure the given argument is of type 'string', throwing if it isn't.
 *
 * @param data The response data.
 * @returns The same response data, but strongly typed as a string.
 */
function asString (data: unknown): string {
  if (typeof data !== 'string') {
    throw new Error('expected request result to be a string, got ' + typeof data)
  }

  return data
}

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
  const headers: AxiosRequestHeaders = {}
  if (sessionCookie != null && sessionCookie !== '') {
    headers.Cookie = `platoCMS=${sessionCookie}`
  }

  const response = await axios.get(`${BASE_URL}mensa_${canteenId}/`, {
    params: {
      STYLE: 'popup_plain',
      view: 'ok',
      c: canteenId,
      kw: weekId
    },
    headers,
    responseType: 'text',
    // to avoid JSON parsing, which, unfortunately, is not done automatically based on responseType
    transformResponse: res => res,
    timeout: REQUEST_TIMEOUT,
    maxContentLength: REQUEST_MAX_LENGTH
  })

  return asString(response.data)
}
