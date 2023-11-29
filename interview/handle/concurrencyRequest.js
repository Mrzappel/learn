function concurrencyRequest(urls, maxNum) {
  let len = urls.length
  let result = new Array(len).fill(false)
  let count = 0

  return new Promise((resolve, reject) => {
    while (count < maxNum) {
      next()
    }
    function next() {
      let current = count++
      if (current >= len) {
        // 请求全部完成
        if (!result.includes(false)) {
          resolve(result)
        }
        return
      }
      let url = urls[current]
      console.log(`开始 ${current}`, new Date().toLocaleString())
      fetch(url)
        .then(res => {
          result[current] = res
          console.log(`完成 ${current}`, new Date().toLocaleString())
          if (current < len) {
            next()
          }
        })
        .catch(err => {
          console.log(`结束 ${current}`, new Date().toLocaleString())
          result[current] = err
          if (current < len) {
            next()
          }
        })
    }
  })
}

// const urls = []
// for (let i = 1; i <= 20; i++) {
//   urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
// }
// concurrencyRequest(urls, 3).then(res => {
//   // console.log(res)
// })
// 并发请求函数
const concurrencyRequest = (urls, maxNum) => {
  return new Promise(resolve => {
    if (urls.length === 0) {
      resolve([])
      return
    }
    const results = []
    let index = 0 // 下一个请求的下标
    let count = 0 // 当前请求完成的数量

    // 发送请求
    async function request() {
      if (index === urls.length) return
      const i = index // 保存序号，使result和urls相对应
      const url = urls[index]
      index++
      console.log(url)
      try {
        const resp = await fetch(url)
        // resp 加入到results
        results[i] = resp
      } catch (err) {
        // err 加入到results
        results[i] = err
      } finally {
        count++
        // 判断是否所有的请求都已完成
        if (count === urls.length) {
          console.log('完成了')
          resolve(results)
        }
        request()
      }
    }

    // maxNum和urls.length取最小进行调用
    const times = Math.min(maxNum, urls.length)
    for (let i = 0; i < times; i++) {
      request()
    }
  })
}

const requestLimit = (urls, max) => {
  const len = urls.length
  const maxNum = Math.min(urls.length, max)
  // let count = 0
  let count = 0
  let result = new Array(len).fill(false)
  return new Promise(resolve => {
    const next = async () => {
      let current = count++
      if (count > len) {
        if (!result.includes(false)) {
          resolve(result)
        }
        return
      }
      console.log(`开始 ${current}`, new Date().toLocaleString())
      try {
        const res = await fetch(urls[current])
        console.log(`完成 ${current}`, new Date().toLocaleString())
        result[current] = res
      } catch (error) {
        result[current] = error
      } finally {
        console.log(`结束 ${current}`, new Date().toLocaleString())
        if (current < len) {
          next()
        }
      }
    }
    while (count < maxNum) {
      next()
    }
  })
}
const urls = []
for (let i = 1; i <= 20; i++) {
  urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
}
requestLimit(urls, 3).then(res => {
  // console.log(res)
})
