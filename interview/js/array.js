/**数组的reduce方法，
* @params：callback,initevalue
*
**/


function elCount(num,el) {
  return num.reduce( (acc,cur) => {
    return acc+=cur==el?1:0
  },0)
}
const testNum = [8,8,8,8,1,1,3,3]
console.log(elCount(testNum,1))

// 括号的有效性