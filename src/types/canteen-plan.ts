import DateSpec from './date-spec'

export interface CanteenMeal {
  name: string
  price: string
  classifiers: string[]
  additives: string[]
}

export interface CanteenLine {
  id: string | null
  name: string
  meals: CanteenMeal[]
}

export interface CanteenPlan {
  id: string | null
  name: string
  date: DateSpec
  lines: CanteenLine[]
}
