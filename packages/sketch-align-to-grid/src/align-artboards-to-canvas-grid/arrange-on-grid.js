import { roundDown } from '../round-down'

export function arrangeOnGrid (layers, gridWidth, gridHeight) {
  const grid = []
  insertLayersIntoGrid(grid, layers, gridWidth, gridHeight)
  adjustYPosition(grid, gridHeight)
  adjustXPosition(grid, gridWidth)
  updateLayerPositions(grid)
}

function insertLayersIntoGrid (grid, layers, gridWidth, gridHeight) {
  layers.forEach(function (layerToInsert) {
    const x = roundDown(layerToInsert.frame.x, gridWidth)
    const y = roundDown(layerToInsert.frame.y, gridHeight)
    const row = getRow(grid, y)
    row.layers.push({
      x,
      layer: layerToInsert
    })
  })
  sortRowsByXPosition(grid)
}

function getRow (grid, y) {
  const index = grid.reduce(function (result, item, index) {
    if (result !== -1) {
      return result
    }
    if (item.y === y) {
      return index
    }
    return result
  }, -1)
  if (index !== -1) {
    return grid[index]
  }
  const spliceIndex = grid.reduce(function (spliceIndex, item, index) {
    if (y < item.y) {
      return index
    }
    return spliceIndex
  }, grid.length)
  const row = {
    y,
    layers: []
  }
  grid.splice(spliceIndex, 0, row)
  return row
}

function sortRowsByXPosition (grid) {
  grid.forEach(function (row) {
    row.layers.sort(function (a, b) {
      return a.layer.frame.x - b.layer.frame.x
    })
  })
}

// Adjust Y-position based on the height of layers in preceding rows
function adjustYPosition (grid, gridHeight) {
  grid.forEach(function ({ y, layers }, index) {
    let maxHeight = 0
    layers.forEach(function ({ layer }) {
      if (layer.frame.height > maxHeight) {
        maxHeight = layer.frame.height
      }
    })
    const nextIndex = index + 1
    if (nextIndex < grid.length && y + maxHeight >= grid[nextIndex].y) {
      grid.slice(nextIndex).forEach(function (row) {
        row.y = roundDown(row.y + maxHeight, gridHeight)
      })
    }
  })
}

// Adjust X-position based on the width of preceding layers in the same row
function adjustXPosition (grid, gridWidth) {
  grid.forEach(function ({ layers }) {
    layers.forEach(function ({ x, layer }, index) {
      const nextIndex = index + 1
      const layerWidth = layer.frame.width
      if (nextIndex < layers.length && x + layerWidth >= layers[nextIndex].x) {
        layers.slice(nextIndex).forEach(function (item) {
          item.x = roundDown(item.x + layerWidth, gridWidth)
          if (item.x === x) {
            item.x += gridWidth
          }
        })
      }
    })
  })
}

function updateLayerPositions (grid) {
  grid.forEach(function ({ y, layers }) {
    layers.forEach(function ({ x, layer }) {
      layer.frame.x = x
      layer.frame.y = y
    })
  })
}
