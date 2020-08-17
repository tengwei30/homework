# 张嵩 | Part3 | Module1

## 简答题

### 第一题：当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。

- 不是；因为 Vue 的响应式数据的创建是在 new Vue 的时候就创建好的～ vue 实例化之后的添加仅仅就是往 vue 的
- 的实例中添加了个属性而已，

### 第二题： 请简述 Diff 算法的执行过程

- diff 的过程就是调用 patch 函数，比较新旧节点，并给真实的 DOM 打补丁。
- patch 函数接收两个参数 oldVnode 和 Vnode 分别代表新的节点和之前的旧节点,
  这个函数会比较 oldVnode 和 vnode 是否是相同的,
  即函数 sameVnode(oldVnode, vnode), 根据这个函数的返回结果若为 true
  则执行 patchVnode，为 false 则用 vnode 替换 oldVnode
