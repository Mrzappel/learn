function flatten(list, depth = 1) {
  if (depth === 0) return list
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b, depth - 1) : b), [])
}
function depthComputed(depth) {
  if (depth === 'Infinity') {
    return
  }
}

const a = flatten([1, 2, 3, [4, [5, 6]]])
const b = flatten([1, 2, 3, [4, [5, 6]]], 2)

console.log(a, b)
// 使用 reduce、concat 和递归展开无限多层嵌套的数组
  var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
function flatDeep(arr, d = 1) {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                : arr.slice();
};
flatDeep(arr1, Infinity);
// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]




function flattenArray (arr, depth = 1) {
  return depth > 0 ? arr.reduce((a,b) => a.concat(Array.isArray(b)? flattenArray(b, depth - 1): b), []) : arr.slice()
}



function reduce(array, callback, initialValue) {
  let accumulator = initialValue === undefined ? array[0] : initialValue
  let startIndex = initialValue === undefined ? 1 : 0

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array)
  }

  return accumulator
}
