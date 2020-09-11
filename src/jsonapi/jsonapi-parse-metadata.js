'use strict'

/**
 * Parse the given JSON to retrieve a canteen and line mapping, structured
 * exactly like 'data/canteens.json'.
 *
 * @param {object} json The JSON general data to parse.
 * @returns {object[]} The parse results.
 */
function parseMetadata (json) {
  const canteens = []

  for (const canteenId of Object.keys(json.mensa || {})) {
    const lines = []
    for (const lineId of Object.keys(json.mensa[canteenId].lines || {})) {
      lines.push({ id: lineId, name: json.mensa[canteenId].lines[lineId] })
    }
    canteens.push({
      id: canteenId,
      name: json.mensa[canteenId].name,
      lines: lines
    })
  }

  return canteens
}

module.exports = parseMetadata
