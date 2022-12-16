var path = require('path')
path.resolve();
console.log(path.resolve(__dirname, 'dist'))
console.log(path.resolve(__filename, 'dist'))
// $ node d:/project/js/node/test.js
// d:\project\js\node\dist
// d:\project\js\node\test.js\dist

/**
 * 解释为什么要拼接路径-chatgpt
 * path.resolve(__dirname, 'dist') 是将相对路径转换为绝对路径，它的作用是保证不同操作系统下拼接出来的路径都是一致的，比如Windows系统下路径分隔符是反斜杠'\'，而Linux系统下是正斜杠'/'，使用path.resolve()可以解决不同操作系统下路径拼接的问题。
 */
