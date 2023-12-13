<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAppStore } from '@/stores/app.store'
import CardItem from './CardItem.vue'

const appStore = useAppStore()

const details = ref(false)

watchEffect(() => appStore.getItems())

const showDetails = (id: string) => {
  details.value = true
  appStore.getSelectedItem(id)
}

const addToCart = (productId: string) => {
  appStore.addItemToCart(productId)
  closeDetails()
}

const closeDetails = () => {
  details.value = false
  appStore.selected = null
}
</script>

<template>
  <v-container v-if="appStore.isLoading && !appStore.totalItemCount">
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

  <v-container v-if="appStore.totalItemCount">
    <v-row no-gutters>
      <v-col v-for="card in appStore.displayItemList" :key="card.id" cols="12" sm="4">
        <CardItem
          class="ma-2"
          :isLoading="appStore.isLoading"
          :item="card"
          primaryActionTitle="See more info"
          :onPrimaryActionClickHandler="showDetails"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="details" width="auto">
    <CardItem
      :isLoading="!appStore.selected"
      :item="appStore.selected!"
      primaryActionTitle="Add to cart"
      :onPrimaryActionClickHandler="addToCart"
      :onSecondaryActionClickHandler="closeDetails"
      detailed
    />
  </v-dialog>
</template>
