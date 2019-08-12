import { numericTextBox, textBox } from '@sketch-plugin-helper/settings'
import { openSettingsDialogFactory } from '../factory/open-settings-dialog-factory'

const title = 'Settings for Add Artboard Titles'
const formFields = [
  textBox({
    key: 'addArtboardTitles.font',
    label: 'Font'
  }),
  numericTextBox({
    key: 'addArtboardTitles.fontSize',
    label: 'Font size'
  }),
  numericTextBox({
    key: 'addArtboardTitles.lineHeight',
    label: 'Line-height'
  }),
  numericTextBox({
    key: 'addArtboardTitles.verticalSpace',
    label: 'Vertical space'
  })
]

export const openSettingsDialog = openSettingsDialogFactory(title, formFields)
