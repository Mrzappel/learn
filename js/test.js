const map = new Map([
  ['name', '张三'],
  ['title', 'Author'],
])
console.log(map.get('name'))

const m = new Map([
  ['time', '11'],
  ['money', '3'],
])
m.set('sex', 'female')
m.set('age', 18)
m.set('age',20)
console.log(m)
for (const [key, value] of m) {
  console.log(`key:${key},value:${value}`)
}
console.log(Array.from(m))
console.log([...m])