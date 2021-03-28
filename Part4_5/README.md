# 张嵩 ｜ Module 4 | 章节 5

### 1、通过该项目，请简要说明 typescript 比 javascript 的优势在哪？

- 静态类型化，可以在开发编写的时候就检测出来错误，得代码质量更好、更清晰。
- TypeScript让项目变的更容易、更快捷、更可维护

### 2、请简述一下支付流程

- 用户提交订单
- 调用支付宝开放平台支付接口创建订单支付支付页面并返回
- 用户跳转跳转到支付宝进行支付
- 支付成功会跳转到支付成功页面
- 支付完成

### 3、react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？

- react-redux配合redux使用，将redux定义的store数据注入到组件中，可以使组件轻松的拿到全局状态，方便组件间的通信。使react组件与redux数据中心（store）联系起来，调用dispatch函数修改数据状态后，触发通过subscribe注册更新视图的处理逻辑，包括需要渲染的数据和更新数据的函数。

常用的API

- Provider组件：提供共享的store，HOC（高阶组件），Provider 返回一个HOC（高阶组件）的函数：conncet。
- connect方法：从store中获取数据和方法，注入组件，返回包含数据和方法的高阶组件。接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。 mapDispatchToProps() connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
- useSelector方法：与connect获取数据的作用一样，即获取组件所需的store中的数据
- useDispatch方法：与connect获取数据更新方法的作用一样，即获取dispatch方法，用于发送action来更新store中的数据。
- applyMiddleware applyMiddleware(…middlewares) 引入中间件，比如我们经常使用的用于处理异步action的redux-thunk 中间件。实际上，中间件是一个函数，对store.dispatch函数进行了改造，在发出action和执行reducer之间，增加了一些其他的功能。
- compose compose是一个返回依次执行参数里面的方法的函数， 其内部是通过Array.prototype.reduceRight 函数实现的，一般redux项目使用多个中间件时会用到。
- mapStateToProps() mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个todos属性，代表 UI 组件的同名参数，后面的getVisibleTodos也是一个函数，可以从state算出 todos 的值。

### 4、redux 中的异步如何处理？
- 主要通过applyMiddleware函数，借助redux中间件来处理，即通过中间件模式将原始dispatch函数进行封装处理，形成洋葱模型，将原始dispatch函数作为参数传递，在处理异步事件时，再调用原始dispatch函数修改数据状态。