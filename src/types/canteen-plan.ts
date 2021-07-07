import { DateSpec } from './date-spec'

/**
 * An object containing data about a specific meal.
 */
export interface CanteenMeal {
  name: string
  price: string
  classifiers: string[]
  additives: string[]
}

/**
 * An object describing a line that is part of a canteen plan, and that contains a list of meals.
 */
export interface CanteenLine {
  id: string | null
  name: string
  meals: CanteenMeal[]
}

/**
 * An object describing a canteen at a specific date, which contains lines with meal information.
 */
export interface CanteenPlan {
  id: string | null
  name: string
  date: DateSpec
  lines: CanteenLine[]
}
