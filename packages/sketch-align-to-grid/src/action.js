import { fromNative } from 'sketch'
import { alignLayersToArtboardGrid } from './align-layers-to-artboard-grid/align-layers-to-artboard-grid'
import { alignArtboardsToCanvasGrid } from './align-artboards-to-canvas-grid/align-artboards-to-canvas-grid'
import { getSettings } from './settings/settings'

export function action ({ actionContext }) {
  const settings = getSettings()
  const layers = collectLayersInArtboards(actionContext.layers)
  const hasArtboard = actionContext.layers.length > layers.length
  if (settings.alignLayersToArtboardGrid.snapToGrid && layers.length > 0) {
    alignLayersToArtboardGrid({ isAction: true, layers })
  }
  if (settings.alignArtboardsToCanvasGrid.snapToGrid && hasArtboard) {
    alignArtboardsToCanvasGrid({ isAction: true })
  }
}

function collectLayersInArtboards (layers) {
  const result = []
  let i = -1
  let layer
  while (++i < layers.length) {
    layer = fromNative(layers[i])
    if (layer.type !== 'Artboard' && layer.getParentArtboard()) {
      result.push(layer)
    }
  }
  return result
}
