const myCurrying = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...args2) => myCurrying(fn, ...args, ...args2)
  }
}

const add = (x, y, z) => {
  return x + y + z
}

const addCurry = myCurrying(add)
const sum1 = addCurry(1, 2, 3)
const sum2 = addCurry(1)(2)(3)

console.log(sum1, 'sum1')
console.log(sum2, 'sum2')

// 斐波那契数
function fib(n) {
  let a = 1,
    b = 1,
    c = 2
  if (n <= 2) return 1
  for (let i = 3; i <= n; i++) {
    c = a + b
    a = b
    b = c
  }
  return c
}
function curry(fn, ...args) {
  const args = Array.prototype.slice.call(arguments, 1)
  if (args.length >= fn.length) {
    return fn.apply(this, args)
  } else {
    return function () {
      return curry.call(this, fn, ...args, ...arguments)
    }
  }
}

const curry1 = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...args1) => {
      curry1(fn, ...args, ...args1)
    }
  }
}

// 2023-12-25
const myCurrying2 = (fn, ...args) => {
  if (args.length >= fn.length) {
    fn(...args)
  } else {
    return (...args2) => myCurrying2(fn, ...args, ...args2)
  }
}

const currying = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...args1) => currying(fn, ...args, ...args1)
  }
}
