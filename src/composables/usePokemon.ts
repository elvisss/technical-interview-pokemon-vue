import { ref } from 'vue'
import type { Pokemon } from '../types'
import { getPokemon, getPokemons } from '../services/pokemon'

export const usePokemon = () => {
  // const initialPokemons = ref<Array<Pokemon>>([])
  const pokemons = ref<Array<Pokemon>>([])
  const isLoading = ref<boolean>(true)
  const isError = ref<boolean>(false)

  const fetchPokemons = async (): Promise<void> => {
    try {
      const initialPokemons = await getPokemons()

      const promises: any[] = []

      initialPokemons.forEach((pokemon) => {
        promises.push(getPokemon(pokemon.url))
      })

      const allPokemons: Pokemon[] = await Promise.all(promises)

      const mergePokemons = initialPokemons.map((pokemon, index) => {
        return {
          ...pokemon,
          id: allPokemons[index].id,
          height: allPokemons[index].height,
          weight: allPokemons[index].weight,
        }
      })

      pokemons.value = mergePokemons
    } catch (err) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  fetchPokemons()

  return {
    pokemons,
    isLoading,
    isError,
  }
}
