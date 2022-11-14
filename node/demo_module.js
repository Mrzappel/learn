const http = require('http')
const dt = require('./hello.js')
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('The data and time are currently: ' + dt.myDateTime())
  res.end()
}).listen(8000)