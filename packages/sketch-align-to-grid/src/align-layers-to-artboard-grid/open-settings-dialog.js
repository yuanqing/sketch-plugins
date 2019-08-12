import {
  checkBox,
  numericTextBox,
  textBox
} from '@sketch-plugin-helper/settings'
import { openSettingsDialogFactory } from '../settings/open-settings-dialog-factory'

const title = 'Settings for Artboard Grid'
const formFields = [
  numericTextBox({
    key: 'alignLayersToArtboardGrid.gridSize',
    label: 'Grid size'
  }),
  textBox({
    key: 'alignLayersToArtboardGrid.whitelistRegex',
    label: 'Whitelist regular expression'
  }),
  checkBox({
    key: 'alignLayersToArtboardGrid.snapToGrid',
    label: 'Snap layers to artboard grid'
  })
]

export const openSettingsDialog = openSettingsDialogFactory(title, formFields)
