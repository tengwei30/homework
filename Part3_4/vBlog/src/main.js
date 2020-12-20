// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DefaultLayout from '~/layouts/Default.vue'
import '~/base.css'

export default function(Vue, { router, head, isClient }) {
  Vue.use(ElementUI)
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
