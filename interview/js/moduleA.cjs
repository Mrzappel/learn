// import obj from './moduleB.js'
let { obj } = require('./moduleB.cjs')
// obj.age = 19
obj = {a:1}
obj.a = 2
console.log(obj, '我是后')

// esmodule 和 common js 修改导出值时原来的值会发生什么？
// esmodule: 会报错，因为esmodule导入的值是只读的
// common js: 不会报错，因为common js导入的值是复制了一份，修改的是复制的值，不会影响原来的值
// 为什么common js可以修改导出值？
// 因为common js导入的是复制的值，修改的是复制的值，不会影响原来的值
// 为什么esmodule不可以修改导出值？
// 因为esmodule导入的是只读的值，不可以修改
// esmodule和common js的导入导出的值是什么？
// esmodule导入导出的值是值的引用
// common js导入导出的值是值的复制

