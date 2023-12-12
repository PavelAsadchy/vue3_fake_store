<script setup lang="ts">
import { inject, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'
import { MOCKED_USER_DATA, NAVIGATION_ROUTES } from '@/consts'
import AvatarMenu from './AvatarMenu.vue'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const toggleTheme = inject<(value: unknown) => void>('toggleTheme')
const drawer = ref(false)
</script>

<template>
  <v-app-bar :elevation="2">
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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

    <template v-if="user" v-slot:append>
      <AvatarMenu
        :img="MOCKED_USER_DATA.img"
        :name="user.name"
        :username="user.username"
        :email="user.email"
        :address="user.address"
        :phone="user.phone"
      />
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="top" temporary>
    <v-list>
      <v-list-item
        v-for="(item, i) in NAVIGATION_ROUTES"
        :key="i"
        :value="item"
        color="primary"
        variant="plain"
      >
        <RouterLink :to="item.toLowerCase()"
          ><v-list-item-title>{{ item }}</v-list-item-title>
        </RouterLink>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
