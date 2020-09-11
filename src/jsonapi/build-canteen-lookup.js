'use strict'

// METHODS

/**
 * Convert the canteen array into a canteen Map.
 *
 * @param {object[]} array The canteens array.
 * @returns {Map} The generated Map.
 */
function toCanteenMap (array) {
  return new Map(array.map(canteen => {
    const lineMap = new Map(canteen.lines.map(line => [line.id, line]))
    return [canteen.id, { ...canteen, lines: lineMap }]
  }))
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
function buildCanteenLookup (base, extend) {
  const baseMap = toCanteenMap(base)
  if (!extend) {
    return baseMap
  }
  const extendMap = toCanteenMap(extend)

  const map = new Map()

  for (const canteen of baseMap.values()) {
    const eCanteen = extendMap.get(canteen.id)
    if (!eCanteen) {
      map.set(canteen.id, canteen)
      continue
    }
    const linesMap = new Map()
    for (const line of canteen.lines.values()) {
      const eLine = eCanteen.lines.get(line.id)
      linesMap.set(line.id, !eLine ? line : { ...line, ...eLine })
    }
    map.set(canteen.id, {
      ...canteen,
      ...eCanteen,
      lines: linesMap
    })
  }

  return map
}

module.exports = buildCanteenLookup
