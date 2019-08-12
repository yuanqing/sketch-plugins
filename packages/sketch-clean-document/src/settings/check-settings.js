export function checkSettings (settings) {
  return Object.keys(settings).reduce(function (result, key) {
    if (result) {
      return result
    }
    if (settings[key]) {
      return true
    }
  }, false)
}
