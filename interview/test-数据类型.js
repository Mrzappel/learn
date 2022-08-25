/**
js数据类型
1.七种基本类型
undefined
null
String
Number
Boolean
BigInt
Symbol
2.引用类型
Object(Function,Array,...)
3.类型判断
typeof 可以判断出所有的原始值类型，无法判断出object的具体类型
**/

// console.log(typeof undefined) //undefined
// console.log(typeof null)  //object
// console.log(typeof 'sss') //string
// console.log(typeof 0.01)  //number

// console.log(typeof 1n) //bigint
// console.log(typeof true)  //boolean
// console.log(typeof Symbol() ) //symbol
// console.log(typeof Object() ) //object
// console.log(4n/2n)
// console.log(typeof new Function) //function

// console.log(typeof NaN) //number
// console.log(NaN === NaN) //false
// var num = 1
// console.log(typeof num.toString())
var twoSum = function(nums, target) {
	let hash = {};
	
	for(let i = 0; i < nums.length; i++) {
		const n = nums[i];
		if(hash[target - n] !== undefined) {
			return [hash[target - n], i];
		}
		hash[n] = i;
	}
	return [];
}
two


















