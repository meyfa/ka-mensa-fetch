'use strict'

const moment = require('moment')

// EXPORTS

/**
 * Get the current calendar week.
 *
 * @returns {number} The current week.
 */
function getCurrentWeek () {
  return moment().isoWeek()
}

/**
 * Check whether the given date can be fetched. A date can be fetched if it is
 * neither too far in the past nor too far in the future.
 *
 * @param {object} date The date to check.
 * @returns {boolean} Whether the date is supported.
 */
function isDateSupported (date) {
  const now = moment()
  const m = moment(date)
  // week must not be in the past and not too far in the future
  return !m.isBefore(now, 'isoWeek') && m.diff(now, 'weeks') <= 6
}

/**
 * Convert an array of date specifications into a Set of calendar week
 * numbers.
 *
 * @param {object[]} dates Array of date specifications.
 * @returns {Set<number>} Week numbers for the given dates.
 */
function convertToWeeks (dates) {
  return new Set(dates.map(d => moment(d).isoWeek()))
}

module.exports = {
  getCurrentWeek,
  isDateSupported,
  convertToWeeks
}
