/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
export const compareVersion = function (version1, version2) {
  let v1 = version1.split('.')

  let v2 = version2.split('.')
  const maxLength = Math.max(v1.length, v2.length)
  for (let i = 0; i < maxLength; i++) {
    v1[i] = Number(v1[i]) || 0
    v2[i] = Number(v2[i]) || 0
    if (v1[i] > v2[i]) {
      return 1
    } else if (v1[i] < v2[i]) {
      return -1
    }
  }
  return 0
}
compareVersion('1.01', '1.001')
