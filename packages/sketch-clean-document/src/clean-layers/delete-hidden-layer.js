export function deleteHiddenLayer (layer) {
  if (layer.hidden) {
    layer.remove()
    return true
  }
  return false
}
