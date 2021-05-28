// TYPES

interface Line {
  id: string
  name: string
}

interface CanteenWithArray {
  id: string
  name: string
  lines: Line[]
}

interface CanteenWithMap {
  id: string
  name: string
  lines: Map<string, Line>
}

// METHODS

/**
 * Convert the canteen array into a canteen Map.
 *
 * @param {object[]} array The canteens array.
 * @returns {Map} The generated Map.
 */
function toCanteenMap (array: CanteenWithArray[]): Map<string, CanteenWithMap> {
  return new Map(array.map(canteen => {
    const lineMap = new Map(canteen.lines.map(line => [line.id, line]))
    return [canteen.id, { ...canteen, lines: lineMap }]
  }))
}

/**
 * Merge a pair of canteen objects into one, using the first as the base for
 * every property and optionally overriding those using the second.
 *
 * The lines Map is deeply merged.
 *
 * @param {object} first The first canteen object.
 * @param {?object} second The second canteen object.
 * @returns {object} The merged canteen object.
 */
function mergeCanteen (first: CanteenWithMap, second?: CanteenWithMap): CanteenWithMap {
  if (second == null) return first

  const linesMap = new Map()
  for (const line of first.lines.values()) {
    const eLine = second.lines.get(line.id)
    linesMap.set(line.id, mergeLine(line, eLine))
  }

  return { ...first, ...second, lines: linesMap }
}

/**
 * Merge a pair of line objects into one, using the first as the base for every
 * property and optionally overriding those using the second.
 *
 * @param {object} first The first line object.
 * @param {?object} second The second line object.
 * @returns {object} The merged line object.
 */
function mergeLine (first: object, second?: object): object {
  if (second == null) return first
  return { ...first, ...second }
}

// MAIN EXPORT

/**
 * Convert one or two sets of canteen data (id, name, lines array) into a Map
 * lookup.
 *
 * The returned Map maps each canteen id to an object consisting of `id`,
 * `name`, and `lines` Map of the canteen.
 * The lines Map, in turn, maps each line id to an object consisting of `id`
 * and `name`.
 *
 * If a second set of data is supplied, it will recursively override properties
 * of the first set.
 *
 * @param {object[]} base The base canteen data.
 * @param {?(object[])} extend The overriding canteen data.
 * @returns {Map} The lookup table.
 */
export default
function buildCanteenLookup (base: CanteenWithArray[], extend?: CanteenWithArray[]): Map<string, CanteenWithMap> {
  const baseMap = toCanteenMap(base)
  if (extend == null) return baseMap
  const extendMap = toCanteenMap(extend)

  const map = new Map()
  for (const canteen of baseMap.values()) {
    const eCanteen = extendMap.get(canteen.id)
    map.set(canteen.id, mergeCanteen(canteen, eCanteen))
  }
  return map
}
