import { ref } from 'vue'
import type { Pokemon } from '../types'
import { getPokemon, getPokemons } from '../services/pokemon'
import type { SortType } from '../types'
import type { SortField } from '../types'

export const usePokemon = () => {
  const pokemons = ref<Array<Pokemon>>([])
  const sortedPokemons = ref<Array<Pokemon>>([])
  const isLoading = ref<boolean>(true)
  const isError = ref<boolean>(false)

  const fetchPokemons = async (): Promise<void> => {
    try {
      const initialPokemons = await getPokemons()

      const promises: any[] = []

      initialPokemons.forEach((pokemon) => {
        promises.push(getPokemon(pokemon.url))
      })

      const allPokemons = await Promise.all<Pokemon[]>(promises)

      const mergePokemons = initialPokemons.map((pokemon, index) => {
        return {
          ...pokemon,
          id: allPokemons[index].id,
          height: allPokemons[index].height,
          weight: allPokemons[index].weight,
        }
      })

      pokemons.value = mergePokemons
      sortedPokemons.value = mergePokemons
    } catch (err) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const sortPokemons = (sortType: SortType, field: SortField) => {
    if (sortType === 'none') {
      sortedPokemons.value = [...pokemons.value]
      return
    }

    const clonedPokemons = [...pokemons.value]

    clonedPokemons.sort((a: Pokemon, b: Pokemon) => {
      if (sortType === 'descending') {
        if (a[field] > b[field]) {
          return -1
        }
        if (a[field] < b[field]) {
          return 1
        }
      }
      if (sortType === 'ascending') {
        if (a[field] > b[field]) {
          return 1
        }
        if (a[field] < b[field]) {
          return -1
        }
      }
      return 0
    })

    sortedPokemons.value = clonedPokemons
  }

  fetchPokemons()

  return {
    pokemons: sortedPokemons,
    isLoading,
    isError,
    sortPokemons,
  }
}
