var a = 1;
console.log(a);
var b = '1111';
console.log(b);
var c = false;
console.log(c);
var d = [1, 2, 3];
console.log(d);
// 泛型
function returnSelf(arg) {
    return arg;
}
function returnLength(arg) {
    console.log(arg.length);
    return arg;
}
var s = returnSelf('ss');
var v = returnSelf(111);
var x = returnSelf(true);
console.log(s, v, x);
console.log(returnLength([12, 3, 4]));
