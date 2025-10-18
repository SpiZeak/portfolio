// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  devServer: {
    https: {
      key: './certs/localhost/privkey.pem',
      cert: './certs/localhost/fullchain.pem'
    }
  },

  compatibilityDate: '2025-10-18',

  nitro: {
    preset: 'bun',
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  image: {
    // Disable Nuxt Image in development mode
    provider: process.env.NODE_ENV === 'development' ? 'none' : 'ipx'
  }
})
