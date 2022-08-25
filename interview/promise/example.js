// test.js

// const MyPromise = require('./MyPromise')

// MyPromise.resolve().then(() => {
//   console.log(0)
//   return MyPromise.resolve(4)
// }).then((res) => {
//   console.log(res)
// })
// // const promise = new MyPromise((resolve, reject) => {
//   // setTimeout(() => {
//   //   resolve('success')
//   // }, 2000);
// resolve('success')
// reject('err')
// resolve('100')
// throw new Error('执行器错误')

// })
// promise.then().then().then(value => console.log(value))
// promise.then().then().then(value => console.log(value), reason => console.log(reason))

// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
// }, reason => {
//   console.log(2)
//   console.log(reason.message)
// })
// const p1 = promise.then(value => {
//   console.log(value)
//   return p1
// })

// const promise = new Promise((resolve, reject) => {
//   resolve(100)
// })
// promise.then().then().then(value => console.log(value))
// promise
//   .then()
//   .then()
//   .then()
//   .then(value => console.log(value))

// const p1 = promise.then(value => {
//   console.log(value)
//   return p1
// })
// const p1 = promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return p1
// })
// p1.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// }, reason => {
//   console.log(3)
//   console.log(reason.message)
// })


// function other() {
//   return new MyPromise((resolve, reject) => {
//     resolve('other')
//   })
// }

// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   throw new Error('then error')
// }, reson => {
//   console.log(2)
//   console.log(reason.message)
// }).then(value => {
//   console.log(3)
//   console.log('resolve', value)
// }, reason => {
//   console.log(4)
//   console.log(reason.message)
// })

// promise.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

// promise.then(value => {
//   console.log(3)
//   console.log('resolve', value)
// })

// 3
// resolve success

// 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
// test.js

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10)
  }, 1000)
}).then(() => {
  throw Error("1123")
}).catch((err) => {
  console.log(err);
})
  .then(() => {
    console.log('异常捕获后可以继续.then');
  })


