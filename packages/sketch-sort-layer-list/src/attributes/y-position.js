import { sortSelectedLayersFactory } from '../sort-selected-layers-factory'

export const sortSelectedLayersByYPosition = sortSelectedLayersFactory({
  sortLayers: function (layers) {
    return layers.sort(function (layerA, layerB) {
      return layerA.frame.y - layerB.frame.y
    })
  },
  successMessage: 'Sorted layers by Y position'
})
