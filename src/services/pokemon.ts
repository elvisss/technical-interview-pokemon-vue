import type { Pokemon, PokeResponse } from '../types'

const BASE_POKE_API = 'https://pokeapi.co/api/v2'

const setDelay = (timeout = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

const getPokemons = async(): Promise<Pokemon[]> => {
  // await setDelay()
  const response = await fetch(`${BASE_POKE_API}/pokemon`)
  const { results } = await response.json() as PokeResponse
  return results
}

const getPokemon = async(url: string): Promise<Pokemon> => {
  const response = await fetch(url)
  const pokemon = await response.json() as Pokemon
  return pokemon
}

export {
  getPokemons,
  getPokemon,
}
