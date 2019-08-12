import {
  checkBox,
  dropDown,
  numericTextBox,
  openSettingsDialog as openSettingsDialogHelper,
  saveSettings,
  textBox
} from '@sketch-plugin-helper/settings'
import { showSuccessMessage } from '@sketch-plugin-helper/utilities'
import { defaultSettings } from './settings'

const title = 'Settings for Clean Document'
const formFields = [
  checkBox({
    key: 'cleanLayers.deleteHiddenLayers',
    label: 'Delete hidden layers'
  }),
  checkBox({
    key: 'cleanLayers.unnestNestedGroups',
    label: 'Unnest nested groups'
  }),
  checkBox({
    key: 'cleanLayers.roundToNearestPixel',
    label: 'Round to nearest pixel'
  }),
  checkBox({
    key: 'cleanLayers.smartRenameLayers',
    label: 'Smart rename layers'
  }),
  checkBox({
    key: 'cleanLayers.smartSortLayers',
    label: 'Smart sort layers'
  }),
  textBox({
    key: 'cleanLayers.whitelistRegex',
    label: 'Whitelist regular expression'
  }),
  '-',
  checkBox({
    key: 'cleanSymbols.deleteUnusedSymbols',
    label: 'Delete unused symbols'
  }),
  checkBox({
    key: 'cleanSymbols.organiseSymbols',
    label: 'Organise symbols'
  }),
  dropDown({
    key: 'cleanSymbols.groupDefinition',
    label: 'Symbol group definition',
    possibleValues: ['1st', '2nd', '3rd', '4th']
  }),
  numericTextBox({
    key: 'cleanSymbols.space',
    label: 'Space between symbols'
  }),
  '-',
  checkBox({
    key: 'cleanStyles.deleteUnusedTextStyles',
    label: 'Delete unused text styles'
  }),
  checkBox({
    key: 'cleanStyles.deleteUnusedLayerStyles',
    label: 'Delete unused layer styles'
  }),
  '-',
  checkBox({
    key: 'cleanPages.deleteEmptyPages',
    label: 'Delete empty pages'
  }),
  checkBox({
    key: 'cleanPages.sortPages',
    label: 'Sort pages'
  })
]

export function openSettingsDialog () {
  const settings = openSettingsDialogHelper(title, formFields, defaultSettings)
  if (settings) {
    saveSettings(settings)
    showSuccessMessage('Saved settings')
  }
}
