import { getSettings } from '@sketch-plugin-helper/settings'
import {
  addLayersToCurrentPage,
  getArtboardsOnCurrentPage,
  getLayersOnCurrentPage,
  showErrorMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import defaultSettings from '../default-settings'

export default function implementationFactory ({
  mapArtboards,
  groupName,
  settingsKey,
  successMessage
}) {
  return function () {
    deleteLayers(groupName)
    const artboards = getArtboardsOnCurrentPage()
    if (artboards.length === 0) {
      showErrorMessage('No artboards')
      return
    }
    const layers = mapArtboards(
      artboards,
      getSettings(defaultSettings)[settingsKey]
    )
    const group = MSLayerGroup.groupWithLayers(
      MSLayerArray.arrayWithLayers(layers)
    )
    group.setName(groupName)
    group.setIsLocked(true)
    addLayersToCurrentPage([group])
    showSuccessMessage(successMessage)
  }
}

function deleteLayers (layerName) {
  getLayersOnCurrentPage().forEach(function (layer) {
    if (layer.type === 'Group' && layer.name === layerName) {
      layer.remove()
    }
  })
}
