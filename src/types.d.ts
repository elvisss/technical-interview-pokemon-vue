export interface PokeResponse {
  count: number
  next: string
  previous: string
  results: Array<Pokemon>
}

export interface Pokemon {
  id: number
  name: string
  url: string
  height: number
  weight: number
}

export type SortField = keyof Pokemon

export type SortType = 'ascending' | 'descending' | 'none'
