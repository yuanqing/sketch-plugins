import {
  checkBox,
  openSettingsDialog,
  saveTemporarySettings,
  numericTextBox,
  textBox
} from '@sketch-plugin-helper/settings'
import {
  adjustParentGroupsToFit,
  getLayersOnCurrentPage,
  iterateChildLayers,
  showErrorMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import { calculateAbsoluteCoordinates } from './calculate-absolute-coordinates'
import directions from './directions/directions'
import { defaultSettings } from './settings'

export const spaceLayersInGroupLeft = spaceLayersInGroupFactory('left')
export const spaceLayersInGroupRight = spaceLayersInGroupFactory('right')
export const spaceLayersInGroupUp = spaceLayersInGroupFactory('up')
export const spaceLayersInGroupDown = spaceLayersInGroupFactory('down')

function spaceLayersInGroupFactory (direction) {
  const { sortLayers, spaceLayers, label } = directions[direction]
  return function () {
    const title = `Space Layers in Group ${label}`
    const formFields = [
      textBox({
        key: 'spaceLayersInGroup.groupName',
        label: 'Group name'
      }),
      checkBox({
        key: 'spaceLayersInGroup.exactMatch',
        label: 'Exact match'
      }),
      numericTextBox({
        key: 'spaceLayersInGroup.space',
        label: 'Space'
      })
    ]
    const settings = openSettingsDialog(title, formFields, defaultSettings)
    if (!settings) {
      return
    }
    saveTemporarySettings(settings)
    const { space, groupName, exactMatch } = settings.spaceLayersInGroup
    const regex = new RegExp(exactMatch ? `^${groupName}$` : groupName)
    const groups = getGroupsByRegex(regex)
    if (groups.length === 0) {
      showErrorMessage('No groups found')
      return
    }
    groups.forEach(function (group) {
      spaceLayers({
        layers: calculateAbsoluteCoordinates(group.layers).sort(sortLayers),
        space
      })
      group.adjustToFit()
    })
    groups.forEach(adjustParentGroupsToFit)
    showSuccessMessage(`Spaced layers in group ${direction}`)
  }
}

function getGroupsByRegex (regex) {
  const result = []
  iterateChildLayers(getLayersOnCurrentPage(), function (layer) {
    if (layer.type === 'Group' && regex.test(layer.name)) {
      result.push(layer)
    }
  })
  return result
}
