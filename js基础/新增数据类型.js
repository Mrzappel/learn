// 通过add方法向Set结构加入成员，结果表明Set结构不会添加重复的值
// let a = new Set()
// const b= [1,2,3,4,1,2,3].map(x => a.add(x))
// console.log(b)

//数组去重
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
console.log([...new Set(numbers)])
console.log(Array.from(new Set(numbers)))
let a = {
  0: 'add',
  1: 'sub',
  2: 'sum',
  length:3
}
console.log(Array.from(a))
//Array.from将类数组转换成数组

// var items = new Set([1,2,3,4,5,5,5,5]);
// console.log(items.size)

// let set = new Set(['red', 'green', 'blue']);
// for ( let item of set.values() ){
//   console.log(item);
// }
// function Father() {
//   this.property = true;
// }//父类
// Father.prototype.getFatherValue = function () {
//   return this.property;
// }//父类方法
// function Son() {
//   this.sonProperty = false;
// }
// //继承 Father
// Son.prototype = new Father();//Son.prototype被重写,导致Son.prototype.constructor也一同被重写
// Son.prototype.getSonVaule = function () {
//   return this.sonProperty;
// }
// var instance = new Son();
// console.log(instance.getFatherValue())
// console.log(Father.prototype.isPrototypeOf(instance))

//https://juejin.cn/post/6844903475021627400
//https://juejin.cn/post/7072149856139083812
//https://juejin.cn/post/6844903696111763470