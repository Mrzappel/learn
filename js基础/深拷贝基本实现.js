
// function deepClone(obj) {
//   if (typeof obj !== null && (typeof obj === 'object' || typeof obj === 'function')) {
//     let newObject = {}
//     for (let key in obj) {
//       newObject[key] = deepClone(obj[key])
//     }
//     return newObject
//   }
//   return obj

// }

// function isObject(value) {
//   const valueType = typeof value
//   return (valueType !== null) && (valueType === 'object' || valueType === 'function')
// }

// function deepClone(obj) {
//   if (!isObject(obj)) {
//     return obj
//   }
//   const newObject = {}
//   for (const key in obj) {
//     newObject[key] = deepClone(obj[key])
//   }
//   return newObject

// }



function isObject(obj) {
  return typeof obj !==null&&typeof obj !=='function'&&typeof obj ==='object'
  
}
function deepClone(obj) {
  if (!isObject(obj)) {
    return obj
  }
 const newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    newObj[key] = deepClone(obj[key])
  }
  return newObj
}
let a = {
  name: '刘德华',
  age: 18,
  son: {
    name: 'liuliu',
    age: 8
  }
}
let b = deepClone(a)
b.son.age = 9

console.log(b === a)
