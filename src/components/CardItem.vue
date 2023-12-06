<script setup lang="ts">
// import { Item } from '@/models/item.model'
import { Item } from '@/stores/app.store'

interface Props {
  isLoading?: boolean
  item: Item
}

defineProps<Props>()
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card class="ma-2" max-width="374" v-bind="props">
      <v-img cover height="250" :src="item.image"></v-img>

      <v-card-item>
        <v-card-title>{{ item.title }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ item.category }}</span>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :model-value="item.rating.rate"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>

          <div class="text-grey ms-4">{{ item.rating.rate }} {{ item.rating.count }}</div>
        </v-row>

        <div class="my-4 text-subtitle-1">$ • {{ item.price }}</div>

        <div class="description">{{ item.description }}</div>
      </v-card-text>

      <v-overlay
        :model-value="isHovering"
        contained
        scrim="#036358"
        class="align-center justify-center"
      >
        <v-btn variant="flat">See more info</v-btn>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<style scoped>
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
