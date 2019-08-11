import {
  getArtboardsOnCurrentPage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import arrangeOnGrid from './arrange-on-grid'
import { getSettings } from '../settings/settings'

export default function alignArtboardsToCanvasGrid ({ isAction }) {
  const {
    gridHeight,
    gridWidth,
    whitelistRegularExpression
  } = getSettings().alignArtboardsToCanvasGrid
  const layers = getArtboards(whitelistRegularExpression)
  arrangeOnGrid(layers, gridWidth, gridHeight)
  if (!isAction) {
    showSuccessMessage('Aligned artboards to canvas grid')
  }
}

function getArtboards (whitelistRegularExpression) {
  const artboards = getArtboardsOnCurrentPage()
  if (!whitelistRegularExpression) {
    return artboards
  }
  const regularExpression = new RegExp(whitelistRegularExpression)
  return artboards.filter(function (artboard) {
    return !regularExpression.test(artboard.name)
  })
}
