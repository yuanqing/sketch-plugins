import {
  numericTextBox,
  openSettingsDialog as openSettingsDialogHelper,
  saveSettings,
  textBox
} from '@sketch-plugin-helper/settings'
import { showSuccessMessage } from '@sketch-plugin-helper/utilities'
import { defaultSettings } from './settings'

const title = 'Settings for Draw Slice Over Selection'
const formFields = [
  textBox({
    key: 'backgroundColor',
    label: 'Background Color'
  }),
  numericTextBox({
    key: 'padding',
    label: 'Padding'
  })
]

export function openSettingsDialog () {
  const settings = openSettingsDialogHelper(title, formFields, defaultSettings)
  if (settings) {
    saveSettings(settings)
    showSuccessMessage('Saved settings')
  }
}
