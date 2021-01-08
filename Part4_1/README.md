### 1. 请简述 React 16 版本中初始渲染的流程

- react 16 采用的 Fiber 的渲染方式，即从父节点开始，向下依次遍历子节点，深度优先渲染完子节点后，再回到其父节点去检查是否有兄弟节点，如果有兄弟节点，则从该兄弟节点开始继续深度优先的渲染，直到回退到根节点结束。


### 2. 为什么 React 16 版本中 render 阶段放弃了使用递归

- 因为递归无法中断，执行重任务耗时长，js又是单线程的，无法同时执行其他的任务，导致任务延迟，页面卡顿，用户体验较差，所以React 16 改成Fiber方案


### 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

- current fiber tree: 在首次渲染时，React不需要产生任何更新信息，而是会给每个从render方法返回的element生成一个fiber节点，最终生成一个fiber节点树， 后续的更新也是复用了这棵fiber树。

- workInProgress fiber tree: 所有的更新计算工作都在workInProgress tree的fiber上执行。当React 遍历current fiber tree时，它为每个current fiber 创建一个替代（alternate）节点，这样的alternate节点构成了workInProgress tree

- effect list fiber tree: workInProgress fiber tree 的子树，这个树的作用串联了标记具有更新的节点


### 4. 请简述 workInProgress Fiber 树存在的意义是什么

- 当 React 遍历 current 树时，它会为每一个存在的 fiber 节点创建了一个替代节点，这些节点构成一个 workInProgress 树。后续所有发生 work 的地方都是在 workInProgress 树中执行，如果该树还未创建，则会创建一个 current 树的副本，作为 workInProgress 树。当 workInProgress 树被提交后将会在 commit 阶段的某一子阶段被替换成为 current 树

- workInProgress 树的存在主要原因是为了避免更新的丢失。如果我们只增加更新到 workInProgress 树，当 workInProgress 树通过从 current 树中克隆而重新开始时，一些更新可能会丢失。同样的，如果我们只增加更新到 current 树，当 workInProgress 树被提交后会被替换为 current 树，更新也会被丢失。通过在两个队列都保持更新，可以确保更新始终是下一个 workInProgress 树的一部分。