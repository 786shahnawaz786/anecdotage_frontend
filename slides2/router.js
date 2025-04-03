import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const page = (path) => () =>
  import(`~/pages/${path}`).then((m) => m.default || m);

const routes = [
  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/about', name: 'about', component: page('about.vue') },
  { path: '/contact', name: 'contact', component: page('contact.vue') },
  { path: '/faq', name: 'faq', component: page('faq.vue') },
  { path: '/privacy', name: 'privacy', component: page('privacy.vue') },
  { path: '/screenshots', name: 'screenshots', component: page('screenshots.vue') },

  {
    path: '/admin',
    name: 'admin.show',
    redirect: { name: 'admin.show.settings' },
    component: page('admins/index.vue'),
    children: [
      {
        path: '',
        name: 'admin.show.settings',
        component: page('admins/settings.vue')
      },
      {
        path: 'logo',
        name: 'admin.show.settings.logo',
        component: page('admins/logo.vue')
      },
      {
        path: 'faq',
        name: 'admin.show.faq',
        component: page('admins/faq.vue')
      },
      {
        path: 'about',
        name: 'admin.show.about',
        component: page('admins/about.vue')
      },
      {
        path: 'privacy',
        name: 'admin.show.privacy',
        component: page('admins/privacy.vue')
      },
      {
        path: 'categories',
        name: 'admin.show.categories',
        component: page('admins/categories.vue')
      },
      {
        path: 'screenshots',
        name: 'admin.show.screenshots',
        component: page('admins/screenshots.vue')
      },
      {
        path: 'slide/:slug',
        name: 'admin.show.slide.edit',
        component: page('admins/slide.vue')
      },
    ]
  },

  { path: '/stories4phantom/:slug', name: 'phantom', component: page('phantom.vue') },
  { path: '/potraits/:slug', name: 'potraits', component: page('potraits.vue') },
  { path: '/:route?', name: 'index', component: page('index.vue') },
  { path: '/category/:category/:route?', name: 'category', component: page('category.vue') },
];

export function createRouter() {
  return new Router({
    routes,
    mode: 'history',
    base: process.env.SUB_FOLDER,
    trailingSlash: true,

    scrollBehavior: function (to) {
      if (to.hash) {
          return {
          selector: to.hash,
          behavior: 'smooth',

        }
      }
    },
  });
}
