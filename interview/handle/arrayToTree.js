// 数组转树，O（n）复杂度，测试数据

const array = [
  { id: 1, parentId: null, name: 'Node 1' },
  { id: 2, parentId: 1, name: 'Node 2' },
  { id: 3, parentId: 1, name: 'Node 3' },
  { id: 4, parentId: 2, name: 'Node 4' },
  { id: 5, parentId: 2, name: 'Node 5' },
  { id: 6, parentId: 3, name: 'Node 6' },
]

// const handleArray = array => {
//   const map = {}
//   const tree = []
//   array.forEach(item => (map[item.id] = item))
//   array.forEach(node => {
//     const parent = map[node.parentId]
//     if (parent) {
//       ;(parent.children || (parent.children = [])).push(node)
//     } else {
//       tree.push(node)
//     }
//   })
//   return tree
// }
const arrayToTree = (
  array,
  id = 'id',
  parentId = 'parentId',
  children = 'children'
) => {
  const map = {}
  const tree = []
  array.forEach(item => (map[item[id]] = item))
  array.forEach(node => {
    const parent = map[node[parentId]]
    if (parent) {
      ;(parent[children] || (parent[children] = [])).push(node)
    } else {
      tree.push(node)
    }
  })
  return tree
}

console.log(arrayToTree(array))
export { arrayToTree }