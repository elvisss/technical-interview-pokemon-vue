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
            <th>ID</th>
            <th>Name</th>
            <th>URL</th>
            <th>Height</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pokemon in pokemons" :key="pokemon.name">
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

export default defineComponent({
  setup() {
    const { pokemons, isLoading, isError } = usePokemon()

    return {
      pokemons,
      isLoading,
      isError,
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
