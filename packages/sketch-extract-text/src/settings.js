import * as settings from '@sketch-plugin-helper/settings'

export const defaultSettings = {
  matchType: 'Match layer content',
  regex: '^Remark'
}

export function resetSettings () {
  return settings.resetSettings(defaultSettings)
}
