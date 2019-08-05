import { numericTextBox, textBox } from '@sketch-plugin-helper/settings'
import settingsFactory from '../factory/settings-factory'

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

export default settingsFactory(title, formFields)
