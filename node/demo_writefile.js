// const fs = require('fs')
// fs.writeFile('mynewfile3.txt', 'Hello content!writeFile', function (err) {
//   if (err) throw err
//   console.log('Saved!')
// })

// fs.appendFile('mynewfile3.txt', 'This my append Content', function (err) {
//   if (err) throw err
//   console.log('Replaced1!')
// })

// fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
//   if (err) throw err;
//   console.log('Replaced!');
// })

const fs = require('fs')
fs.writeFileSync('mynewfile3.txt', 'Hello content!writeFile', function (err) {
  if (err) throw err
  console.log('Saved!')
})

fs.appendFileSync('mynewfile3.txt', 'This my append Content', function (err) {
  if (err) throw err
  console.log('Replaced1!')
})

fs.writeFileSync('mynewfile3.txt', 'This is my text', function (err) {
  if (err) throw err;
  console.log('Replaced!');
})

// fs.unlink('mynewfile2.txt', function (err) {
//   if (err) throw err
//   console.log('file deleted!')
// })

fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err
  console.log('file renamed')
})