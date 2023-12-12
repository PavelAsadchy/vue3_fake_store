<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'
import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'

const authStore = useAuthStore()
const appStore = useAppStore()

const userName = ref('')
const password = ref('')
const userNameRules = ref([
  (value: string) => {
    if (value?.length >= 3) return true

    return 'First name must be at least 3 characters.'
  }
])
const passwordRules = ref([(value: string) => !!value || 'Password is required'])
const showPassword = ref(false)
const isFormValid = ref(false)

const submitLogin = () => authStore.tryLogin(userName.value, password.value)
</script>

<template>
  <v-sheet width="300" class="mx-auto" rounded>
    <v-form fast-fail @submit.prevent="submitLogin" v-model="isFormValid">
      <v-text-field v-model="userName" label="User name" :rules="userNameRules"></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2" :disabled="!isFormValid" :loading="appStore.isLoading"
        >Submit</v-btn
      >
    </v-form>
  </v-sheet>
</template>
