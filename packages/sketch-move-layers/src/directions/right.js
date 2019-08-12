export const label = 'Right'

export function sortLayers (a, b) {
  return b.x + b.layer.frame.width - (a.x + a.layer.frame.width)
}

export function spaceLayers ({ layers, space }) {
  let currentX = null
  layers.forEach(function ({ x, layer }) {
    if (currentX == null) {
      currentX = x
      return
    }
    currentX = currentX - space - layer.frame.width
    layer.frame.x = currentX - (x - layer.frame.x)
  })
}
