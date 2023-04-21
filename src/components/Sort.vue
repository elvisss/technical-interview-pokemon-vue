<template>
  <th @click="onSorting">{{ sortIcon }} {{ field }}</th>
</template>

<script setup lang="ts">
import type { SortField, SortType } from '@/types'
import { computed, ref, toRef } from 'vue'

const sortState = ref<SortType>('none')

interface Props {
  field: SortField
}

const props = defineProps<Props>()
const field = toRef(props, 'field')

const emit = defineEmits(['sorting'])

const onSorting = () => {
  let newState: SortType

  if (sortState.value === 'none') {
    newState = 'ascending'
  } else if (sortState.value === 'ascending') {
    newState = 'descending'
  } else {
    newState = 'none'
  }

  sortState.value = newState

  emit('sorting', newState)
}

const sortIcon = computed<string>(() => {
  let sortIcon: string
  if (sortState.value === 'ascending') {
    sortIcon = '☝'
  } else if (sortState.value === 'descending') {
    sortIcon = '👇'
  } else {
    sortIcon = ''
  }
  return sortIcon
})
</script>

<style scoped></style>
