import { canteens } from '../data/canteens.js'
import { request } from './simplesite-request.js'
import { parse } from './simplesite-parse.js'
import { convertToWeeks, getCurrentWeek, isDateSupported } from './simplesite-date-util.js'
import type { CanteenPlan } from '../types/canteen-plan.js'
import type { SimpleSiteOptions } from '../types/options.js'

/**
 * Array of known canteen ids.
 */
const CANTEEN_IDS = Object.freeze(canteens.map((c) => c.id))

/**
 * Fetch a single instance of the plan and parse it.
 *
 * @param canteenId The canteen to fetch.
 * @param weekId The calendar week to fetch.
 * @param sessionCookie Value of the session cookie.
 * @returns Parsed results.
 */
async function fetchSingle (canteenId: string, weekId: string | number, sessionCookie?: string): Promise<CanteenPlan[]> {
  const html = await request(canteenId, weekId, sessionCookie)
  const reference = new Date()

  return parse(html, canteenId, reference)
}

/**
 * Fetch a set of plans from the simple web view.
 *
 * Options:
 * - canteens: array of canteen ids. Default: (all)
 * - dates: array of date specifications. Default: (current week)
 * - sessionCookie: optional session cookie. Default: undefined
 * - parallel: whether to run all network requests in parallel. Default: false
 *
 * @param options The fetcher options.
 * @returns Parsed results.
 */
export async function fetch (options: SimpleSiteOptions): Promise<CanteenPlan[]> {
  const ids = options.canteens ?? CANTEEN_IDS
  const weeks = options.dates != null
    ? convertToWeeks(options.dates.filter(isDateSupported))
    : [getCurrentWeek()]
  const sessionCookie = options.sessionCookie
  const parallel = options.parallel ?? false

  const promises: Array<Promise<CanteenPlan[]>> = []

  for (const week of weeks) {
    for (const id of ids) {
      const promise = fetchSingle(id, week, sessionCookie)
      promises.push(promise)
      if (!parallel) await promise // synchronize
    }
  }

  return (await Promise.all(promises)).flat()
}
