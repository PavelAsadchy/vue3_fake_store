<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app.store'
import MainSection from '@/components/MainSection.vue'
import SearchControls from '@/components/SearchControls.vue'

const appStore = useAppStore()

onMounted(() => appStore.initItemListTotal())
</script>

<template>
  <SearchControls />

  <MainSection />
</template>
