// function getAverage (arr) {
//   if (!arr instanceof Array) {
//       throw new Error('传入参数必须为数组')
//   }
//   const len = arr.length
//   if (!len) {
//     return NaN
//   }
//   const sum = arr.reduce((acc, cur) => acc + cur)
//   return sum/len
// }
function getAverage(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Argument is not an array');
  }
  if (arr.length === 0) {
    return NaN;
  }
  const sum = arr.reduce((acc, cur) => {
    if (typeof cur !== 'number' || Number.isNaN(cur)) {
      throw new Error('Array contains invalid values');
    }
    return acc + cur;
  }, 0);
  return sum / arr.length;
}
module.exports = {getAverage}

// 测试
// const arr = Array.from({ length: 10 }, (_,index)=> index + 1)
// const res = getAverage(arr)
// console.log(res)