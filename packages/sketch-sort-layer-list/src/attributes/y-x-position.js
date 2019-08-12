import { compareYXposition } from '../compare-y-x-position'
import { sortSelectedLayersFactory } from '../sort-selected-layers-factory'

export const sortSelectedLayersByYXPosition = sortSelectedLayersFactory({
  sortLayers: function (layers) {
    return layers.sort(compareYXposition)
  },
  successMessage: 'Sorted layers by Y and X position'
})
