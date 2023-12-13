import './assets/main.css'

import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import type { Router } from 'vue-router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
  }
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

const pinia = createPinia()
const app = createApp(App)

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
