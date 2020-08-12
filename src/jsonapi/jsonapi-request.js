'use strict'

const axios = require('axios')

// CONSTANTS

/**
 * URL of the JSON API canteen endpoint.
 *
 * @type {string}
 */
const CANTEEN_URL = 'https://www.sw-ka.de/json_interface/canteen/'

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
 * Retrieve the current JSON data for all canteens.
 *
 * @param {object} auth Authentication (user, password) for the API.
 * @returns {Promise<string>} Resolves to HTML code on success (unprocessed).
 */
async function request (auth) {
  const response = await axios.get(CANTEEN_URL, {
    auth: {
      username: auth.user,
      password: auth.password
    },
    timeout: REQUEST_TIMEOUT,
    maxContentLength: REQUEST_MAX_LENGTH
  })

  return response.data
}

module.exports = request
