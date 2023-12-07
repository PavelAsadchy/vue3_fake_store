<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { CATEGORIES, RESULTS_LIMIT_ITEMS, SORT_ITEMS } from '@/consts'
import { useFilterStore } from '@/stores/filter.store'

const filterStore = useFilterStore()
const { selectedLimit, selectedSort, selectedCategory } = storeToRefs(filterStore)
</script>

<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-select
          class="ma-2"
          label="Results limit"
          v-model="selectedLimit"
          :items="RESULTS_LIMIT_ITEMS"
          item-title="label"
          item-value="value"
          return-object
          hide-details
          variant="solo-filled"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          class="ma-2"
          label="Sort"
          v-model="selectedSort"
          :items="SORT_ITEMS"
          item-title="label"
          item-value="value"
          return-object
          hide-details
          variant="solo-filled"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <v-select
          class="ma-2"
          label="By category"
          v-model="selectedCategory"
          :items="CATEGORIES"
          item-title="label"
          item-value="value"
          return-object
          hide-details
          variant="solo-filled"
        ></v-select>
      </v-col>
    </v-row>

    <v-pagination :length="4"></v-pagination>
  </v-container>
</template>
