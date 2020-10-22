// import localeRU from './assets/locales/ru.json';
import localeEN from './assets/locales/en.json';

require('dotenv').config();

module.exports = {
  plugins: [
    '~plugins/tippy',
    '~plugins/vue-js-modal',
    '~plugins/bootstrap-vue',
    '~plugins/global.js',
  ],
  head: {
    title: 'CashFlash',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Lorem ipsum' },
      { name: 'keywords', content: 'Lorem ipsum' },
      { property: 'og:title', content: 'Lorem ipsum' },
      { property: 'og:description', content: 'Lorem ipsum' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;400;500;600;700;800&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;800&display=swap' },
    ],
  },
  loading: { color: '#3B8070' },
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  styleResources: {
    scss: [
      '~assets/scss/vars.scss',
      '~assets/scss/mixins.scss',
    ],
  },
  css: [
    '~assets/scss/global.scss',
    '~assets/scss/vars.scss',
  ],
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-i18n',
    'bootstrap-vue/nuxt',
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    icons: true,
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        ru: localeEN,
        en: localeEN,
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'ru',
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    EOS_ACCOUNT: process.env.EOS_ACCOUNT,
    EOS_URL: process.env.EOS_URL,
  },
  buildModules: [
    ['@nuxtjs/dotenv'],
  ],
};
