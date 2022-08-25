const promise = new Promise((resolve,reject) =>{
  console.log(1)
  resolve(console.log('5'))
  reject(console.log('6'))
  console.log(2)
})
promise.then((i) =>{
  console.log('成功的rejec',i)
})
console.log(4)