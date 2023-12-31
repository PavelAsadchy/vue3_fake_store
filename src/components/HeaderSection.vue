<script setup lang="ts">
import { inject, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth.store'
import { useAppStore } from '@/stores/app.store'
import { MOCKED_USER_DATA, NAVIGATION_ROUTES } from '@/consts'
import AvatarMenu from './AvatarMenu.vue'

const authStore = useAuthStore()
const appStore = useAppStore()
const { user } = storeToRefs(authStore)
const { itemsInCart } = storeToRefs(appStore)

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

    <v-switch
      hide-details
      true-icon="mdi-weather-night"
      false-icon="mdi-weather-sunny"
      @update:model-value="toggleTheme"
    ></v-switch>

    <RouterLink to="/cart">
      <v-btn icon class="cart">
        <div v-if="itemsInCart" class="cart__num">{{ itemsInCart }}</div>
        <v-icon>mdi-cart-variant</v-icon>
      </v-btn>
    </RouterLink>

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

<style scoped>
.cart {
  position: relative;
}
.cart__num {
  width: 16px;
  height: 16px;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transform: translate(50%, 50%);
  border-radius: 50%;
  background-color: red;
  font-size: 12px;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  background-color: transparent;
}
</style>
