// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/styles', // Ensure Vuetify styles are included
  ],
  build: {
    transpile: ['vuetify'], // Transpile Vuetify
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
