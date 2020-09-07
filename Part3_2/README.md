# 张嵩 | Part3 | Module2

## 简单题

### 第一题 请简述 Vue 首次渲染的过程。

- 首先进行 Vue 的初始化，初始化实例成员和静态成员
- 调用构造函数 new Vue(), 在构造函数中调用 \_init() 方法，相当于整个应用的入口
- 在 \_init() 方法中调用$mount(), $mount()的核心作用是帮我们把模板编译成 render 函数，
  它首先会判断一下当前是否已经传入 render() 函数，如果没有传入 render() 会把 template 模版
  编译成 render 函数，如果 template 模版也没有的话就会默认把 el 的内容编译成 render
- 然后调用 mountComponent()，在 mountComponent()中，首先会判断 render 选项，
  如果没有 render 选项，但是我们传入了模板，并且当前是开发环境的话会发送一个警告，
  目的是如果我们当前使用运行时版本的 Vue,而且我们没有传入 render,但是传入了模版,
  告诉我们运行时版本不支持编译器。接下来会触发 beforeMount 这个生命周期中的钩子函数
- 然后定义了 updateComponent()，在这个函数中，调用 vm.\_render 和 vm.\_update，
  vm.\_render 的作用是生成虚拟 DOM，vm.\_update 的作用是将虚拟 DOM 转换成真实 DOM，并且挂载到页面上
- 创建 Watcher 对象，在创建 Watcher 时，传递了 updateComponent 这个函数，这个函数最终是在 Watcher 内部调用的。
  在 Watcher 内部会用了 get 方法，当 Watcher 创建完成之后,会触发生命周期中的 mounted 钩子函数,在 get 方法中，会调用 updateComponent()
- 返回 Vue 实例。

### 第二题 请简述 Vue 响应式原理。

- 首先调用 initState() 方法初始化 Vue 实例的状态，在 initState() 方法中调用 initData() 把 data 属性
  注入到 Vue 实列中，并调用 observe() 方法把 data 对象转成响应式的对象
- oberve(value) 中判断当前传入的值是否是对象，如果不是直接返回，
  判断 value 对象是否有**ob**，如果有直接返回，如果没有，创建 observer 对象，返回 observer 对象
- observer 类中会对数组和对象进行响应式处理，并调用 walk 方法，walk 方法就是遍历对象的所有属性，
  并让每一个属性调用 defineReactive()
- 执行 defineReactive()，为每一个属性创建 dep 对象，并定义 geter 和 setter 方法，getter 的作用就是负责
  收集依赖，返回属性的值，setter 的作用就是派发通知，调用 dep.notify() 方法
- 依赖收集，在 watcher 对象的 get 方法中调用 pushTarget 记录 Dep.target 属性
  在访问 data 中的所有成员的时候收集依赖，在 defineReactive 的 getter 收集依赖
  然后把属性对应的 watcher 对象添加到 dep 的 subs 数组中，给 childOb 收集依赖为自对象收集依赖
- 当数据发生变化的时候，会调用 dep.notify() 发送通知，再调用 watcher 对象中的 update() 方法
  在 update() 中调用 queueWatcher() 函数判断 watcher 是否被处理啦，如果没有就添加到 queue 队列中，
  并调用 flushScheduleQueue() 方法，然后触发 beforeUpdate() 钩子函数，然后调用 watcher.run() 方法
  数据更新到视图

### 第三题 请简述虚拟 DOM 中 Key 的作用和好处。

- 作用就是为每个节点设置一个 key 属性，以便它能够跟踪每个节点的身份，从而重用和重新排序现用元素
- 好处：可以减少 dom 的操作，减少 diff 计算和渲染所需要的时间，提升了性能。

### 第四题 请简述 Vue 中模板编译的过程。

- vue 中模版通过 compiler 编译成 AST 语法树，也就是说 AST 是一个用来表示源代码的 js 对象
- 然后将 AST 对象生成对象的 render 函数，render 函数然后生成虚拟节点 vNode 用来描述节点和子节点的信息
- vNode 的集合组成 vDOM，最后生成真实 DOM
