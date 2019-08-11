import * as settings from '@sketch-plugin-helper/settings'

export const defaultSettings = {
  addArtboardBorders: {
    borderColor: '#7f7f7f',
    borderWidth: 1
  },
  addArtboardTitles: {
    font: 'SF UI Text Medium',
    fontSize: 24,
    lineHeight: 32,
    verticalSpace: 16
  }
}

export function getSettings () {
  return settings.getSettings(defaultSettings)
}

export function resetSettings () {
  return settings.resetSettings(defaultSettings)
}
