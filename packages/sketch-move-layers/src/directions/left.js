export const label = 'Left'

export function sortLayers (a, b) {
  return a.x - b.x
}

export function spaceLayers ({ layers, space }) {
  let currentX = null
  layers.forEach(function ({ x, layer }) {
    if (currentX == null) {
      currentX = x + layer.frame.width + space
      return
    }
    layer.frame.x = currentX - (x - layer.frame.x)
    currentX = currentX + layer.frame.width + space
  })
}
