import {
  openSettingsDialog,
  saveSettings
} from '@sketch-plugin-helper/settings'
import { showSuccessMessage } from '@sketch-plugin-helper/utilities'
import { defaultSettings } from './settings'

export default function settingsFactory (title, formFields) {
  return function () {
    const settings = openSettingsDialog(title, formFields, defaultSettings)
    if (settings) {
      saveSettings(settings)
      showSuccessMessage('Saved settings')
    }
  }
}
