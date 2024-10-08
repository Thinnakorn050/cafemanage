export default {
  ssr: true,
  target: 'server',

  head: {
    title: 'Cafe Management',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
  },

  css: ['@/assets/styles.css'],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  compatibilityDate: '2024-10-08',
};
