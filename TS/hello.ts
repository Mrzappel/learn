let a: number = 1
console.log(a)
let b: string = '1111'
console.log(b)
let c: boolean = false
console.log(c);
let d: number[] = [1, 2, 3]
console.log(d)

// 泛型
function returnSelf<T>(arg: T): T {
  return arg
}

// 泛型当作类型的一部分
function returnLength<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
const s = returnSelf('ss')
const v = returnSelf(111)
const x = returnSelf<boolean>(true)
console.log(s, v, x)
console.log(returnLength([12, 3, 4]))