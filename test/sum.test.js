const { sum } = require('./sum')
describe('Math module', () => {
  test('shoule return sum result when one number plus another number', () => {
    const number = 1
    const anotherNumber = 2
    const result = sum(number, anotherNumber)
    expect(result).toBe(3)
  })
})