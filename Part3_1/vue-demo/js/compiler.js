class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模版，处理文本节点和元素节点
  compile(el) {
    if (!el) return
    let childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        // 处理文本节点
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点，处理指令
  compileElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach((attr) => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // v-text ---> text
        attrName = attrName.substr(2)
        let key = attr.value

        // 在这处理事件指令
        if (this.isEventDirective(attrName)) {
          this.eventHandler(node, this.vm, key, attrName)
        }
        this.update(node, key, attrName)
      }
    })
  }

  //  事件处理
  eventHandler(node, vm, key, dir) {
    let eventType = dir.split(':')[1],
      fn = vm.$options.methods && vm.$options.methods[key]

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  }

  update(node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key) // call 用来改变this指向
  }

  htmlUpdater(node, value, key) {
    // 处理 v-html 指令
    node.innerHTML = value
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue
    })
  }

  textUpdater(node, value, key) {
    // 处理v-text 指令
    node.textContent = value
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }

  modelUpdater(node, value, key) {
    // 处理 v-model
    node.value = value
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })

    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // 编译文本节点，处理差值表达式
  compileText(node) {
    // console.dir(node)
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      //RegExp.$1 表示匹配正则的第一个分组内容
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher 对象，当数据变化时更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 判断是否是 on 事件
  isEventDirective(dir) {
    return dir.indexOf('on') === 0
  }
}
