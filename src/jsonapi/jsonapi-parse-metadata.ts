interface Metadata {
  mensa?: {
    [key: string]: {
      name?: string
      lines?: {
        [key: string]: {}
      }
    }
  }
}

/**
 * Parse the given JSON to retrieve a canteen and line mapping, structured
 * exactly like 'data/canteens.json'.
 *
 * @param {object} json The JSON general data to parse.
 * @returns {object[]} The parse results.
 */
export default
function parseMetadata (json: Metadata): object[] {
  const canteens: object[] = []

  if (json.mensa == null) return canteens

  for (const canteenId of Object.keys(json.mensa)) {
    const lines = []
    const linesProp = json.mensa[canteenId].lines
    if (linesProp != null) {
      for (const lineId of Object.keys(linesProp)) {
        lines.push({ id: lineId, name: linesProp[lineId] })
      }
    }
    canteens.push({
      id: canteenId,
      name: json.mensa[canteenId].name,
      lines: lines
    })
  }

  return canteens
}
