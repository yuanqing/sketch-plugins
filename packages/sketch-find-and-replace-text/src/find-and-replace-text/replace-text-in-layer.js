export const replaceTextInLayer = {
  SymbolInstance: replaceTextInSymbolInstance,
  Text: replaceTextInTextLayer
}

function replaceTextInSymbolInstance (layer, regex, replaceText) {
  let count = 0
  layer.overrides.forEach(function (override) {
    if (override.symbolOverride) {
      return
    }
    const text = override.value
    if (regex.test(text)) {
      override.value = text.replace(regex, function () {
        count++
        return replaceText
      })
    }
  })
  return count
}

function replaceTextInTextLayer (layer, regex, replaceText) {
  const text = layer.text
  if (regex.test(text)) {
    let count = 0
    layer.text = text.replace(regex, function () {
      count++
      return replaceText
    })
    return count
  }
  return 0
}
