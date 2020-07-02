# 张嵩 | Part1 | Module2

## 简单题

### 第一题

**描述引用计数的工作原理和优缺点**

- 原理：给每个对象设置一个引用数，判断当前的引用数是否为 0，0 的化就回收
- 优点：可以做到发现垃圾就及时回收，减少了程序的暂停
- 缺点：无法回收循环嵌套引用的对象，比较耗时

### 第二题

**描述标记整理算法的工作原理**

- 先去循环的找到所有的活动活动做标记
- 重新整理和移动标记与未标记对象，使其像一个连续的空间对象
- 进行垃圾回收

### 第三题

**描述 V8 新生代存储区垃圾回收的流程**

- 将新生代内存去分为使用空间 From（存放活动对象） 和 空闲空间 To
- 通过标记整理后将标记的活动对象复制到 To 空间中
- From 和 To 空间进行交换空间完成释放

### 第四题

**描述增量标记算法在何时使用及工作原理**

- 当需要回收的垃圾对象非常大或者对象的层级嵌套比较深的时候会用增量标记来优化回收效率
- 原理：当原来需要一次性回收的垃圾对象遍历分成 N 小段进行回收

## 简单题

### 练习一

```js
const fp = require('lodash/fp')

const cars = [{
  ...
}]

const isLastInStock = fp.flowRight(
  fp.prop('in_stock'),
  fp.last
)
isLastInStock(cars)
```

### 练习二

```js
const isFirstName = fp.flowRight(
  fp.prop('name'),
  fp.first
)
isFirstName(cars)
```

### 练习三

```js
const _averageDollarValue = fp.flowRight(
  _average,
  fp.map(fp.prop('dollar_value'))
)
_averageDollarValue(cars)
```

### 练习四

```js
const sanitizeNames = fp.flowRight(
  fp.split(','),
  _underscore,
  fp.toLower,
  fp.join('')
)
sanitizeNames(['Hello World'])
```
