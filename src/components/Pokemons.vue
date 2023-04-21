<template>
  <h1>Pokemons</h1>

  <template v-if="isLoading">
    <p>Loading...</p>
  </template>

  <template v-if="isError">
    <p>An error ocurred, please try again later</p>
  </template>

  <template v-if="!isLoading && !isError">
    <template v-if="!pokemons.length">
      <p>There are not pokemons</p>
    </template>

    <template v-else>
      <table>
        <thead>
          <tr>
            <Sort @sorting="(newState) => sortPokemons(newState, 'id')" field="id" />
            <Sort @sorting="(newState) => sortPokemons(newState, 'name')" field="name" />
            <Sort @sorting="(newState) => sortPokemons(newState, 'url')" field="url" />
            <Sort @sorting="(newState) => sortPokemons(newState, 'height')" field="height" />
            <Sort @sorting="(newState) => sortPokemons(newState, 'weight')" field="weight" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="pokemon in pokemons" :key="pokemon.id">
            <td>{{ pokemon.id }}</td>
            <td>{{ pokemon.name }}</td>
            <td>{{ pokemon.url }}</td>
            <td>{{ pokemon.height }}</td>
            <td>{{ pokemon.weight }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePokemon } from '../composables/usePokemon'
import Sort from './Sort.vue'

export default defineComponent({
  components: { Sort },
  setup() {
    const { pokemons, isLoading, isError, sortPokemons } = usePokemon()

    return {
      pokemons,
      isLoading,
      isError,
      sortPokemons,
    }
  },
})
</script>

<style scoped>
table {
  margin: 0 auto;
}
table th {
  font-weight: bold;
}
</style>
