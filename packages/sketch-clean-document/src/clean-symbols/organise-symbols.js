import { getSymbolsPage, getAllPages } from '@sketch-plugin-helper/utilities'
import naturalCompare from 'natural-compare-lite'
import { Page } from 'sketch/dom'
import { sortLayersByName } from 'sketch-sort-layer-list/src/attributes/name'
import { updateLayerList } from 'sketch-sort-layer-list/src/update-layer-list'

export function organiseSymbols (groupDefinition, space) {
  const symbols = getAllSymbols()
  if (symbols.length === 0) {
    return
  }
  const symbolsPage = getSymbolsPage() || Page.createSymbolsPage()
  symbolsPage.sketchObject.setRulerBase(CGPointMake(0, 0))
  symbolsPage.name = 'Symbols'
  moveToSymbolsPage(symbols, symbolsPage)
  const symbolGroups = createSymbolGroups(symbols, groupDefinition)
  arrangeSymbolGroups(symbolGroups, space)
  sortLayerList(symbolGroups)
}

function getAllSymbols () {
  const result = []
  getAllPages().forEach(function (page) {
    page.layers.forEach(function (layer) {
      if (layer.type === 'SymbolMaster') {
        result.push(layer)
      }
    })
  })
  return result
}

function moveToSymbolsPage (symbols, symbolsPage) {
  symbols.forEach(function (layer) {
    if (layer.parent.id !== symbolsPage.id) {
      layer.sketchObject.moveToLayer_beforeLayer(symbolsPage.sketchObject, null)
      layer.sketchObject.select_byExpandingSelection(false, true)
    }
  })
}

const slashRegex = /\s*\/\s*/

function createSymbolGroups (symbols, groupDefinition) {
  const groups = {}
  symbols.forEach(function (layer) {
    const split = layer.name.split(slashRegex)
    const groupName = split.slice(0, groupDefinition).join('/')
    if (!groups[groupName]) {
      groups[groupName] = {
        groupName,
        layers: []
      }
    }
    groups[groupName].layers.push(layer)
  })
  return Object.values(groups)
    .sort(function (a, b) {
      return naturalCompare(
        a.groupName.toLowerCase(),
        b.groupName.toLowerCase()
      )
    })
    .map(function ({ layers }) {
      return sortLayersByName(layers)
    })
}

function arrangeSymbolGroups (symbolGroups, space) {
  let x = 0
  symbolGroups.forEach(function (symbolGroup) {
    let y = 0
    let maxWidth = 0
    symbolGroup.forEach(function (layer) {
      layer.frame.x = x
      layer.frame.y = y
      y += layer.frame.height + space
      if (layer.frame.width > maxWidth) {
        maxWidth = layer.frame.width
      }
    })
    x += maxWidth + space
  })
}

function sortLayerList (symbolGroups) {
  const layers = []
  symbolGroups.forEach(function (symbolGroup) {
    symbolGroup.forEach(function (layer) {
      layers.push(layer)
    })
  })
  updateLayerList(layers, false)
}
