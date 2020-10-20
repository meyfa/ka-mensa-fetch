'use strict'

const moment = require('moment')

const canteens = require('../../data/canteens.json')
const buildCanteenLookup = require('./build-canteen-lookup')

// CONSTANTS

/**
 * A mapping from keys as found in the JSON data, to classifier short notation
 * as used on the website.
 *
 * @type {object}
 */
const CLASSIFIER_MAPPING = Object.freeze({
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
 * @param {number} unixTimestamp The raw timestamp in seconds.
 * @returns {object} The converted date object (day, month, year).
 */
function convertTimestampToDateObject (unixTimestamp) {
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
 * @param {object} date A date object (day, month, year)
 * @param {Date} reference A native Date object.
 * @returns {boolean} Whether the date is reliable.
 */
function isReliable (date, reference) {
  return moment(reference).diff(moment(date), 'd', true) < 1
}

/**
 * Parse a meal entry.
 *
 * @param {object} data The meal entry.
 * @returns {object} The parsed meal object (name, price, classifiers, additives).
 */
function parseMeal (data) {
  if (typeof data.meal !== 'string') {
    return null
  }

  return {
    name: getFormattedMealName(data),
    price: getFormattedPrice(data),
    classifiers: getClassifiers(data),
    additives: getAdditives(data)
  }
}

/**
 * @param {object} mealData The meal entry.
 * @returns {string} The formatted meal name.
 */
function getFormattedMealName (mealData) {
  if (mealData.dish) {
    return mealData.meal + ' ' + mealData.dish
  }
  return mealData.meal
}

/**
 * @param {object} mealData The meal entry.
 * @returns {string} The formatted meal price.
 */
function getFormattedPrice (mealData) {
  if (!mealData.price_1) {
    return ''
  }
  const pricePrefix = mealData.info ? '(' + mealData.info + ') ' : ''
  const price = mealData.price_1.toFixed(2).replace('.', ',') + ' €'
  return pricePrefix + price
}

/**
 * @param {object} mealData The meal entry.
 * @returns {string[]} An array of classifiers for the given meal.
 */
function getClassifiers (mealData) {
  return Object.keys(CLASSIFIER_MAPPING).filter(classifier => mealData[classifier])
    .map(classifier => CLASSIFIER_MAPPING[classifier])
}

/**
 * @param {object} mealData The meal entry.
 * @returns {string[]} An array of additives for the given meal.
 */
function getAdditives (mealData) {
  return mealData.add.filter(str => str)
}

// NESTED LAYER PARSING

/**
 * @param {Date} referenceDate The date of plan acquisition, for reference.
 * @param {object} canteen The canteen object to which the plans are related.
 * @param {object} planMapping The object from which to parse the days.
 * @returns {object[]} An array of parsed plan objects, one for each day.
 */
function parseDays (referenceDate, canteen, planMapping) {
  const days = []
  for (const unixTimestamp in planMapping) {
    const date = convertTimestampToDateObject(unixTimestamp)
    if (!isReliable(date, referenceDate)) {
      continue
    }
    const lines = parseLines(canteen, planMapping[unixTimestamp])
    days.push({ id: canteen.id, name: canteen.name, date, lines })
  }
  return days
}

/**
 * @param {object} canteen The canteen object to which the lines are related.
 * @param {object} lineMapping The object from which to parse the lines.
 * @returns {object[]} An array of parsed line objects.
 */
function parseLines (canteen, lineMapping) {
  const lines = []
  for (const lineId in lineMapping) {
    const line = canteen.lines.get(lineId)
    if (!line) {
      continue
    }
    const meals = lineMapping[lineId].map(parseMeal).filter(meal => meal)
    lines.push({ id: line.id, name: line.name, meals })
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
 * @param {object} json The JSON canteen data to parse.
 * @param {Date} referenceDate The date of plan acquisition, for reference.
 * @param {?(object[])} metadata A supplementary 'canteens.json'-like structure.
 * @returns {object[]} The parse results.
 */
function parsePlans (json, referenceDate, metadata) {
  const lookup = buildCanteenLookup(canteens, metadata)

  // the JSON is structured as follows:
  // canteenId => unixTimestamp => lineId => [meals]

  const plans = []
  for (const canteenId in json) {
    const canteen = lookup.get(canteenId)
    if (canteen) {
      plans.push(...parseDays(referenceDate, canteen, json[canteenId]))
    }
  }
  return plans
}

module.exports = parsePlans
