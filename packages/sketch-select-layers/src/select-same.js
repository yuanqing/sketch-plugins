import {
  getLayersOnCurrentPage,
  getSelectedLayers,
  iterateChildLayers,
  showErrorMessage,
  showMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'

export const selectSameName = selectSameFactory({
  validateLayer: function () {
    return true
  },
  shouldSelectLayer: function (selectedLayer, layer) {
    return selectedLayer.name === layer.name
  }
})

export const selectSameStyle = selectSameFactory({
  validateLayer: function (layer) {
    const type = layer.type
    return (
      (type === 'Text' || type === 'ShapePath') &&
      typeof layer.sharedStyleId === 'string'
    )
  },
  shouldSelectLayer: function (selectedLayer, layer) {
    return selectedLayer.sharedStyleId === layer.sharedStyleId
  },
  invalidLayerMessage: 'Select a layer with a layer style or text style'
})

export const selectSameSymbolInstance = selectSameFactory({
  validateLayer: function (layer) {
    return layer.type === 'SymbolInstance'
  },
  shouldSelectLayer: function (selectedLayer, layer) {
    return selectedLayer.symbolId === layer.symbolId
  },
  invalidLayerMessage: 'Select a symbol instance'
})

function selectSameFactory ({
  validateLayer,
  shouldSelectLayer,
  invalidLayerMessage
}) {
  return function () {
    const selectedLayers = getSelectedLayers()
    if (selectedLayers.length === 0) {
      showErrorMessage('Select 1 layer')
      return
    }
    if (selectedLayers.length > 1) {
      showErrorMessage('Select only 1 layer')
      return
    }
    const selectedLayer = selectedLayers[0]
    if (!validateLayer(selectedLayer)) {
      showErrorMessage(invalidLayerMessage)
      return
    }
    let count = 0
    iterateChildLayers(getLayersOnCurrentPage(), function (layer) {
      if (layer.selected) {
        return
      }
      if (validateLayer(layer) && shouldSelectLayer(selectedLayer, layer)) {
        layer.selected = true
        count++
        return
      }
      layer.selected = false
    })
    if (count === 0) {
      showMessage('No additional layers selected')
      return
    }
    showSuccessMessage(
      `Selected ${count} additional ${count === 1 ? 'layer' : 'layers'}`
    )
  }
}
