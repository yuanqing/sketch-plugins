import naturalCompare from 'natural-compare-lite'
import { sortSelectedLayersFactory } from '../sort-selected-layers-factory'

export const sortSelectedLayersByName = sortSelectedLayersFactory({
  sortLayers: sortLayersByName,
  successMessage: 'Sorted layers by name'
})

export function sortLayersByName (layers) {
  return layers.sort(function (a, b) {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName === bName) {
      return naturalCompare(a.id, b.id)
    }
    return naturalCompare(aName, bName)
  })
}
