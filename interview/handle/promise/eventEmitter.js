/**
 * EventEmitter
 * 
 */
class EventEmitter { 
  constructor() {
    this.message = {}
  }
  on (type, callback) {
    this.message[type].push(callback)
  }
  emit (type, ...args) {
    if (!this.message[type]) return 
    this.message[type].forEach(cb => cb(...args))
  }
  off (type, callback) {
    if (!this.message[type]) return
    if (!callback) {
      this.message[type].length = 0
    }
    this.message[type] = this.message[type].filter(cb => cb !== callback)
  }
} /**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
   
    // 过滤前导零
    const filterZero = (array) => {
        if(!array.length) return []
        // return array.split('').filter(i=> i!== 0)
        return array.map(i=> i.length && i.split('').filter(i => i!== 0))
    }
     let v1 = filterZero(version1.split('.'))

    let v2 = filterZero(version2.split('.'))
    const maxLength = Math.max(v1,v2).length
    for(let i = 0;i<maxLength;i++) {
        if(v1[i] > v2[i]) {
            return 1
        }else if(v1[i] < v2[i] ){
            return -1
        }else {
            return 0
        }
    }
};

// 实现一个完整的eventEmitter 

// 1. 写一个isEqual函数用来判断两个参数是否相等
var a = [1];   
var b = [1];
console.log(isEqual(a,b)) // true

var a = [1];   // a和b可能是对象，可能是数组，可能是其他
var b = "ccc";
console.log(isEqual(a,b)) // false

function isEqual(arg1, arg2) {
  // 这里开始写代码
  const getType = (val) => Object.prototype.toString.call(val)
  if(getType(arg1 )!== getType(arg2)) {
    return false
  }
  if(a === b) {
    return true
  }
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if(keysA.length !== keysB.length) {
    return false
  }
  for(let key of keysA) {
    if(!keysB.includes(key) || !isEqual(a[key], b[key])) {
      return false
    }
  }

  return true
}



// 自己实现一个事件总线EventBus
// 支持绑定事件 on；
// 解绑事件 off；
// 一次执行事件once；
// 触发事件emit，并在触发事件时支持参数传递

class EventBus {
  // 请补充对应的代码实现 
  constructor() {
    this.events={}
  }
  on(event, callback) {
    // 这里开始写代码
    if(!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(callback)
  }
  off(event, callback) {
    // 这里开始写代码
    if(this.events[event]) {
      this.events[event] = this.events[event].filter( cb => cb !== callback)
    }
  }
  emit(event, data) {
    // 这里开始写代码
    if(this.events[event]) {
      this.events[event].forEach( callback => callback(data))
    }

  }
  once(event, callback) {
    // 这里开始写代码
    const onceCallback = (...args) =>  {
      callback(...args)
      this.off(event, onceCallback)
    }
    
    this.on(event, onceCallback)
  }
}
