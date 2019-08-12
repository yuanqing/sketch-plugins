import * as settings from '@sketch-plugin-helper/settings'

export const defaultSettings = {
  cleanLayers: {
    deleteHiddenLayers: true,
    roundToNearestPixel: true,
    smartRenameLayers: true,
    smartSortLayers: true,
    unnestNestedGroups: true,
    whitelistRegex: ''
  },
  cleanPages: {
    deleteEmptyPages: true,
    sortPages: true
  },
  cleanStyles: {
    deleteUnusedLayerStyles: true,
    deleteUnusedTextStyles: true
  },
  cleanSymbols: {
    deleteUnusedSymbols: true,
    organiseSymbols: true,
    groupDefinition: '2nd',
    space: 100
  }
}

export function getSettings () {
  return settings.getSettings(defaultSettings)
}

export function resetSettings () {
  return settings.resetSettings(defaultSettings)
}
