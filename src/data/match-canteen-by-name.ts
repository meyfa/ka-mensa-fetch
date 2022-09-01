import { canteens } from './canteens.js'
import { normalizeNameForMatching } from '../util/normalization.js'

/**
 * A Map from canteen names to canteen ids.
 */
const CANTEEN_IDS_MAPPING: Map<string, string> = (() => {
  const mapping = new Map()
  for (const canteen of canteens) {
    mapping.set(normalizeNameForMatching(canteen.name), canteen.id)
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
  return CANTEEN_IDS_MAPPING.get(normalizeNameForMatching(name))
}
