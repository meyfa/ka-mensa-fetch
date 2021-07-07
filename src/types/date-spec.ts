/**
 * Standard date specification used in this library.
 */
export interface DateSpec {
  year: number
  month: number
  day: number
}

/**
 * Anything that could be converted to a {@link DateSpec}.
 */
export type datelike = DateSpec | Date | string | number
