import {
  checkBox,
  numericTextBox,
  textBox
} from '@sketch-plugin-helper/settings'
import { openSettingsDialogFactory } from '../settings/open-settings-dialog-factory'

const title = 'Settings for Canvas Grid'
const formFields = [
  numericTextBox({
    key: 'alignArtboardsToCanvasGrid.gridWidth',
    label: 'Grid width'
  }),
  numericTextBox({
    key: 'alignArtboardsToCanvasGrid.gridHeight',
    label: 'Grid height'
  }),
  textBox({
    key: 'alignArtboardsToCanvasGrid.whitelistRegex',
    label: 'Whitelist regular expression'
  }),
  checkBox({
    key: 'alignArtboardsToCanvasGrid.snapToGrid',
    label: 'Snap artboards to canvas grid'
  })
]

export const openSettingsDialog = openSettingsDialogFactory(title, formFields)
