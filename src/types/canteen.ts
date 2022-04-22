/**
 * Description of a Canteen Line (not including plan data, just metadata).
 * This is as it occurs in the canteens dataset.
 */
export interface Line {
  id: string
  name: string
  alternativeNames?: string[]
}

/**
 * Description of a Canteen, including its lines (but not including any plan data).
 * This is as it occurs in the canteens dataset.
 */
export interface Canteen {
  id: string
  name: string
  lines: Line[]
}
