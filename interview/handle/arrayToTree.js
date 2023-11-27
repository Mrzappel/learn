// 数组转树，O（n）复杂度，测试数据

// export const arrayToTree = (array) => {
//   const tree = []
//   const map = {}
//   array.forEach(v => {
//     v.children = []
//     const { id, parentId, ...res } = v
//     if (map[parentId]) {
//       map[parentId].children = v || []
//     } else {
//       map[id] = v
//     }
//   })
//   return tree
// }
const arrayToTree = array => {
  const tree = []
  const map = {}
  array.forEach(v => {
    v.children = []
    const { id, parentId, ...res } = v
    map[id] = v
    if (map[parentId]) {
      map[parentId].children.push(v)
    } else if (parentId === null || parentId === undefined) {
      tree.push(v)
    }
  })
  return tree
}