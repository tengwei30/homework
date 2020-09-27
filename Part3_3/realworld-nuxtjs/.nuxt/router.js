import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3af8753e = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _30cde3f3 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _2db23a56 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _14205215 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _012a0137 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _2f299b81 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _0a2ad53c = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _3af8753e,
    children: [{
      path: "",
      component: _30cde3f3,
      name: "home"
    }, {
      path: "/login",
      component: _2db23a56,
      name: "login"
    }, {
      path: "/register",
      component: _2db23a56,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _14205215,
      name: "profile"
    }, {
      path: "/settings",
      component: _012a0137,
      name: "settings "
    }, {
      path: "/editor",
      component: _2f299b81,
      name: "editor "
    }, {
      path: "/article/:slug",
      component: _0a2ad53c,
      name: "article "
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
