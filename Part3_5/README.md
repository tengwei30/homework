### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

- 1、代码管理上的优化：采用 monorepo 进行源码的管理
  - monorepo 根据功能将不同的模块拆分到 packages 目录下面的子目录中，每个 package 有各自的 API、类型定义和测试。这样使得模块拆分更细化，职责划分更明确
- 2、代码采用 typescript 进行重构
- 3、vue3.0 引入 composition API, 可以将单一逻辑关注点封装到一个函数中，不同于 vue2.0 OptionsAPI 一个组件可能多个逻辑关注点，更便于组织代码和维护
- 4、数据的响应式改用 Proxy 的方式， 对于对象属性的增加和删除都可以监听到

### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x 使用的 Options Api 有什么区别？

Option API

- 包含一个描述组件选项（data,methods,props）的对象
- 开发复杂组件，同一个功能代码被拆分到不同选项中

Composition API

- 一组基于函数的 API
- 可以灵活的组织组件的逻辑
- 更好的类型推导，容易集合 TypeScript

### 3、Proxy 相对于 Object.defineProperty 有哪些优点？

- vue2 中采用 defineProperty 来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加 getter 和 setter，来实现响应式
- vue3 采用 proxy 重写了响应式系统，因为 proxy 可以对整个对象进行监听，所以不需要深度遍历
  - 可以监听动态属性的添加
  - 可以监听到数组的索引和数组 length 属性
  - 可以监听删除属性

### 4、Vue 3.0 在编译方面有哪些优化？

- 标记和提升所有静态根节点,diff 过程只需要对比动态节点
- Fragments
- 静态提升
- Patch flag
- 缓存事件处理函数

### 5、Vue.js 3.0 响应式系统的实现原理？

- Vue3 使用 Proxy 对象重写响应式系统，这个系统主要有以下几个函数来组合完成的
- 1、reactive

  - 接受一个参数，typeof 判断这个参数是否是对象，不是对象直接返回这个参数，不能用 reactive 做响应式处理
  - 是对象，创建响应拦截器 handler,里面实现 get/set/deleteProperty
  - get：通过 track 收集依赖,通过 Reflect.get 获取当前 key 的值，注意这里如果 key 的值是个对象，要为该对象创建响应拦截器递归调用 reactive
  - set：先比较新旧 value 是否相等，相等直接返回,不想等，通过 Reflect.set 设置新的 value,并通过 trigger 触发更新，最后记得返回 boolean 值，否则会报 warn
  - deleteProperty:当前对象有这个 key 值，删除这个 key，并通过 trigger 触发更新，最后记得返回 boolean 值，否则会报 warn

- 2.effect
  - 接受一个函数作为参数，记得把函数赋值给全局对象 activeEffect，作用是访问响应式对象属性时区收集依赖
- 3.track
  - 接受两个参数 target 和 key
  - 如果没有 activeEffect，则说明没有创建 effect 依赖
  - 如果有 activeEffect，则去判断 WeakMap 集合中是否有 target 属性
    - WeakMap 集合中没有 target 属性，则 set(target, (depsMap = new Map()))
    - WeakMap 集合中有 target 属性，则判断 target 属性的 map 值的 depsMap 中是否有 key 属性
      - depsMap 中没有 key 属性，则 set(key, (dep = new Set()))
      - depsMap 中有 key 属性，则添加这个 activeEffect
- 4.trigger
  - 判断 WeakMap 中是否有 target 属性
    - WeakMap 中没有 target 属性，则没有 target 相应的依赖
    - WeakMap 中有 target 属性，则判断 target 属性的 map 值中是否有 key 属性，有的话循环触发收集的 effect()
