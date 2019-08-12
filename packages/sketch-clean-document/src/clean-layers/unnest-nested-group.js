import { adjustParentGroupsToFit } from '@sketch-plugin-helper/utilities'

export function unnestNestedGroup (layer) {
  if (layer.type !== 'Group') {
    return
  }
  const childLayers = layer.layers
  const length = childLayers.length
  if (length === 0) {
    layer.remove()
    adjustParentGroupsToFit(layer)
    return
  }
  if (length === 1) {
    const transform = layer.transform
    const style = layer.style
    if (
      layer.hidden ||
      layer.locked ||
      layer.exportFormats.length !== 0 ||
      layer.flow ||
      transform.rotation !== 0 ||
      transform.flippedHorizontally ||
      transform.flippedVertically ||
      style.opacity !== 1 ||
      style.shadows.length !== 0
    ) {
      return
    }
    childLayers[0].sketchObject.moveToLayer_beforeLayer(
      layer.parent.sketchObject,
      layer.sketchObject
    )
    layer.selected = false
    childLayers[0].selected = false
    layer.remove()
    adjustParentGroupsToFit(layer)
    unnestNestedGroup(childLayers[0])
    return
  }
  childLayers.forEach(function (childLayer) {
    unnestNestedGroup(childLayer)
  })
}
