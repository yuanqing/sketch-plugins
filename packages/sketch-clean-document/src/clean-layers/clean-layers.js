import {
  getLayersOnAllPages,
  getSelectedLayersOrLayersOnCurrentPage,
  iterateChildLayers,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import { getSettings } from '../settings/settings'
import { checkSettings } from '../settings/check-settings'
import { deleteHiddenLayer } from './delete-hidden-layer'
import { roundToNearestPixel } from './round-to-nearest-pixel'
import { smartRenameLayer } from './smart-rename-layer'
import { smartSortLayer } from './smart-sort-layer'
import { unnestNestedGroup } from './unnest-nested-group'

export function cleanLayers ({ isCleanDocument }) {
  const settings = getSettings().cleanLayers
  if (!checkSettings(settings)) {
    return
  }
  const layers = isCleanDocument
    ? getLayersOnAllPages()
    : getSelectedLayersOrLayersOnCurrentPage()
  const regex = settings.whitelistRegex
  const whitelistRegex = regex === '' ? null : new RegExp(regex)
  iterateChildLayers(layers, function (layer) {
    if (whitelistRegex && whitelistRegex.test(layer.name)) {
      return
    }
    if (settings.deleteHiddenLayers && deleteHiddenLayer(layer)) {
      return
    }
    if (settings.roundToNearestPixel) {
      roundToNearestPixel(layer)
    }
    if (settings.smartRenameLayers) {
      smartRenameLayer(layer)
    }
    if (settings.smartSortLayers) {
      smartSortLayer(layer)
    }
    if (settings.unnestNestedGroups) {
      unnestNestedGroup(layer)
    }
  })
  if (!isCleanDocument) {
    showSuccessMessage('Layers cleaned')
  }
}
