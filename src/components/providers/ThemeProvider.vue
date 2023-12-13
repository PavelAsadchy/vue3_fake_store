<script setup lang="ts">
import { ref } from 'vue'

import { provide } from 'vue'

const theme = ref('light')
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

provide<(value: unknown) => void>('toggleTheme', toggleTheme)
</script>

<template>
  <v-parallax :src="theme === 'dark' ? 'src/assets/bg-dark.jpg' : 'src/assets/bg.jpg'">
    <v-theme-provider :theme="theme">
      <slot></slot>
    </v-theme-provider>
  </v-parallax>
</template>
