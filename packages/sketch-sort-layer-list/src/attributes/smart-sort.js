import { compareYXposition } from '../compare-y-x-position'
import { sortSelectedLayersFactory } from '../sort-selected-layers-factory'

export const smartSortSelectedLayers = sortSelectedLayersFactory({
  sortLayers: smartSortLayers,
  successMessage: 'Smart sorted layers'
})

export function smartSortLayers ([firstLayer, ...layers]) {
  const result = [firstLayer]
  layers.forEach(function (layer) {
    let i = result.length
    while (i-- > 0) {
      const resultLayer = result[i]
      if (
        checkLayersOverlap(layer, resultLayer) ||
        compareYXposition(layer, resultLayer) > 0
      ) {
        result.splice(i + 1, 0, layer)
        return
      }
    }
    result.splice(0, 0, layer)
  })
  return result
}

function checkLayersOverlap (layerA, layerB) {
  const a = layerA.frame
  const b = layerB.frame
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  )
}
