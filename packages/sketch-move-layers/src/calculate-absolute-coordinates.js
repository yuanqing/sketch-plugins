import { calculateCoordinatesRelativeToPage } from '@sketch-plugin-helper/utilities'

export function calculateAbsoluteCoordinates (layers) {
  return layers.map(function (layer) {
    return {
      ...calculateCoordinatesRelativeToPage(layer),
      layer
    }
  })
}
