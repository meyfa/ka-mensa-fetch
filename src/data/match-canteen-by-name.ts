import { canteens } from './canteens.js'
import { mergeWhitespace } from '../util/merge-whitespace.js'

/**
 * Normalize the given canteen name for indexing into the lookup Map.
 *
 * @param name The human-readable name.
 * @returns The normalized name, potentially less pretty, but also with less entropy.
 */
function normalizeCanteenNameForLookup (name: string): string {
  return mergeWhitespace(name.trim()).toLocaleLowerCase(['de-DE', 'en-US'])
}

/**
 * A Map from canteen names to canteen ids.
 */
const CANTEEN_IDS_MAPPING: Map<string, string> = (() => {
  const mapping = new Map()
  for (const canteen of canteens) {
    mapping.set(normalizeCanteenNameForLookup(canteen.name), canteen.id)
  }
  return mapping
})()

/**
 * Match a canteen by name, determining its id. Returns undefined if the canteen could not be matched.
 *
 * @param name The human-readable canteen name.
 * @returns The canteen id.
 */
export function matchCanteenByName (name: string): string | undefined {
  return CANTEEN_IDS_MAPPING.get(normalizeCanteenNameForLookup(name))
}
