/**
 * 高程继承相关知识梳理
 */
function Cc(age) {
  this.age = age
}
let c = new Cc('18')
const P = Cc.prototype
const p = c.__proto__
console.log('111', Cc.prototype === Object.getPrototypeOf(c))
console.log(Cc.prototype, Object.getPrototypeOf(c), c.__proto__);
console.log('22',Cc.prototype.constructor === c.__proto__.constructor)