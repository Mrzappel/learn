// find all images without alternate text
// and give them a red border
function debounce() {
  var timer = null
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
}
function deepClone() {
  var clone = {}
  for (var i in this) {
    if (this.hasOwnProperty(i)) {
      if (typeof this[i] === 'object') {
        clone[i] = this[i].deepClone()
      } else {
        clone[i] = this[i]
      }
    }
  }
  return clone
}
function objectDefineProperty() {
  var obj = {}
  Object.defineProperty(obj, 'name', {
    value: 'John',
    writable: true,
    enumerable: true,
    configurable: true,
  })
  obj.name = 'Pete'
  for (var prop in obj) {
    alert(prop + ': ' + obj[prop])
  }
}

const myCurrying = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...args2) => myCurrying(fn, ...args, ...args2);
  }
}

const add = (x, y, z) => {
  return x + y + z
}

const addCurry = myCurrying(add)
const sum1 = addCurry(1, 2, 3)
const sum2 = addCurry(1)(2)(3)

console.log(sum1, 'sum1');
console.log(sum2, 'sum2');

