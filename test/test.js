// find all images without alternate text
// and give them a red border
function debounce() {
  var timer = null
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
}
function deepClone() {
  var clone = {}
  for (var i in this) {
    if (this.hasOwnProperty(i)) {
      if (typeof this[i] === 'object') {
        clone[i] = this[i].deepClone()
      } else {
        clone[i] = this[i]
      }
    }
  }
  return clone
}
function objectDefineProperty() {
  var obj = {}
  Object.defineProperty(obj, 'name', {
    value: 'John',
    writable: true,
    enumerable: true,
    configurable: true,
  })
  obj.name = 'Pete'
  for (var prop in obj) {
    alert(prop + ': ' + obj[prop])
  }
}


