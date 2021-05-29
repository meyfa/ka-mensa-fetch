import moment, { Moment } from 'moment'
import DateSpec from '../types/date-spec'

type datelike = DateSpec | Date | string | number | Moment

// EXPORTS

/**
 * Get the current calendar week.
 *
 * @returns {number} The current week.
 */
export function getCurrentWeek (): number {
  return moment().isoWeek()
}

/**
 * Check whether the given date can be fetched. A date can be fetched if it is
 * neither too far in the past nor too far in the future.
 *
 * @param {object} date The date to check.
 * @returns {boolean} Whether the date is supported.
 */
export function isDateSupported (date: datelike): boolean {
  const now = moment()
  const m = moment(date)
  // week must not be in the past and not too far in the future
  return m.isSameOrAfter(now, 'isoWeek') as boolean && m.diff(now, 'weeks') <= 6
}

/**
 * Convert an array of date specifications into a Set of calendar week
 * numbers.
 *
 * @param {object[]} dates Array of date specifications.
 * @returns {Set<number>} Week numbers for the given dates.
 */
export function convertToWeeks (dates: datelike[]): Set<number> {
  return new Set(dates.map(d => moment(d).isoWeek()))
}
