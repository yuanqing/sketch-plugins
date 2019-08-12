const layerName = '@SliceOverSelection'

export function createSliceLayer (maximumBounds, backgroundColor, padding) {
  const sliceLayer = MSSliceLayer.new()
  const frame = sliceLayer.frame()
  frame.setX(maximumBounds[0].x - padding)
  frame.setY(maximumBounds[0].y - padding)
  frame.setWidth(maximumBounds[1].x - maximumBounds[0].x + 2 * padding)
  frame.setHeight(maximumBounds[1].y - maximumBounds[0].y + 2 * padding)
  if (backgroundColor !== '' && backgroundColor.charAt(0) === '#') {
    sliceLayer.hasBackgroundColor = true
    const rgbColor = convertHexToRGB(backgroundColor)
    sliceLayer.setBackgroundColor(
      MSColor.colorWithRed_green_blue_alpha(
        rgbColor.r / 255,
        rgbColor.g / 255,
        rgbColor.b / 255,
        1
      )
    )
  }
  sliceLayer.setName(layerName)
  sliceLayer.setIsLocked(true)
  return sliceLayer
}

function convertHexToRGB (hex) {
  return {
    r: parseInt(hex.substr(1, 2), 16),
    g: parseInt(hex.substr(3, 2), 16),
    b: parseInt(hex.substr(5, 2), 16)
  }
}
