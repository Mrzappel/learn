var a = 0
var total = 0
var result = []
function foo(a) {
  var i = 0
  for (; i < 3; i++) {
    result[i] = function () {
      total += i * a
      console.log(total)
    }
  }
}
foo(1)
result[0]()
result[1]()
result[2]()

// async function async1() {
//     console.log('async1 start')
//     await async2()
//     console.log('async1 end')
// }
    
// async function async2() {
//     console.log('async2')
// }

// await v 在语义上将等价于 Promise.resolve(v)

//  const p = async2()
//  return Promise.resolve(p).then(() => {
//    console.log('async1 end')
//  })
//
function getLongStr (str) {
  let map = new Map()
  let max = 0
  for (let i = 0, j = 0; j < str.length; j++) {
    if (map.has(str[j])) {
      i = Math.max(map.get(str[j]), i)
    }
    max = Math.max(max, j - i + 1)
    map.set(s[j],j+1)
  }
  return max
}
function fisherYatesShuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)) // random index
    ;[arr[i], arr[j]] = [arr[j], arr[i]] // swap
  }
}

var tmpArray = [1, 3, 5]
fisherYatesShuffle(tmpArray)
console.log(tmpArray)


let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
arr.sort(function () {
  return 0.5 - Math.random()
})
console.log(arr)
