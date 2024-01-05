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
console.log(compareVersion('1.01', '1. 001'))

function sortVersions(versions) {
  return versions.sort(compareVersions)
}

function compareVersions(version1, version2) {
  var v1 = version1.split('.').map(Number)
  var v2 = version2.split('.').map(Number)
  for (var i = 0; i < v1.length || i < v2.length; i++) {
    if (v1[i] === undefined || v1[i] < v2[i]) {
      return -1
    }
    if (v2[i] === undefined || v1[i] > v2[i]) {
      return 1
    }
  }
  return 0
}
console.log(sortVersions(['1.01', '1.001', '1.1', '1.2', '0.2', '3.2', '0.3']))
