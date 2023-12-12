<script setup lang="ts">
import type { Item } from '@/models'

interface Props {
  isLoading: boolean
  item: Item
  onPrimaryActionClickHandler: Function
  onSecondaryActionClickHandler?: Function
  detailed?: boolean
}

defineProps<Props>()
</script>

<template>
  <v-skeleton-loader
    :loading="isLoading"
    height="440"
    min-width="250"
    type="image, list-item-two-line"
  >
    <v-hover :disabled="detailed" v-slot="{ isHovering, props }">
      <v-card v-bind="props" :class="{ detailed }">
        <v-img cover height="250" :src="item.image"></v-img>

        <v-card-item>
          <v-card-title>{{ item.title }}</v-card-title>

          <v-card-subtitle>
            <span class="me-1">{{ item.category }}</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-row class="mx-0">
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

        <template v-if="detailed">
          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-actions>
            <v-btn
              color="deep-purple-lighten-2"
              variant="flat"
              @click="() => onPrimaryActionClickHandler(item.id)"
              >Add to cart</v-btn
            >

            <v-btn
              color="deep-purple-lighten-2"
              variant="text"
              @click="onSecondaryActionClickHandler"
              >Close</v-btn
            >
          </v-card-actions>
        </template>

        <v-overlay
          :model-value="isHovering"
          contained
          scrim="#036358"
          class="align-center justify-center"
        >
          <v-btn variant="flat" @click="() => onPrimaryActionClickHandler(item.id)"
            >See more info</v-btn
          >
        </v-overlay>
      </v-card>
    </v-hover>
  </v-skeleton-loader>
</template>

<style scoped>
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.detailed {
  max-width: 374px;
}
.detailed .description {
  display: block;
  -webkit-line-clamp: none; /* number of lines to show */
  line-clamp: none;
}
.v-skeleton-loader {
  background: transparent;
}
</style>
