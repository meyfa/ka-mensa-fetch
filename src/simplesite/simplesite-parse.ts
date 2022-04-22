import cheerio, { Cheerio, CheerioAPI, Element } from 'cheerio'
import { mergeWhitespace } from '../util/merge-whitespace.js'
import { parseDatestamp } from './parse-datestamp.js'
import { parseClassifiers } from './parse-classifiers.js'
import { parseNameAndAdditives } from './parse-name-and-additives.js'
import { matchLineName } from './match-line-name.js'
import { CanteenLine, CanteenMeal, CanteenPlan } from '../types/canteen-plan.js'

// METHODS

/**
 * Given a day-specific table, parse all lines contents.
 *
 * @param $ Cheerio reference.
 * @param $table The table containing line info.
 * @param canteenId The id of the canteen currently being parsed.
 * @returns Parsed line contents.
 */
function parseLines ($: CheerioAPI, $table: Cheerio<Element>, canteenId: string): CanteenLine[] {
  const $rows = $table.children('tbody').children('tr')
  return $rows.map((_, el) => parseLine($, $(el), canteenId)).get()
}

/**
 * Parse a single line. The result is an object containing `name`, `meals`.
 *
 * Returns undefined if unexpected content is encountered.
 *
 * @param $ Cheerio reference.
 * @param $row The table row containing the line.
 * @param canteenId The id of the canteen currently being parsed.
 * @returns Parsed line content.
 */
function parseLine ($: CheerioAPI, $row: Cheerio<Element>, canteenId: string): CanteenLine | undefined {
  const $cells = $row.children()
  if ($cells.length !== 2) {
    return undefined
  }

  // replace <br> in name with newlines (cheerio issue #839)
  // (important for "[pizza]Werk<br>Pizza" etc.)
  $cells.eq(0).find('br').replaceWith('\n')

  const name = mergeWhitespace($cells.eq(0).text())
  // use null when id undefined, for better JSON output
  const id = matchLineName(canteenId, name) ?? null

  const $mealsTable = $cells.eq(1).children('table')
  if ($mealsTable.length === 1) {
    const meals = parseMeals($, $mealsTable)
    return {
      id,
      name,
      meals
    }
  }

  return {
    id,
    name,
    meals: []
  }
}

/**
 * Parse meal info from the day-and-line-specific table.
 *
 * @param $ Cheerio reference.
 * @param $table The table containing all meals for the line.
 * @returns Parsed meals.
 */
function parseMeals ($: CheerioAPI, $table: Cheerio<Element>): CanteenMeal[] {
  const $rows = $table.children('tbody').children('tr')
  return $rows.map((__: number, el: Element) => parseMeal($, $(el))).get()
}

/**
 * Parse a single meal. The result is an object containing `name`, `price`,
 * `classifiers` and `additives`.
 *
 * Returns undefined if unexpected content is encountered.
 *
 * @param $ Cheerio reference.
 * @param $row The table row containing the meal.
 * @returns Parsed meal object.
 */
function parseMeal ($: CheerioAPI, $row: Cheerio<Element>): CanteenMeal | undefined {
  const $cells = $row.children()
  if ($cells.length !== 3) {
    return undefined
  }

  const classifiers = parseClassifiers($cells.eq(0).text())
  const {
    name,
    additives
  } = parseNameAndAdditives($cells.eq(1).text())
  const price = $cells.eq(2).text().trim()

  return {
    name,
    price,
    classifiers,
    additives
  }
}

// MAIN EXPORT

/**
 * Parse the given HTML for the given canteen id. Returns an array of objects
 * of the following form:
 *
 * - id: canteen id
 * - name: canteen name
 * - date: date of meal plan
 * - lines: array describing lines and their meals
 *
 * The array entries differ only by their date and the lines array, i.e. canteen
 * is fixed.
 *
 * @param html The HTML string to parse.
 * @param canteenId The canteen id, e.g. 'adenauerring'.
 * @param referenceDate The date of plan acquisition, for reference.
 * @returns The parse results.
 */
export function parse (html: string, canteenId: string, referenceDate: Date): CanteenPlan[] {
  const $ = cheerio.load(html)
  const $titles = $('#platocontent > h1')

  // canteen name is stored in first <h1>
  const canteenName = $titles.first().text()

  // remaining <h1> elements store plan dates
  return $titles.slice(1, 6).map((_, el) => {
    const dateElement = $(el)
    const date = parseDatestamp(dateElement.text(), referenceDate)
    if (date != null) {
      return {
        id: canteenId,
        name: canteenName,
        date: date,
        lines: parseLines($, dateElement.next('table'), canteenId)
      }
    }
    // as per Cheerio .map() spec: do not insert an element
    return undefined
  }).get()
}
