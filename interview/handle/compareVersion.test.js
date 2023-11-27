import {compareVersion} from './compareVersion.js'

test('1.01 1.001', () => {
  expect(compareVersion(1.01,1.001).toBe(1))
})