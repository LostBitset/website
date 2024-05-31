// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    '/**': { prerender: true },
  },

  modules: ["@nuxt/content"],

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
})