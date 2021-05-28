export interface Line {
  id: string
  name: string
  alternativeNames?: string[]
}

export interface Canteen {
  id: string
  name: string
  lines: Line[]
}
