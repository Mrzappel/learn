import express from 'express'
const app = express()

// 强制缓存
app.get('/force-cache', function (req, res) {
  res.set('Cache-Control', 'max-age=3600') // 设置缓存有效期为1小时
  res.send('This is force cache.')
})

// 协商缓存
app.get('/negotiation-cache', function (req, res) {
  const lastModified = req.headers['if-modified-since']
  const now = new Date().toUTCString()

  if (
    lastModified &&
    new Date(lastModified).getTime() >= new Date(now).getTime() - 3600000
  ) {
    res.status(304).end()
  } else {
    res.set('Last-Modified', now)
    res.send('This is negotiation cache.')
  }
})
// server.js

app.get('/say', function(req, res) {
  let { wd, callback } = req.query
  console.log(wd) // Iloveyou
  console.log(callback) // show
  res.end(`${callback}('我不爱你')`)
})

app.listen(3000, function () {
  console.log('Server is running at http://localhost:3000')
})
