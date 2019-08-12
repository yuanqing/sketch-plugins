import { sortSelectedLayersFactory } from '../sort-selected-layers-factory'

export const sortSelectedLayersByXPosition = sortSelectedLayersFactory({
  sortLayers: function (layers) {
    return layers.sort(function (layerA, layerB) {
      return layerA.frame.x - layerB.frame.x
    })
  },
  successMessage: 'Sorted layers by X position'
})
