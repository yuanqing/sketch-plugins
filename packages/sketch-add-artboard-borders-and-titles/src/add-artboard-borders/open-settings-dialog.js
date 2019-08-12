import { numericTextBox, textBox } from '@sketch-plugin-helper/settings'
import { openSettingsDialogFactory } from '../factory/open-settings-dialog-factory'

const title = 'Settings for Add Artboard Borders'
const formFields = [
  numericTextBox({
    key: 'addArtboardBorders.borderWidth',
    label: 'Border width'
  }),
  textBox({
    key: 'addArtboardBorders.borderColor',
    label: 'Border color'
  })
]

export const openSettingsDialog = openSettingsDialogFactory(title, formFields)
