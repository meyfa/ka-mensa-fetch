import { DateSpec } from '../types/date-spec.js'

/**
 * RegExp for parsing date strings of the following form: "Mo 02.12.".
 * First group: day (1..31), second group: month (1..12).
 */
const DATE_REGEXP = /^\s*(?:Mo|Di|Mi|Do|Fr|Sa|So)\s*(\d+)\.(\d+)\.\s*$/

/**
 * Guess year information from a reference date and the month alone.
 *
 * @param refYear The reference year (i.e. data acquisition date).
 * @param refMonth The reference month.
 * @param month The month for which year should be guessed.
 * @returns The most likely year.
 */
function guessYear (refYear: number, refMonth: number, month: number): number {
  // split the reference year into 3 sections and check whether the given month
  // lies reasonably close to the reference third;
  // if it does, year is probably the reference year;
  // otherwise, it is the previous or the next year, depending on the section.

  if (refMonth <= 3) {
    // 0 .. 3; in range: 0 .. 7
    return month < 8 ? refYear : refYear - 1
  } else if (refMonth <= 7) {
    // 4 .. 7; in range: 0 .. 11
    return refYear
  } else {
    // 8 .. 11; in range: 4 .. 11
    return month < 4 ? refYear + 1 : refYear
  }
}

/**
 * Parse a datestamp string of the form "Mo 02.12." with respect to a reference
 * date.
 *
 * The returned object has keys `day` (1..31), `month` (0..11), `year` (...).
 * If invalid input was given, undefined is returned.
 *
 * @param str String to be parsed.
 * @param reference The reference date for year guessing.
 * @returns An object containing integers: day, month, year.
 */
export function parseDatestamp (str: string, reference: Date): DateSpec | undefined {
  const match = str.match(DATE_REGEXP)
  if (match == null) {
    return undefined
  }

  const day = Number.parseInt(match[1], 10)
  const month = Number.parseInt(match[2], 10) - 1

  // plausibility check
  if (day < 1 || day > 31 || month < 0 || month > 11) {
    return undefined
  }

  const refYear = reference.getFullYear()
  const refMonth = reference.getMonth()
  const year = guessYear(refYear, refMonth, month)

  // JS Date has month run from 0 to 11, inclusive
  return {
    day,
    month,
    year
  }
}
