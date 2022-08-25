const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve,reject) =>{
    // resolve('success')
    // reject('reason')
    setTimeout(() =>{
        resolve('sucess')
    },2000)

})
// promise.then(value => {
//     console.log('resolve',value)
// },reson =>{
//     console.log('reject',reson)
// })
promise.then(value => {
    console.log(1)
    console.log('resolve', value)
  })
   
promise.then(value => {
    console.log(2)
    console.log('resolve', value)
  })
  
promise.then(value => {
    console.log(3)
    console.log('resolve', value)
  })
//原型链的继承
function Parent() {
    this.name = 'parent'
}
Parent.prototype.getName = function () {
    return this.name
}
function Child() {
    this.name = 'child'
}
Child.prototype = new Parent()
Child.prototype.getName = function () {
    return this.name
}
let child = new Child()
