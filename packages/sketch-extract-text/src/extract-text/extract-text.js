import {
  dropDown,
  openSettingsDialog,
  radioButtons,
  saveSettings,
  textBox
} from '@sketch-plugin-helper/settings'
import {
  getLayersOnAllPages,
  getLayersOnCurrentPage,
  getSelectedLayers,
  showErrorMessage,
  showMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import { defaultSettings } from '../settings'
import { filterTextLayersByRegex } from './filter-text-layers-by-regex'
import { findAllTextLayers } from './find-all-text-layers'
import { saveToClipboard } from './save-to-clipboard'

export function extractText () {
  const selectedLayers = getSelectedLayers()
  const hasSelection = selectedLayers.length !== 0
  const title = 'Extract Text'
  const formFields = [
    textBox({
      key: 'regex',
      label: 'Regular Expression'
    }),
    radioButtons({
      key: 'matchType',
      possibleValues: ['Match layer content', 'Match layer name']
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
  let textLayers = []
  if (scope === 'Selected layers') {
    saveSettings(settingsWithoutScope)
    textLayers = findAllTextLayers(selectedLayers)
    if (textLayers.length === 0) {
      showErrorMessage('No text layers in selection')
      return
    }
  } else {
    saveSettings(settings)
    textLayers = findAllTextLayers(
      scope === 'Current page'
        ? getLayersOnCurrentPage()
        : getLayersOnAllPages()
    )
    if (textLayers.length === 0) {
      showErrorMessage(
        `No text layers ${
          scope === 'Current page' ? 'on the current page' : 'in the document'
        }`
      )
      return
    }
  }
  const regex = new RegExp(settings.regex === '' ? '^.+$' : settings.regex)
  const matches = filterTextLayersByRegex(
    textLayers,
    regex,
    settings.matchType === 'Match layer content'
  )
  const matchesLength = matches.length
  if (matchesLength === 0) {
    showMessage('No matches')
    return
  }
  const string = matches
    .map(function (textLayer) {
      return textLayer.text
    })
    .reverse()
    .join('\n')
  saveToClipboard(string)
  showSuccessMessage(
    `Copied ${matchesLength} match${
      matchesLength !== 1 ? 'es' : ''
    } to the clipboard`
  )
}
