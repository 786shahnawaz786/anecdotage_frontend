require('dotenv').config();

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Anecdotage Slides',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.bundle.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js'
      },
      {
        src:
          'https://cdn.ckeditor.com/4.10.0/standard/ckeditor.js'
      },
      {
        src:'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4366805194029390',
          // async: true,
          crossorigin:"anonymous"
      },
    ]
  },

  loading: { color: '#fff' },
  css: ['@/assets/scss/main.scss', '@/assets/css/style.css'],

  plugins: [
    '~plugins/vform',
    '~components/_global',
    '~/plugins/toastNotification',
    { src: '~/plugins/v-tippy'},
  ],

  buildModules: [
    '@nuxtjs/router',
    '@nuxtjs/device'
  ],
  // device: {
  //   refreshOnResize: true
  // },

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',

  ],
  'google-adsense': {
      id: process.env.GOOGLE_ADD_ID,
  },


  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get', propertyName: 'data' },
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      },
    },
  },

  axios: {
    baseURL: process.env.API_URL
  },

  build: {

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},

    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    },
    // publicPath: process.env.NODE_ENV === 'dev' ? '/_nuxt/' :  '/stories/_nuxt/'
    publicPath: process.env.NODE_ENV === 'dev' ? '/_nuxt/' :  '/stories_nuxt/'
  },

  router: {
    // base: '/subfolder/',
    base: process.env.NODE_ENV === 'dev' ? '/' : process.env.SUB_FOLDER,
    trailingSlash: true,

  },


  server: {
    port: 4000 // default: 3000
  }
};
