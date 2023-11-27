import {arrayToTree} from './arrayToTree.js'

test('Converts array to tree structure', () => {
  const array = [
    { id: 1, parentId: null, name: 'Node 1' },
    { id: 2, parentId: 1, name: 'Node 2' },
    { id: 3, parentId: 1, name: 'Node 3' },
    { id: 4, parentId: 2, name: 'Node 4' },
    { id: 5, parentId: 2, name: 'Node 5' },
    { id: 6, parentId: 3, name: 'Node 6' },
  ]

  const expectedTree = [
    {
      id: 1,
      parentId: null,
      name: 'Node 1',
      childrren: [
        {
          id: 2,
          parentId: 1,
          name: 'Node 2',
          children: [
            { id: 4, parentId: 2, name: 'Node 4', children: [] },
            { id: 5, parentId: 2, name: 'Node 5', children: [] },
          ],
        },
        {
          id: 3,
          parentId: 1,
          name: 'Node 3',
          children: [
            { id: 6, parentId: 3, name: 'Node 6', children: [] },
          ],
        },
      ],
    },
  ]

  expect(arrayToTree(array)).toEqual(expectedTree)
})