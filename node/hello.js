const http = require('http')
var url = require('url')
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write(req.url)
  res.end()
  // res.end('Hello world, I am NodeJs')
}).listen(8574)

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('I am NodeJs')
}).listen(857)

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  let q = url.parse(req.url, true).query
  let txt = q.year + ' ' + q.month
  res.end(txt)
}).listen(8571)

exports.myDateTime = function () {
  return Date()
}