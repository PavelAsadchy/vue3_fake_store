<script setup lang="ts">
import { watchEffect } from 'vue'
import { useAppStore } from '@/stores/app.store'
import CardItem from './CardItem.vue'

const appStore = useAppStore()

watchEffect(() => appStore.getItems())
</script>

<template>
  <v-container v-if="appStore.isLoading" class="bg-surface-variant">
    <v-row align-content="center" justify="center">
      <v-col cols="6">
        <v-progress-linear
          color="deep-purple-accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="bg-surface-variant">
    <v-row no-gutters>
      <v-col v-for="card in appStore.itemList" :key="card.id" cols="12" sm="4">
        <CardItem :item="card" />
      </v-col>
    </v-row>
  </v-container>
</template>
../models/item.model
