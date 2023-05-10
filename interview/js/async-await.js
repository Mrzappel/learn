function f() {
  return Promise.resolve('TEST');
}

// asyncF is equivalent to f!
async function asyncF() {
  return 'TEST';
}

const a = f()
const b = asyncF()
// console.log(a, b)

function now() {
  return 21;
 }
 function later() {
  answer = answer * 2;
  console.log( "Meaning of life:", answer );
 }
 var answer = now();
setTimeout(later, 1000); // Meaning of life: 42
 
const arr = [1, 2, 3, 4, 5]
arr.shift()
arr.unshift(...[9,10])
console.log(arr)


const bbb = [1, 2, 3, 4]
// bbb.next()

const makeItarator = () => {

}
// const next = (arr) => {
//   for (let i = 0; i < arr.length; i++) {
//     const done = i < arr.length - 1
//     console.log({ value: arr[i], done:!done }) 
//   }
// }
// console.log(next(bbb));
