const sleep = (fn, time = 1) => {
  return new Promise(resolve => {
    setTimeout(() =>{
      const res = fn()
      resolve(res)
    }, time * 1000)
  })
}
const f = () => 1
const getTime = () => new Date().toLocaleString()
console.log(getTime())
sleep(f,5).then(res => console.log(getTime()))
