

//https://juejin.cn/post/7069805387490263047#heading-3
/**
 * 
 * @param {*} promise.all
 * @returns Promise
 */
function promiseAll(promiseArray) {
  if (!Array.isArray(promiseArray)) {
    return new Error('type console')
  }
  return new Promise((resolve, reject) => {
    let arr = [], count = 0
    promiseArray.forEach((promise, id) => {
      Promise.resolve(promise).then(res => {
        // resolve()
        arr[id] = res
        count += 1

        if (promiseArray.length === count) resolve(arr)
      }, reject)
    })
  }
}

function PromiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      Promise.resolve(promise).then(resolve,reject)
    }
  })
}











// function throttle(fn, delay) {
//   let last
//   let now = new Date()
//   return function (...args) {
//     if (now - last > delay) {
//       fn.call(this, ...args)
//       last = now
//     }
//   }
// }