import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _14476cca = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _74652b90 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _18788ed8 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _9491ed50 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _db2b9b58 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _2be52044 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _c6fd66b6 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _14476cca,
    children: [{
      path: "",
      component: _74652b90,
      name: "home"
    }, {
      path: "/login",
      component: _18788ed8,
      name: "login"
    }, {
      path: "/register",
      component: _18788ed8,
      name: "register"
    }, {
      path: "/profile",
      component: _9491ed50,
      name: "profile"
    }, {
      path: "/settings",
      component: _db2b9b58,
      name: "settings"
    }, {
      path: "/editor",
      component: _2be52044,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _c6fd66b6,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
