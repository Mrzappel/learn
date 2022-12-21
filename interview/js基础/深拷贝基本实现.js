
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



function isObject (obj) {
  return typeof obj !== null && typeof obj !== 'function' && typeof obj === 'object'

}
function deepClone (obj) {
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

const isObjectNew = (obj) => {
  return typeof obj !== null && typeof obj !== 'function' && typeof obj === 'object'
}
const deepCloneNew = (obj) => {
  // if (!isObject(obj)) return obj

  const newObj = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    if (isObjectNew(obj[key])) {
      newObj[key] = deepCloneNew(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
/**
 *  
 */

function deepCopy (object) {
  if (!object || typeof object !== "object") return object;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = deepCopy(object[key]);
    }
  }

  return newObject;
}

const aa = {
  name: 'll',
  age: 19,
  son: {
    age: 20,
    name: 'l'
  }
}

const newArr = [
  [1, 1],
  [2, {
    name: 'ss',
    age: 20
  }]
]
// const bb = deepCloneNew(aa)
// const bb = deepCopy(aa)
const bb = deepCopy(newArr)

// aa.son.age = 200

// console.log(aa, bb)
newArr[1][1].age = 10
console.log(newArr,bb)