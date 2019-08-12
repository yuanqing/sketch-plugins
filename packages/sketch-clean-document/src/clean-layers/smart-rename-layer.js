import { getCurrentDocument } from '@sketch-plugin-helper/utilities'

const mapLayerTypeToRenameFunction = {
  Group: function (layer) {
    layer.name = 'Group'
  },
  HotSpot: function (layer) {
    layer.name = 'Hotspot'
  },
  Image: function (layer) {
    layer.name = 'Bitmap'
  },
  Shape: function (layer) {
    layer.name = 'Combined Shape'
    layer.layers.forEach(function (childLayer) {
      smartRenameLayer(childLayer)
    })
  },
  ShapePath: function (layer) {
    if (layer.shapeType === 'Rectangle') {
      layer.name = 'Rectangle'
      return
    }
    if (layer.shapeType === 'Oval') {
      layer.name = 'Oval'
      return
    }
    layer.name = 'Path'
  },
  SymbolInstance: function (layer) {
    const symbolMaster = getCurrentDocument().getSymbolMasterWithID(
      layer.symbolId
    )
    layer.name = symbolMaster.name
  },
  Text: function (layer) {
    const layerSketchObject = layer.sketchObject
    layerSketchObject.setName(layerSketchObject.stringValue().substring(0, 20))
    layerSketchObject.setNameIsFixed(false)
  }
}

export function smartRenameLayer (layer) {
  if (layer.exportFormats.length !== 0) {
    return
  }
  if (layer.sketchObject.hasClippingMask() === 1) {
    layer.name = 'Mask'
    return
  }
  const smartRename = mapLayerTypeToRenameFunction[layer.type]
  if (smartRename) {
    smartRename(layer)
  }
}
