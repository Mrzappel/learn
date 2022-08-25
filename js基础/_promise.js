/**
 * 实现一个promise.all
 */
function promiseAll(array) {
  return new Promise((resolve,reject))
}
//实现promise.all
function promiseAll(array) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    let len = array.length
    array.forEach((item, i) => {
      Promise.resolve(item).then(res => {
        result[i] = res
        count++
        if (len == count) {
          resolve(result)
        }
      }).catch(e => reject(e))
   }) 
  }
  )
}
