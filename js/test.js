// const map = new Map([
//   ['name', '张三'],
//   ['title', 'Author'],
// ])
// console.log(map.get('name'))

// const m = new Map([
//   ['time', '11'],
//   ['money', '3'],
// ])
// m.set('sex', 'female')
// m.set('age', 18)
// m.set('age',20)
// console.log(m)
// for (const [key, value] of m) {
//   console.log(`key:${key},value:${value}`)
// }
// console.log(Array.from(m))
// console.log([...m])

const arr = [1, 2, 2, 2, 4, 5, 6, 7, 7, 78, 8, 9, 10, 11, 11]

// // for (let i = 0; i < arr.length; i++) {
// //   if (!newArr.includes(arr[i])) {
// //     newArr.push(arr[i])
// //   }
// }
const newArr = arr.reduce((acc, cur) => {
  if (!acc.includes(cur)) {
    acc.push(cur)
  }
}, [])
const a = 'sdfsfsf'
let b = 1
console.log(newArr)
