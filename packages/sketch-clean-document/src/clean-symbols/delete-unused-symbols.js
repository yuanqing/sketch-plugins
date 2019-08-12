import {
  getLayersOnAllPages,
  iterateChildLayers
} from '@sketch-plugin-helper/utilities'

export function deleteUnusedSymbols () {
  const symbolsToDelete = {}
  iterateChildLayers(getLayersOnAllPages(), function (layer) {
    if (layer.type === 'SymbolMaster' || layer.type === 'SymbolInstance') {
      if (
        layer.type === 'SymbolMaster' &&
        layer.getAllInstances().length === 0 &&
        symbolsToDelete[layer.symbolId] !== null
      ) {
        symbolsToDelete[layer.symbolId] = layer
      }
      layer.overrides.forEach(function (override) {
        if (override.symbolOverride) {
          symbolsToDelete[override.value] = null
        }
      })
    }
  })
  let count = 0
  Object.values(symbolsToDelete)
    .filter(Boolean)
    .forEach(function (symbol) {
      symbol.remove()
      count++
    })
  return count
}
