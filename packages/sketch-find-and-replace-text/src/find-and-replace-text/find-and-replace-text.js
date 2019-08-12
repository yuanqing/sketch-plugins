import {
  checkBox,
  dropDown,
  openSettingsDialog,
  saveTemporarySettings,
  textBox
} from '@sketch-plugin-helper/settings'
import {
  getLayersOnAllPages,
  getLayersOnCurrentPage,
  getSelectedLayers,
  iterateChildLayers,
  showErrorMessage,
  showMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import replaceTextInLayer from './replace-text-in-layer'
import { defaultSettings } from '../settings'

const scopeMessage = {
  'Selected layers': 'in the selected layers',
  'Current page': 'on the current page',
  'Entire document': 'across the entire document'
}

export default function findAndReplaceText () {
  const selectedLayers = getSelectedLayers()
  const hasSelection = selectedLayers.length !== 0
  const title = 'Find and Replace Text'
  const formFields = [
    textBox({
      key: 'findText',
      label: 'Find'
    }),
    checkBox({
      key: 'caseSensitive',
      label: 'Case sensitive'
    }),
    textBox({
      key: 'replaceText',
      label: 'Replace'
    }),
    dropDown({
      key: 'scope',
      label: 'Scope',
      possibleValues: [
        hasSelection && 'Selected layers',
        'Current page',
        'Entire document'
      ].filter(Boolean),
      value: hasSelection ? 'Selected layers' : null
    })
  ]
  const settings = openSettingsDialog(title, formFields, defaultSettings)
  if (!settings) {
    return
  }
  const { scope, ...settingsWithoutScope } = settings
  let layers = []
  if (scope === 'Selected layers') {
    saveTemporarySettings(settingsWithoutScope)
    layers = getNestedTextLayersAndSymbolInstances(selectedLayers)
    if (layers.length === 0) {
      showErrorMessage('No text layers or symbol instances in selection')
      return
    }
  } else {
    saveTemporarySettings(settings)
    layers = getNestedTextLayersAndSymbolInstances(
      scope === 'Current page'
        ? getLayersOnCurrentPage()
        : getLayersOnAllPages()
    )
    if (layers.length === 0) {
      showErrorMessage('No text layers or symbol instances found')
      return
    }
  }
  const regex = new RegExp(
    settings.findText,
    settings.caseSensitive ? 'g' : 'gi'
  )
  let count = 0
  layers.forEach(function (layer) {
    count += replaceTextInLayer[layer.type](layer, regex, settings.replaceText)
  })
  if (count === 0) {
    showMessage('No replacements made')
    return
  }
  showSuccessMessage(
    `Made ${count} replacement${count === 1 ? '' : 's'} ${scopeMessage[scope]}`
  )
}

function getNestedTextLayersAndSymbolInstances (layers) {
  const result = []
  iterateChildLayers(layers, function (layer) {
    if (layer.type === 'Text' || layer.type === 'SymbolInstance') {
      result.push(layer)
    }
  })
  return result
}
