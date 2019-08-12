export default function filterTextLayersByRegex (
  textLayers,
  regex,
  shouldMatchLayerContent
) {
  return textLayers.filter(function (textLayer) {
    const layerContent = textLayer.text
    return (
      layerContent !== '' &&
      regex.test(shouldMatchLayerContent ? layerContent : textLayer.name)
    )
  })
}
