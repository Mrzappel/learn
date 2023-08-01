const { getAverage } = require('./average')
describe('Math module', () => {
  // test('should return average with arr', () => {
  //   const arr = Array.from({ length: 10 }, (_, index) => index + 1)
  //   const res = getAverage(arr)
  //   expect(res).toBe(5.5)
  // })
  // test('should return NaN with empty input array', () => {
  //   const input = [];
  //   expect(getAverage(input)).toBeNaN();
  // });

  // // test('should return NaN with invalid input array', () => {
  // //   const input = ['1', 'abc', true];
  // //   expect(getAverage(input)).toBeNaN();
  // // });
  test('should return correct average with valid input array', () => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = 3;
    expect(getAverage(input)).toBe(expectedOutput);
  });

  test('should return NaN with empty input array', () => {
    const input = [];
    expect(getAverage(input)).toBeNaN();
  });

  test('should throw error with invalid argument', () => {
    const input = 'invalid input';
    expect(() => getAverage(input)).toThrow('Argument is not an array');
  });

  test('should throw error with invalid values in input array', () => {
    const input = ['1', 2, null, NaN];
    expect(() => getAverage(input)).toThrow('Array contains invalid values');
  });
})
