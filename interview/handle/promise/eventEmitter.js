/**
 * EventEmitter
 * 
 */
class EventEmitter { 
  constructor() {
    this.message = {}
  }
  on (type, callback) {
    this.message[type].push(callback)
  }
  emit (type, ...args) {
    if (!this.message[type]) return 
    this.message[type].forEach(cb => cb(...args))
  }
  off (type, callback) {
    if (!this.message[type]) return
    if (!callback) {
      this.message[type].length = 0
    }
    this.message[type] = this.message[type].filter(cb => cb !== callback)
  }
} /**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
   
    // 过滤前导零
    const filterZero = (array) => {
        if(!array.length) return []
        // return array.split('').filter(i=> i!== 0)
        return array.map(i=> i.length && i.split('').filter(i => i!== 0))
    }
     let v1 = filterZero(version1.split('.'))

    let v2 = filterZero(version2.split('.'))
    const maxLength = Math.max(v1,v2).length
    for(let i = 0;i<maxLength;i++) {
        if(v1[i] > v2[i]) {
            return 1
        }else if(v1[i] < v2[i] ){
            return -1
        }else {
            return 0
        }
    }
};
