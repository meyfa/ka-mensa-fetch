import axios from 'axios'

import { AuthConfig } from '../types/options'

// CONSTANTS

/**
 * URL of the JSON API general endpoint.
 */
export const METADATA_ENDPOINT = 'https://www.sw-ka.de/json_interface/general/'

/**
 * URL of the JSON API canteen endpoint.
 */
export const PLANS_ENDPOINT = 'https://www.sw-ka.de/json_interface/canteen/'

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
 * Make a request to the specified JSON API endpoint.
 *
 * @param auth Authentication (user, password) for the API.
 * @param endpoint The endpoint (METADATA_ENDPOINT, PLANS_ENDPOINT).
 * @returns Resolves to JSON object on success.
 */
export async function request (auth: AuthConfig, endpoint: string): Promise<object> {
  if (endpoint !== METADATA_ENDPOINT && endpoint !== PLANS_ENDPOINT) {
    throw new Error('invalid endpoint specified')
  }

  const response = await axios.get(endpoint, {
    auth: {
      username: auth.user,
      password: auth.password
    },
    timeout: REQUEST_TIMEOUT,
    maxContentLength: REQUEST_MAX_LENGTH
  })

  return response.data
}
