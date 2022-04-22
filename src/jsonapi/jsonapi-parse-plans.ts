import moment from 'moment'
import { canteens } from '../data/canteens.js'
import { buildCanteenLookup, MappedCanteen } from './build-canteen-lookup.js'
import { DateSpec } from '../types/date-spec.js'
import { CanteenLine, CanteenMeal, CanteenPlan } from '../types/canteen-plan.js'
import { Canteen } from '../types/canteen.js'

// CONSTANTS

/**
 * A mapping from keys as found in the JSON data, to classifier short notation
 * as used on the website.
 */
const CLASSIFIER_MAPPING: Readonly<Record<string, string>> = Object.freeze({
  bio: 'B',
  fish: 'MSC',
  pork: 'S',
  pork_aw: 'SAT',
  cow: 'R',
  cow_aw: 'RAT',
  vegan: 'VG',
  veg: 'VEG',
  mensa_vit: 'MV'
})

// METHODS

/**
 * Given a Unix timestamp that denotes start of day in German local time,
 * determine the date.
 *
 * @param unixTimestamp The raw timestamp in seconds.
 * @returns The converted date object (day, month, year).
 */
function convertTimestampToDateObject (unixTimestamp: number): DateSpec {
  // the timestamp indicates start of the day (0:00) at German local time,
  // add a few hours to remedy time zone and DST effects
  const date = moment.unix(unixTimestamp).add(12, 'h')
  return {
    day: date.date(),
    month: date.month(),
    year: date.year()
  }
}

/**
 * Determine whether a plan for the given date, with the given reference,
 * should be considered reliable.
 *
 * A plan is 'reliable' iff it does not predate the reference by 24h or more.
 *
 * @param date A date object (day, month, year)
 * @param reference A native Date object.
 * @returns Whether the date is reliable.
 */
function isReliable (date: DateSpec, reference: Date): boolean {
  return moment(reference).diff(moment(date), 'd', true) < 1
}

/**
 * Parse a meal entry.
 *
 * @param data The meal entry.
 * @returns The parsed meal object (name, price, classifiers, additives).
 */
function parseMeal (data: any): CanteenMeal | undefined {
  if (typeof data.meal !== 'string') {
    return undefined
  }

  return {
    name: getFormattedMealName(data),
    price: getFormattedPrice(data),
    classifiers: getClassifiers(data),
    additives: getAdditives(data)
  }
}

/**
 * @param mealData The meal entry.
 * @param mealData.meal Basic meal name (such as salad).
 * @param mealData.dish Meal name extension (such as the specific type of salad).
 * @returns The formatted meal name.
 */
function getFormattedMealName (mealData: { meal: string, dish?: string }): string {
  if (mealData.dish != null && mealData.dish !== '') {
    return mealData.meal + ' ' + mealData.dish
  }
  return mealData.meal
}

/**
 * @param mealData The meal entry.
 * @param mealData.price_1 The meal price for students.
 * @param mealData.info The meal info.
 * @returns The formatted meal price.
 */
function getFormattedPrice (mealData: { price_1?: number, info?: string }): string {
  if (mealData.price_1 == null || mealData.price_1 === 0) {
    return ''
  }
  const pricePrefix = mealData.info == null || mealData.info === '' ? '' : `(${mealData.info}) `
  const price = mealData.price_1.toFixed(2).replace('.', ',') + ' €'
  return pricePrefix + price
}

/**
 * @param mealData The meal entry.
 * @returns An array of classifiers for the given meal.
 */
function getClassifiers (mealData: { [key: string]: any }): string[] {
  return Object.keys(CLASSIFIER_MAPPING).filter(classifier => mealData[classifier])
    .map(classifier => CLASSIFIER_MAPPING[classifier])
}

/**
 * @param mealData The meal entry.
 * @param mealData.add Additives attribute of meal entry.
 * @returns An array of additives for the given meal.
 */
function getAdditives (mealData: { add: string[] }): string[] {
  return mealData.add.filter(str => str != null && str !== '')
}

// NESTED LAYER PARSING

/**
 * @param referenceDate The date of plan acquisition, for reference.
 * @param canteen The canteen object to which the plans are related.
 * @param planMapping The object from which to parse the days.
 * @returns An array of parsed plan objects, one for each day.
 */
function parseDays (referenceDate: Date, canteen: MappedCanteen, planMapping: any): CanteenPlan[] {
  const days: CanteenPlan[] = []
  for (const unixTimestamp of Object.keys(planMapping)) {
    const date = convertTimestampToDateObject(parseInt(unixTimestamp, 10))
    if (!isReliable(date, referenceDate)) {
      continue
    }
    const lines = parseLines(canteen, planMapping[unixTimestamp])
    days.push({
      id: canteen.id,
      name: canteen.name,
      date,
      lines
    })
  }
  return days
}

/**
 * @param canteen The canteen object to which the lines are related.
 * @param lineMapping The object from which to parse the lines.
 * @returns An array of parsed line objects.
 */
function parseLines (canteen: MappedCanteen, lineMapping: any): CanteenLine[] {
  const lines: CanteenLine[] = []
  for (const lineId of Object.keys(lineMapping)) {
    const line = canteen.lines.get(lineId)
    if (line == null) {
      continue
    }
    const meals = lineMapping[lineId].map(parseMeal).filter((meal: any) => meal != null)
    lines.push({
      id: line.id,
      name: line.name,
      meals
    })
  }
  return lines
}

// MAIN EXPORT

/**
 * Parse the given JSON for all meals it contains, except those entries too far
 * before the reference date, as those are unreliable.
 *
 * Returns an array of objects of the following form:
 *
 * - id: canteen id
 * - name: canteen name
 * - date: date of meal plan
 * - lines: array describing lines and their meals
 *
 * @param json The JSON canteen data to parse.
 * @param referenceDate The date of plan acquisition, for reference.
 * @param metadata A supplementary canteens-dataset-like structure.
 * @returns The parse results.
 */
export function parsePlans (json: any, referenceDate: Date, metadata?: Canteen[]): CanteenPlan[] {
  const lookup: Map<string, MappedCanteen> = buildCanteenLookup(canteens, metadata)

  // the JSON is structured as follows:
  // canteenId => unixTimestamp => lineId => [meals]

  const plans: CanteenPlan[] = []
  for (const canteenId of Object.keys(json)) {
    const canteen = lookup.get(canteenId)
    if (canteen != null) {
      plans.push(...parseDays(referenceDate, canteen, json[canteenId]))
    }
  }
  return plans
}
