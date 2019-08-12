export const label = 'Up'

export function sortLayers (a, b) {
  return a.y - b.y
}

export function spaceLayers ({ layers, space }) {
  let currentY = null
  layers.forEach(function ({ y, layer }) {
    if (currentY == null) {
      currentY = y + layer.frame.height + space
      return
    }
    layer.frame.y = currentY - (y - layer.frame.y)
    currentY = currentY + layer.frame.height + space
  })
}
