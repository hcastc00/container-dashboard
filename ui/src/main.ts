import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import i18n from './i18n'
import '@mdi/font/css/materialdesignicons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // Usa los íconos de Material Design
  },
})

createApp(App).use(createPinia()).use(vuetify).use(i18n).use(Toast).mount('#app')
