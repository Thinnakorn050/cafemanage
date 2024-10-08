// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { defineNuxtPlugin } from '#app'

// Vuetify styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Optional: for Material Design Icons

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light', // You can also define themes here
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
