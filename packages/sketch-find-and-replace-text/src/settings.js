import * as settings from '@sketch-plugin-helper/settings'

export const defaultSettings = {
  caseSensitive: true,
  findText: '',
  replaceText: '',
  scope: 'Current page'
}

export function resetSettings () {
  return settings.resetSettings(defaultSettings)
}
