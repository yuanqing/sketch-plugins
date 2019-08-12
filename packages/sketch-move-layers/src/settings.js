import * as settings from '@sketch-plugin-helper/settings'

export const defaultSettings = {
  moveSelectedLayers: {
    horizontalOffset: null,
    verticalOffset: null
  },
  spaceLayersInGroup: {
    exactMatch: true,
    groupName: 'Group',
    space: 0
  },
  spaceSelectedLayers: {
    space: 0
  }
}

export function resetSettings () {
  return settings.resetSettings(defaultSettings)
}
