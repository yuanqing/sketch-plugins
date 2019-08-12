import {
  getSelectedLayersOrLayersOnCurrentPage,
  iterateChildLayers,
  showMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'

export const selectArtboards = selectByTypeFactory({
  key: 'type',
  value: 'Artboard',
  label: 'artboard'
})

export const selectGroups = selectByTypeFactory({
  key: 'type',
  value: 'Group',
  label: 'group'
})

export const selectShapeLayers = selectByTypeFactory({
  key: 'type',
  value: 'ShapePath',
  label: 'shape layer'
})

export const selectTextLayers = selectByTypeFactory({
  key: 'type',
  value: 'Text',
  label: 'text layer'
})

export const selectSymbolInstances = selectByTypeFactory({
  key: 'type',
  value: 'SymbolInstance',
  label: 'symbol instance'
})

export const selectImages = selectByTypeFactory({
  key: 'type',
  value: 'Image',
  label: 'image'
})

export const selectSlices = selectByTypeFactory({
  key: 'type',
  value: 'Slice',
  label: 'slice'
})

export const selectHotspots = selectByTypeFactory({
  key: 'type',
  value: 'HotSpot',
  label: 'hotspot'
})

export const selectHiddenLayers = selectByTypeFactory({
  key: 'hidden',
  value: true,
  label: 'hidden layer'
})

function selectByTypeFactory ({ key, value, label }) {
  return function () {
    let count = 0
    iterateChildLayers(getSelectedLayersOrLayersOnCurrentPage(), function (
      layer
    ) {
      if (layer[key] === value) {
        layer.selected = true
        count++
        return
      }
      layer.selected = false
    })
    const pluralisedLabel = `${label}s`
    if (count === 0) {
      showMessage(`No ${pluralisedLabel} found`)
      return
    }
    showSuccessMessage(
      `Selected ${count} ${count === 1 ? label : pluralisedLabel}`
    )
  }
}
