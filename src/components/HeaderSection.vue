<script setup lang="ts">
import { inject } from 'vue'

const toggleTheme = inject<(value: unknown) => void>('toggleTheme')
</script>

<template>
  <v-app-bar :elevation="2">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Fake store</v-app-bar-title>

    <v-spacer></v-spacer>
    <!-- <v-text-field variant="underlined"></v-text-field>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->

    <!-- <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn> -->

    <v-switch
      hide-details
      true-icon="mdi-weather-night"
      false-icon="mdi-weather-sunny"
      @update:model-value="toggleTheme"
    ></v-switch>
  </v-app-bar>
</template>
