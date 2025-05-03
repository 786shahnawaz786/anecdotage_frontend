require('dotenv').config();
const PRIMARY_HOSTS = `anecdotage.com`;
import axios from 'axios'; // Use ESM import

export default {
  mode: 'universal',
  target: 'static',
  ssr:true,
  serverMiddleware: [
    '~/plugins/logger.js'
  ],
  head: {
    title: 'Anecdotage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap', async: true },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css', async: true },
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js', defer: true },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js', defer: true },
      {
        src: 'https://cdn.ckeditor.com/4.10.0/standard/ckeditor.js',
        defer: true
      },
      { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4366805194029390', defer: true, crossorigin: "anonymous" },
    ]
  },
  loading: { color: '#007bff', height: '5px' },
  css: ['@/assets/scss/main.scss'],
  render: {
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
  },
  plugins: [
    '~plugins/vform',
     '~/plugins/error-handler.js',
    '~/plugins/toastNotification',
    { src: '~/plugins/gmaps', ssr: false },
    { src: '~/plugins/echo', ssr: false },
  ],
  buildModules: [
    '@nuxtjs/router',
    [
      '@nuxtjs/laravel-echo',
      {
        broadcaster: 'pusher',
        key: process.env.PUSHER_APP_KEY,
        cluster: process.env.PUSHER_APP_CLUSTER,
        encrypted: false,
        wsHost: process.env.WEBSOCKET_BASE_URL,
        authEndpoint: process.env.API_URL + '/broadcasting/auth',
        wsPort: 6001,
        wssPort: 6001,
        disableStats: true,
        forceTLS: false,
        enabledTransports: ["ws", "wss"],
      },
    ],
    'nuxt-compress'
  ],
  echo: {
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true
  },
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/robots',
    ['nuxt-lazy-load', {
      defaultImage: '/lazy.gif',
      directiveOnly: true
    }],
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap',
  ],
  sitemap: {
    hostname: 'https://anecdotage.com',
    gzip: true,
    exclude: [
      '/admin/**'
    ],
    routes: async () => {
      let staticRoutes = [
        '/', '/faq', '/tos', '/privacy', '/contact', '/login', '/register', '/anecdotes/maps', '/anecdotes/rated', '/anecdotes/trending', '/anecdotes/viewed', '/anecdotes/recent', '/anecdotes/closest', '/anecdotes/video',
      ];

      let threads = await axios.get(`${process.env.API_URL}/sitemap/threads`);
      const threadRoutes = threads.data.map(item => `/anecdotes/${item}`);
      return threadRoutes;
    }
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    autoTracking: {
      screenview: true
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get', propertyName: 'data' },
        }
      }
    }
  },
  axios: {
    baseURL: process.env.API_URL,
  },
  robots: [
    {
      UserAgent: 'PetalBot',
      Disallow: '/',
    },
    {
      UserAgent: 'MJ12bot',
      Disallow: '/',
    },
    {
      UserAgent: 'Bytespider',
      Disallow: '/',
    },
    {
      UserAgent: 'SemrushBot',
      Disallow: '/',
    },
    {
      UserAgent: '*',
      Disallow: ['/admin', '/profile', '/api/*', '/?page=1', '/anecdotes/most-viewed/', '/anecdotes/last-viewed/', '/anecdotes/top-rated/', '/anecdotes/videos/', '/anecdotes/closest/', '/anecdotes/trending/', '/anecdotes/newest/', '/anecdotes/emoji/*'],
    },
  ],
  build: {
    publicPath: '/_nuxt/',
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js'
    },
    extend(config, ctx) { },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        removeComments: true,
      }
    },
  },
  router: {
    base: process.env.NODE_ENV === 'dev' ? '/' : '/',
    trailingSlash: true,
  },
  generate:{
    dir: 'dist', 
  }
};

