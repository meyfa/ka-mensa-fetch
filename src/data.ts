import { createRequire } from 'node:module'
import { Canteen } from './types/canteen.js'
import { LegendItem } from './types/legend.js'

const classicRequire = createRequire(import.meta.url)

export const canteens: Canteen[] = classicRequire('../data/canteens.json')
export const legend: LegendItem[] = classicRequire('../data/legend.json')
