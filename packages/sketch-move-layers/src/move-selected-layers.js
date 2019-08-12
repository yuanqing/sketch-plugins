import {
  numericTextBox,
  openSettingsDialog
} from '@sketch-plugin-helper/settings'
import {
  adjustParentGroupsToFit,
  getSelectedLayers,
  showErrorMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import { defaultSettings } from './settings'

export function moveSelectedLayers () {
  const selectedLayers = getSelectedLayers()
  if (selectedLayers.length === 0) {
    showErrorMessage('Select at least 1 layer')
    return
  }
  const title = 'Move Selected Layers'
  const formFields = [
    numericTextBox({
      key: 'moveSelectedLayers.horizontalOffset',
      label: '→ Horizontal offset'
    }),
    numericTextBox({
      key: 'moveSelectedLayers.verticalOffset',
      label: '↓ Vertical offset'
    })
  ]
  const settings = openSettingsDialog(title, formFields, defaultSettings)
  if (!settings) {
    return
  }
  const { horizontalOffset, verticalOffset } = settings.moveSelectedLayers
  if (horizontalOffset === 0 && verticalOffset === 0) {
    return
  }
  selectedLayers.forEach(function (layer) {
    layer.frame.x += horizontalOffset
    layer.frame.y += verticalOffset
  })
  selectedLayers.forEach(adjustParentGroupsToFit)
  const horizontal = prependDirectionSymbol({
    offset: horizontalOffset,
    positiveSymbol: '→',
    negativeSymbol: '←'
  })
  const vertical = prependDirectionSymbol({
    offset: verticalOffset,
    positiveSymbol: '↓',
    negativeSymbol: '↑'
  })
  const message = `Moved ${
    selectedLayers.length === 1 ? 'layer' : 'layers'
  } ${horizontal} ${vertical}`
  showSuccessMessage(message.trim())
}

function prependDirectionSymbol ({ offset, positiveSymbol, negativeSymbol }) {
  if (offset > 0) {
    return `${positiveSymbol} ${offset}`
  }
  if (offset < 0) {
    return `${negativeSymbol} ${offset * -1}`
  }
  return ''
}
