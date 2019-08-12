export const label = 'Down'

export function sortLayers (a, b) {
  return b.y + b.layer.frame.height - (a.y + a.layer.frame.height)
}

export function spaceLayers ({ layers, space }) {
  let currentY = null
  layers.forEach(function ({ y, layer }) {
    if (currentY == null) {
      currentY = y
      return
    }
    currentY = currentY - space - layer.frame.height
    layer.frame.y = currentY - (y - layer.frame.y)
  })
}
