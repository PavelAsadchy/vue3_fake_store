<script setup lang="ts">
import { UserAddress, UserName } from '@/models'

interface Props {
  img: string
  name: UserName
  username: string
  email: string
  address: UserAddress
  phone: string
}

defineProps<Props>()
</script>

<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar v-if="img" :image="img" size="large"></v-avatar>
        <v-avatar v-else color="brown" size="large">
          <span class="text-h5">{{ username }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <!-- <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar> -->
          <h3>{{ name.firstname }} {{ name.lastname }}</h3>
          <p class="text-caption mt-1">"{{ username }}"</p>
          <v-divider class="my-3"></v-divider>
          <p class="text-caption info"><v-icon>mdi-email</v-icon>{{ email }}</p>
          <p class="text-caption info"><v-icon>mdi-phone</v-icon>{{ phone }}</p>
          <p class="text-caption info">
            <v-icon>mdi-map-marker</v-icon>{{ address.zipcode }}, {{ address.city }}
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
.info {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
