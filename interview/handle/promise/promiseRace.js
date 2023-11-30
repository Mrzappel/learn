const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 延时一秒')
  }, 1000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3 延时两秒')
  }, 2000)
})

// const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p5 rejected 延时1.5秒')
  }, 1500)
})


const myPromiseRace = promises => {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject(new Error('params is not iterable'))
    }
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject)
    })
  })
}
myPromiseRace([p5, p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log(err)) // 1s后打印: p2 延时一秒