import { calculateCoordinatesRelativeToPage } from '@sketch-plugin-helper/utilities'

export default function calculateMaximumBounds (layers) {
  let maximumBounds = [
    {
      x: Number.MAX_VALUE,
      y: Number.MAX_VALUE
    },
    {
      x: -1 * Number.MAX_VALUE,
      y: -1 * Number.MAX_VALUE
    }
  ]
  layers.forEach(function (layer) {
    const { width, height } = layer.frame
    const { x, y } = calculateCoordinatesRelativeToPage(layer)
    maximumBounds = [
      {
        x: Math.min(maximumBounds[0].x, x),
        y: Math.min(maximumBounds[0].y, y)
      },
      {
        x: Math.max(maximumBounds[1].x, x + width),
        y: Math.max(maximumBounds[1].y, y + height)
      }
    ]
  })
  return maximumBounds
}
