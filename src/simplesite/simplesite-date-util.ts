import moment from 'moment'
import type { datelike } from '../types/date-spec.js'

/**
 * Get the current calendar week.
 *
 * @returns The current week.
 */
export function getCurrentWeek (): number {
  return moment().isoWeek()
}

/**
 * Check whether the given date can be fetched. A date can be fetched if it is
 * neither too far in the past nor too far in the future.
 *
 * @param date The date to check.
 * @returns Whether the date is supported.
 */
export function isDateSupported (date: datelike): boolean {
  const now = moment()
  const m = moment(date)
  // week must not be in the past and not too far in the future
  return m.isSameOrAfter(now, 'isoWeek') && m.diff(now, 'weeks') <= 6
}

/**
 * Convert an array of date specifications into a Set of calendar week
 * numbers.
 *
 * @param dates Array of date specifications.
 * @returns Week numbers for the given dates.
 */
export function convertToWeeks (dates: datelike[]): Set<number> {
  return new Set(dates.map((d) => moment(d).isoWeek()))
}
