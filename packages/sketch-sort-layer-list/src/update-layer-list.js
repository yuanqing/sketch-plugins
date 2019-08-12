export function updateLayerList (sortedLayers, shouldSelectLayers) {
  const firstLayer = sortedLayers[0]
  const parent = firstLayer.sketchObject.parentGroup()
  const temporaryLayer = MSLayer.alloc().init()
  parent.insertLayer_beforeLayer(temporaryLayer, firstLayer.sketchObject)
  sortedLayers.reverse().forEach(function (layer) {
    layer.sketchObject.moveToLayer_beforeLayer(parent, temporaryLayer)
    layer.selected = shouldSelectLayers
  })
  temporaryLayer.removeFromParent()
}
