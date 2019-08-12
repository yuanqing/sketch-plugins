import * as settings from '@sketch-plugin-helper/settings'

export const defaultSettings = {
  backgroundColor: '#f9f9f9',
  padding: 100
}

export function getSettings () {
  return settings.getSettings(defaultSettings)
}

export function resetSettings () {
  return settings.resetSettings(defaultSettings)
}
