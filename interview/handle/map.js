Array.prototype.myMap = function (callback) {
  const arrays = []
  const origin = this
  for (let i = 0; i < origin.length; i++) {
    arrays[i] = callback(origin[i], i, origin)
  }
  return arrays
}

Array.prototype.myForEach = function (callback) {
  const origin = this
  for (let i = 0; i < origin.length; i++) {
    callback(origin[i], i, origin)
  }
}
const arr = [1, 2, 3, 4, 5]
arr.forEach((item, id, arr) => console.log(item, id, arr))
arr.myForEach((item, id, arr) => console.log(item, id, arr))

// console.log(arr.myMap(item => item * 2))
// console.log(arr.map(item => item * 2))

// arr.map((item, index, arr) => {
//   console.log(item, index, arr)
// })
// arr.myMap((item, index, arr) => {
//   console.log(item, index, arr)
// })
