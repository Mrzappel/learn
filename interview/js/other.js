// 寻找字符串中出现次数最多的字符
function findMaxDuplicateChar (str) {
  if (str.length === 1) {
    return str
  }
  let charObj = {}
  for (let i = 0; i < str.length; i++) {
    if (!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1
    } else {
      charObj[str.charAt(i)] += 1
    }
  }
  let maxChar = '',
    maxValue = 1
  for (let k in charObj) {
    if (charObj[k] >= maxValue) {
      maxChar = k
      maxValue = charObj[k]
    }
  }
  return maxChar
}
