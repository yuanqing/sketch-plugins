import { adjustParentGroupsToFit } from '@sketch-plugin-helper/utilities'

const keys = ['width', 'height', 'x', 'y']

export function roundToNearestPixel (layer) {
  keys.forEach(function (key) {
    layer.frame[key] = Math.round(layer.frame[key])
    adjustParentGroupsToFit(layer)
  })
}
