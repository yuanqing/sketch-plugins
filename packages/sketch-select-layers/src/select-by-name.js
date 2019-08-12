import {
  checkBox,
  dropDown,
  openSettingsDialog,
  saveTemporarySettings,
  textBox
} from '@sketch-plugin-helper/settings'
import {
  getSelectedLayersOrLayersOnCurrentPage,
  iterateChildLayers,
  showMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import { defaultSettings } from './settings'

const mapLabelToType = {
  Artboard: 'Artboard',
  Group: 'Group',
  'Text Layer': 'Text',
  'Shape Layer': 'ShapePath',
  'Symbol Instance': 'SymbolInstance',
  Image: 'Image',
  Slice: 'Slice',
  Hotspot: 'HotSpot'
}

export function selectByName () {
  const title = 'Select By Name'
  const formFields = [
    textBox({
      key: 'selectByName.layerName',
      label: 'Layer name'
    }),
    checkBox({
      key: 'selectByName.exactMatch',
      label: 'Exact match'
    }),
    dropDown({
      key: 'selectByName.type',
      label: 'Type',
      possibleValues: ['Any', ...Object.keys(mapLabelToType), 'Hidden']
    })
  ]
  const settings = openSettingsDialog(title, formFields, defaultSettings)
  if (!settings) {
    return
  }
  saveTemporarySettings(settings)
  const { layerName, exactMatch, type } = settings.selectByName
  const regularExpression = new RegExp(
    exactMatch ? `^${layerName}$` : layerName
  )
  let count = 0
  iterateChildLayers(getSelectedLayersOrLayersOnCurrentPage(), function (
    layer
  ) {
    if (shouldSelectLayer({ layer, type, regularExpression })) {
      layer.selected = true
      count++
      return
    }
    layer.selected = false
  })
  if (count === 0) {
    showMessage('Nothing selected')
    return
  }
  showSuccessMessage(`Selected ${count} ${count === 1 ? 'layer' : 'layers'}`)
}

function shouldSelectLayer ({ layer, type, regularExpression }) {
  if (type === 'Hidden' && !layer.hidden) {
    return false
  }
  if (
    type !== 'Any' &&
    type !== 'Hidden' &&
    layer.type !== mapLabelToType[type]
  ) {
    return false
  }
  return regularExpression.test(layer.name)
}
