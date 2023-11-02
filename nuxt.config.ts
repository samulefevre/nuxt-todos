// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm'
    },
  },
  ui: {
    icons: 'all'
  },
})
