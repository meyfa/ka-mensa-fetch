'use strict'

const moment = require('moment')

const canteens = require('../../data/canteens.json')

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

// MAIN EXPORT

/**
 * Parse the given JSON for all canteens and dates it contains.
 * Returns an array of objects of the following form:
 *
 * - id: canteen id
 * - name: canteen name
 * - date: date of meal plan
 * - lines: array describing lines and their meals
 *
 * @param {object} json The JSON canteen data to parse.
 * @returns {object[]} The parse results.
 */
function parse (json) {
  const plans = []

  for (const canteenId of Object.keys(json)) {
    const canteen = canteens.find(({ id }) => id === canteenId)
    if (!canteen) {
      continue
    }

    for (const unixTimestamp of Object.keys(json[canteenId])) {
      const date = convertTimestampToDateObject(unixTimestamp)

      const lines = []
      for (const lineId of Object.keys(json[canteenId][unixTimestamp])) {
        const line = canteen.lines.find(({ id }) => id === lineId)
        if (!line) {
          continue
        }

        const meals = json[canteenId][unixTimestamp][lineId].map(parseMeal)
          .filter(meal => meal)
        lines.push({ id: lineId, name: line.name, meals })
      }
      plans.push({ id: canteenId, name: canteen.name, date, lines })
    }
  }

  return plans
}

module.exports = parse
