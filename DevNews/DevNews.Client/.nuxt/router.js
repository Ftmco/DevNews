import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _17cf27a8 = () => interopDefault(import('..\\pages\\account\\login.vue' /* webpackChunkName: "pages/account/login" */))
const _4adae7ac = () => interopDefault(import('..\\pages\\account\\profile.vue' /* webpackChunkName: "pages/account/profile" */))
const _307b1220 = () => interopDefault(import('..\\pages\\channel\\channel.vue' /* webpackChunkName: "pages/channel/channel" */))
const _14380833 = () => interopDefault(import('..\\pages\\channel\\channels.vue' /* webpackChunkName: "pages/channel/channels" */))
const _834efe1c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/account/login",
    component: _17cf27a8,
    name: "account-login"
  }, {
    path: "/account/profile",
    component: _4adae7ac,
    name: "account-profile"
  }, {
    path: "/channel/channel",
    component: _307b1220,
    name: "channel-channel"
  }, {
    path: "/channel/channels",
    component: _14380833,
    name: "channel-channels"
  }, {
    path: "/",
    component: _834efe1c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
