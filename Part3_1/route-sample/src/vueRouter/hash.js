let _Vue = null

export default class VueRouter {
  // 判断当前插件是否已经被安装
  static install(Vue) {
    if (VueRouter.install.installed) {
      return
    }

    // 把Vue 构造函数记录到全局变量
    VueRouter.install.installed = true
    _Vue = Vue

    // 把创建Vue实列时候传入的router对象注入到vue实例上
    // 混入  混入的作用就是让this指向router的实例，如果不用混入则this指向的是当前这个类
    _Vue.mixin({
      beforeCreate() {
        //  组件中没有 $options 属性，如果是vue实例中才会执行一次
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      },
    })
  }

  constructor(options) {
    this.$options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      // data是响应式的对象
      current: '#/', // 用来存储当前路由地址
    })
  }

  createRouteMap() {
    // 遍历所有的路由规则，把理由规则解析成键值对的形式，存储到routeMap中
    this.$options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component
    })
  }
  initComponents(Vue) {
    // 需要创建两个组件
    Vue.component('router-link', {
      props: {
        to: String,
      },
      render(h) {
        // h 函数接受三个参数（选择器，属性（attrs设置），设置标签中的属性） h函数的作用就是帮我们创建虚拟DOM
        return h(
          'a',
          {
            attrs: {
              href: this.to,
            },
          },
          [this.$slots.default]
        )
      },
      // template: '<a :href="to"><slot></slot></a>',
    })

    const self = this
    Vue.component('router-view', {
      render(h) {
        // 获取当前路由地址对应的当前路由组件
        const component = self.routeMap[self.data.current]
          ? self.routeMap[self.data.current]
          : self.routeMap['*']
        return h(component)
      },
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  // 获取当前 hash 串
  getHash() {
    return window.location.hash.slice(1) || '/'
  }

  // 设置当前路径
  onHashChange() {
    this.data.current = this.getHash()
  }

  initEvent() {
    // 用来注册hashchange 事件
    window.addEventListener('load', this.onHashChange.bind(this), false)
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
  }
}
