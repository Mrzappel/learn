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
const array = [
  { id: 1, parentId: null, name: 'Node 1' },
  { id: 2, parentId: 1, name: 'Node 2' },
  { id: 3, parentId: 1, name: 'Node 3' },
  { id: 4, parentId: 2, name: 'Node 4' },
  { id: 5, parentId: 2, name: 'Node 5' },
  { id: 6, parentId: 3, name: 'Node 6' },
]
// const arrayToTree = array => {
//   const tree = []
//   const map = {}
//   array.forEach(v => {
//     v.children = []
//     const { id, parentId, ...res } = v
//     map[id] = v
//     if (map[parentId]) {
//       map[parentId].children.push(v)
//     } else if (parentId === null || parentId === undefined) {
//       tree.push(v)
//     }
//   })
//   return tree
// }
// console.log(arrayToTree(array))

// const handleArray = array => {
//   const result = []
//   const map = {}
//   array.forEach(v => {
//     const { id, parentId } = v
//     v.children = []
//     map[id] = v
//     if (map[parentId]) {
//       map[parentId].children.push(v)
//     } else {
//       result.push(v)
//     }
//   })
//   return result
// }

// const handleArray = array => {
//   let map = {}
//   const result = []
//   // map = array.reduce((acc,cur) => acc[cur.id] = cur,{})
//   array.forEach(item => {
//     item.children = []
//     const {id} = item
//     map[id] = item
//   })
//   array.forEach(v => {
//     const { id, parentId } = v
//     // v.children = []
//     // map[id] = v
//     const parent = map[parentId]
//     if (parent) {
//       parent.children.push(v)
//     } else if(parentId === null){
//       result.push(v)
//     }
//   })
//   return result
// }

console.log(handleArray(array))
