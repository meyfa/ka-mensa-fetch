import { canteens } from '../data.js'

// CONSTANTS

/**
 * A Map from canteen ids to Maps from line names to line ids.
 * I.e. schema: (canteenId => (lineName => lineId))
 */
const LINE_IDS_MAPPING: Map<string, Map<string, string>> = (() => {
  const mapping = new Map()

  for (const canteen of canteens) {
    const lineMapping = new Map()
    for (const line of canteen.lines) {
      const allNames = [line.name, ...(line.alternativeNames ?? [])]
      allNames.forEach(name => lineMapping.set(name, line.id))
    }
    mapping.set(canteen.id, lineMapping)
  }

  return mapping
})()

// MAIN EXPORT

/**
 * Match a line name for the given canteen, determining its id.
 *
 * Returns undefined if the canteen id is invalid or the line could not be matched.
 *
 * @param canteenId The id of the canteen.
 * @param name The human-readable line name.
 * @returns The line id.
 */
export function matchLineName (canteenId: string, name: string): string | undefined {
  // sanity check canteenId
  const lineNameToIdMap = LINE_IDS_MAPPING.get(canteenId)
  if (lineNameToIdMap == null) {
    return undefined
  }
  return lineNameToIdMap.get(name.trim())
}
