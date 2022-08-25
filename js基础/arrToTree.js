const source = [{
  id: 1,
  pid: 0,
  name: 'body'
}, {
  id: 2,
  pid: 1,
  name: 'title'
}, {
  id: 3,
  pid: 1,
  name: 'div'
}, {
  id: 4,
  pid: 3,
  name: 'span'
}, {
  id: 5,
  pid: 3,
  name: 'icon'
}, {
  id: 6,
  pid: 4,
  name: 'subspan'
}]
function arrToTree(arr, rootValue) {
  let arrList = []
  arr.forEach((item) => {
    if (item.pid === rootValue) {
      const children = arrToTree(arr,item.id)
      if (children.length) {
        item.children = children
      }
      arrList.push(item)
    }
  })
  return arrList
}
console.log(arrToTree(source,0))

