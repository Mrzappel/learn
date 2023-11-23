

//https://juejin.cn/post/7069805387490263047#heading-3
/**
 * 
 * @param {*} promise.all
 * @returns Promise
 */

//new Array()中传入长度即可生成指定长度数组
//注意拼写，每次的resolve结果要存起来放在一个数组中
function PromiseAll001 (promises) {

  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new Error('params must be Array'))
    }
    let count = 0
    const arr = new Array(promises.length)
    promises.forEach((promise, id) => {
      Promise.resolve(promise).then((res) => {
        arr[id] = res
        count++
        if (count === arr.length) {
          resolve(arr)
        }
      }).catch(reject)
    })
  })
}


/**
 * 
 * @param {*} promise.all
 * @returns Promise
 */
function promiseAll (promiseArray) {
  if (!Array.isArray(promiseArray)) {
    return new Error('type console')
  }
  let arr = [], count = 0
  return new Promise((resolve, reject) => {

    promiseArray.forEach((promise, id) => {
      Promise.resolve(promise).then(res => {
        // resolve()
        arr[id] = res
        count += 1

        if (promiseArray.length === count) resolve(arr)
      }, reject)
    })
  })
}

function PromiseRace (promises) {
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      Promise.resolve(promise).then(resolve, reject)
    }
  })
}

function PromiseAllSec (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new Error('the vairabel should be Array'))
    }
    let arr = new Array(promises.length)
    let count = 0  
    promises.forEach((promise,id) => {
      Promise.resolve(promise).then(res => {
        arr[id] = res
        count++
        if (count === arr.length) {
          resolve(arr)
        }
      },reject)
    })
  })
}

// const PromiseAll001 = function (promises) {
//   let arr = [],
//     count = 0
//   return new Promise((resolve, reject) => {
//     promises.forEach((item, i) => {
//       Promise.resolve(item).then(res => {
//         arr[i] = res
//         count += 1
//         if (count === promises.length) resolve(arr)
//       }, reject)
//     })
//   })
// }

export {
  PromiseAll001,
  PromiseAllSec
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