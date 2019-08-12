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
    whitelistRegex
  } = getSettings().alignArtboardsToCanvasGrid
  const layers = getArtboards(whitelistRegex)
  arrangeOnGrid(layers, gridWidth, gridHeight)
  if (!isAction) {
    showSuccessMessage('Aligned artboards to canvas grid')
  }
}

function getArtboards (whitelistRegex) {
  const artboards = getArtboardsOnCurrentPage()
  if (!whitelistRegex) {
    return artboards
  }
  const regex = new RegExp(whitelistRegex)
  return artboards.filter(function (artboard) {
    return !regex.test(artboard.name)
  })
}
