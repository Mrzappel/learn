// 写一个bind方法，考虑参数的传递及new调用
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
// 实现一个考虑边界情况的apply
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const args = [...arguments].slice(1)
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](args)
  delete context[fn]
  return result
}
// 实现一个考虑边界情况的call
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const args = [...arguments].slice(1)
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](args)
  delete context[fn]
  return result
}
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    )
  }
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)

  var fNOP = function () {}

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    )
  }

  if (this.prototype) {
    fNOP.prototype = this.prototype
  }
  fBound.prototype = new fNOP()
  return fBound
}

function bind () {
  
}

function bind(fn, context, ...args) {
  return function (...innerArgs) {
    // 处理构造函数调用
    if (new.target) {
      const bound = function (...newArgs) {
        return fn.apply(
          this instanceof bound ? this : context,
          args.concat(newArgs)
        )
      }
      bound.prototype = Object.create(fn.prototype)
      return new bound(...innerArgs)
    }

    // 普通函数调用
    return fn.apply(context, args.concat(innerArgs))
  }
}

//
