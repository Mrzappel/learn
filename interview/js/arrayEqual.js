// 一个简单的判断一维数组是否相等的函数
const arrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i in arr1) { 
    if (arr1[i] !== arr2[i]) { 
      return false
    }
  }
  return true
}
const arr = [1, 2, 3]
// console.log(arr.keys())
for (let i of arr.keys()) {
  // i:number
  console.log(i,typeof i)
}
for (let i of arr) {
  // i:number
  console.log(i,typeof i)
}
for (let i in arr) {
  // i:string
  console.log(i, typeof i)
}