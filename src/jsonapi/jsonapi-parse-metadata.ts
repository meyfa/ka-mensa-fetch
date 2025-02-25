import type { Canteen, Line } from '../types/canteen.js'

/**
 * The structure that might be returned by the JSON API.
 */
export interface UnparsedMetadata {
  mensa?: Record<string, {
    name?: string
    lines?: Record<string, string>
  }>
}

/**
 * Parse the given JSON to retrieve a canteen and line mapping, structured
 * exactly like the canteens dataset.
 *
 * @param json The JSON general data to parse.
 * @returns The parse results.
 */
export function parseMetadata (json: UnparsedMetadata): Canteen[] {
  const canteens: Canteen[] = []

  if (json.mensa == null) return canteens

  for (const canteenId of Object.keys(json.mensa)) {
    const lines: Line[] = []
    const linesProp = json.mensa[canteenId].lines
    if (linesProp != null) {
      for (const lineId of Object.keys(linesProp)) {
        lines.push({
          id: lineId,
          name: linesProp[lineId]
        })
      }
    }
    canteens.push({
      id: canteenId,
      name: json.mensa[canteenId].name ?? '',
      lines
    })
  }

  return canteens
}
