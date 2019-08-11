import * as settings from '@sketch-plugin-helper/settings'

export const defaultSettings = {
  alignArtboardsToCanvasGrid: {
    snapToGrid: false,
    gridHeight: 200,
    gridWidth: 200,
    whitelistRegularExpression: '^@'
  },
  alignLayersToArtboardGrid: {
    snapToGrid: false,
    gridSize: 10,
    whitelistRegularExpression: '^@'
  }
}

export function getSettings () {
  return settings.getSettings(defaultSettings)
}

export function resetSettings () {
  return settings.resetSettings(defaultSettings)
}
