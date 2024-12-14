import axios from 'axios'
import type { AuthConfig } from '../types/options.js'

/**
 * URL of the JSON API general endpoint.
 */
export const METADATA_ENDPOINT = 'https://www.sw-ka.de/en/json_interface/general/'

/**
 * URL of the JSON API canteen endpoint.
 */
export const PLANS_ENDPOINT = 'https://www.sw-ka.de/en/json_interface/canteen/'

/**
 * Conservative request timeout in milliseconds.
 */
const REQUEST_TIMEOUT = 30 * 1000 // 30s

/**
 * Conservative number for maximum response length in bytes.
 */
const REQUEST_MAX_LENGTH = 1024 * 1024 // 1 MiB

/**
 * Ensure the given argument is of type 'object' and is not null, throwing if it isn't.
 *
 * @param data The response data.
 * @returns The same response data, but strongly typed as an object.
 */
function asObject (data: unknown): object {
  if (typeof data !== 'object' || data == null) {
    const actualType = data == null ? 'null' : typeof data
    throw new Error('expected request result to be an object, got ' + actualType)
  }

  return data
}

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

  return asObject(response.data)
}
