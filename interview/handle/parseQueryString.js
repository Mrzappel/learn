var urls = 'https://www.baidu.com/?search=xx&page=1'
var c = f => console.log(f)
function parseQueryString(url) {
  let params = {}
  let key = ''
  let value = ''
  let parseString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  for (let i = 0; i < parseString.length; i++) {
    ;[key, value] = parseString[i].split('=')
    params[key] = value
  }
  return params
}
// console.log(parseQueryString(urls))
function mostRepeated(str) {
  let max = 0
  let startIndex = 0
  let endIndex = 0
  let target = ''
  for (let i = 0; i < str.length; i++) {
    let count = 1
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] === str[j]) {
        count++
      } else {
        break
      }
    }
    if (max < count) {
      target = str[i]
      max = count
      startIndex = i
      endIndex = i + count - 1
    }
  }
  return {
    target,
    startIndex,
    endIndex,
  }
}
c(mostRepeated('aabbbcccc'))
function deepcClone(obj, hash = new WeakMap()) {
  if (typeof obj !== object || obj === null) {
    return obj
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp()
  }
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  for (let key in obj) {
    if (obj.hasOwnProperity(obj[key])) {
      hash.set(key, obj[key])
    }
  }
}
Array.prototype.duplicator = function () {
  return this.concat(this)
}
const isValid = (str) => {
  let stack = []
  const map = {
    '{': '}',
    '[': ']',
    '(':')'
  }
  for (let i = 0; i < str.length; i++) {
    //当前是左括号
    if (map[str[i]]) {
    // 左括号入栈
      stack.push(str[i])
    } else {
      //当前是右括号 --- stack.pop弹出已经入栈的左括号,map找到对应的右括号
      if(str[i] !== map(stack.pop())) {
        return false
      }
    }
  }
  return stack.length === 0
}
console.log(isValid("()"));  // true
console.log(isValid("()[]{}"));  // true
console.log(isValid("(]"));  // false
console.log(isValid("([)]"));  // false
console.log(isValid("{[]}"));  // true