import canteens from '../../data/canteens.json'

// CONSTANTS

/**
 * A Map from canteen ids to Maps from line names to line ids.
 * I.e. schema: (canteenId => (lineName => lineId))
 *
 * @type {object}
 */
const LINE_IDS_MAPPING = (() => {
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
 * @param {string} canteenId The id of the canteen.
 * @param {string} name The human-readable line name.
 * @returns {?string} The line id.
 */
export default
function matchLineName (canteenId: string, name: string): string | undefined {
  // sanity check canteenId
  if (!LINE_IDS_MAPPING.has(canteenId)) {
    return undefined
  }
  // sanitize and lookup
  return LINE_IDS_MAPPING.get(canteenId).get(name.trim())
}
