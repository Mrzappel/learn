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
} 