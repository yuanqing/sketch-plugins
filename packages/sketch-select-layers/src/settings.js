import * as settings from '@sketch-plugin-helper/settings'

export const defaultSettings = {
  selectByName: {
    exactMatch: true,
    layerName: null,
    type: 'Any'
  }
}

export function resetSettings () {
  return settings.resetSettings(defaultSettings)
}
