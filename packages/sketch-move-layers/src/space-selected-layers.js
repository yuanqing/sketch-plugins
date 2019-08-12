import {
  openSettingsDialog,
  saveTemporarySettings,
  numericTextBox
} from '@sketch-plugin-helper/settings'
import {
  adjustParentGroupsToFit,
  getSelectedLayers,
  showErrorMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import { calculateAbsoluteCoordinates } from './calculate-absolute-coordinates'
import directions from './directions/directions'
import { defaultSettings } from './settings'

export const spaceSelectedLayersLeft = spaceSelectedLayersFactory('left')
export const spaceSelectedLayersRight = spaceSelectedLayersFactory('right')
export const spaceSelectedLayersUp = spaceSelectedLayersFactory('up')
export const spaceSelectedLayersDown = spaceSelectedLayersFactory('down')

function spaceSelectedLayersFactory (direction) {
  const { sortLayers, spaceLayers, label } = directions[direction]
  return function () {
    const selectedLayers = getSelectedLayers()
    if (selectedLayers.length < 2) {
      showErrorMessage('Select at least 2 layers')
      return
    }
    const title = `Space Selected Layers ${label}`
    const formFields = [
      numericTextBox({
        key: 'spaceSelectedLayers.space',
        label: 'Space'
      })
    ]
    const settings = openSettingsDialog(title, formFields, defaultSettings)
    if (!settings) {
      return
    }
    saveTemporarySettings(settings)
    const { space } = settings.spaceSelectedLayers
    spaceLayers({
      layers: calculateAbsoluteCoordinates(selectedLayers).sort(sortLayers),
      space
    })
    selectedLayers.forEach(adjustParentGroupsToFit)
    showSuccessMessage(`Spaced selected layers ${direction}`)
  }
}
