import {
  adjustParentGroupsToFit,
  calculateCoordinatesRelativeToArtboard,
  getLayersOnCurrentPage,
  getSelectedLayers,
  iterateChildLayers,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import roundDown from '../round-down'
import { getSettings } from '../settings/settings'

export default function alignLayersToArtboardGrid ({ isAction, layers }) {
  const {
    gridSize,
    whitelistRegularExpression
  } = getSettings().alignLayersToArtboardGrid
  const regularExpression = whitelistRegularExpression
    ? new RegExp(whitelistRegularExpression)
    : null
  const selectedLayers = getSelectedLayers()
  const hasSelection = selectedLayers.length > 0
  layers = layers || (hasSelection ? selectedLayers : getLayersOnCurrentPage())
  iterateChildLayers(layers, function (layer) {
    if (
      layer.type === 'Artboard' ||
      layer.type === 'Group' ||
      !layer.getParentArtboard() ||
      (regularExpression && regularExpression.test(layer.name))
    ) {
      return
    }
    snapLayerToGrid(layer, gridSize)
  })
  if (!isAction) {
    showSuccessMessage(
      `Aligned ${hasSelection ? 'selection' : 'all layers'} to artboard grid`
    )
  }
}

function snapLayerToGrid (layer, gridSize) {
  const { x, y } = calculateCoordinatesRelativeToArtboard(layer)
  const newX = roundDown(x, gridSize)
  const newY = roundDown(y, gridSize)
  layer.frame.x = layer.frame.x + newX - x
  layer.frame.y = layer.frame.y + newY - y
  adjustParentGroupsToFit(layer)
}
