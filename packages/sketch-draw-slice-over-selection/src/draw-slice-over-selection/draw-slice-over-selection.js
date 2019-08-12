import {
  addLayersToCurrentPage,
  getLayersOnCurrentPage,
  getSelectedLayers,
  showErrorMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import { getSettings } from '../settings/settings'
import { calculateMaximumBounds } from './calculate-maximum-bounds'
import { createSliceLayer } from './create-slice-layer'

export function drawSliceOverSelection () {
  const settings = getSettings()
  const selectedLayers = getSelectedLayers()
  const hasSelection = selectedLayers.length > 0
  const layers = hasSelection ? selectedLayers : getLayersOnCurrentPage()
  if (layers.length === 0) {
    showErrorMessage('No layers')
    return
  }
  const maximumBounds = calculateMaximumBounds(layers)
  const { backgroundColor, padding } = settings
  const sliceLayer = createSliceLayer(maximumBounds, backgroundColor, padding)
  addLayersToCurrentPage([sliceLayer])
  showSuccessMessage(
    `Drew slice over ${hasSelection ? 'selection' : 'all layers'}`
  )
}
