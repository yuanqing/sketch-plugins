import {
  checkBox,
  numericTextBox,
  textBox
} from '@sketch-plugin-helper/settings'
import settingsFactory from '../settings/settings-factory'

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

export default settingsFactory(title, formFields)
