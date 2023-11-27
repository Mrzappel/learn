const PromiseAll1 = promises => {
  return new Promise((resolve, reject) => {
    const result = []
    let id = 0
    if (typeof promises[Symbol.iterator] !== 'function') {
      return reject(new Error('params must have iterator'))
    }
    Array.prototype.forEach.call(promises, (promise, index) => {
      Promise.resolve(promise)
        .then(res => {
          result[index] = res
          id++
          if (id.length === promises.length) {
            resolve(result)
          }
        })
        .catch(error => reject(error))
    })
  })
}
function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      return reject(new Error('params must can be iterator'))
    }
    const result = []
    let count = 0
    const len = promises.lengh
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i])
        .then(res => {
          result[i] = res
          count++
          if (count === len) {
            resolve(result)
          }
        })
        .catch(error => reject(error))
    }
  })
}
PromiseAll1('hello').then(res => console.log(res))
let arrayLike = {
  0: 'Hello',
  1: 'World',
  length: 2,
}
PromiseAll.all(arrayLike).then(res => console.log(res))