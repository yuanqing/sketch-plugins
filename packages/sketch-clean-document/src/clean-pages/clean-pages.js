import {
  getAllPages,
  getCurrentDocument,
  getSymbolsPage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import naturalCompare from 'natural-compare-lite'
import { fromNative } from 'sketch'
import { checkSettings } from '../settings/check-settings'
import { getSettings } from '../settings/settings'

export function cleanPages ({ isCleanDocument }) {
  const settings = getSettings().cleanPages
  if (!checkSettings(settings)) {
    return
  }
  let count = 0
  if (settings.sortPages) {
    sortPages()
  }
  if (settings.deleteEmptyPages) {
    count = deleteEmptyPages()
  }
  if (isCleanDocument) {
    return
  }
  if (!settings.deleteEmptyPages || count === 0) {
    showSuccessMessage('Sorted pages')
    return
  }
  showSuccessMessage(
    `Sorted pages and deleted ${count} empty page${count === 1 ? '' : 's'}`
  )
}

function sortPages () {
  const document = getCurrentDocument().sketchObject
  const pages = document.pages()
  const symbolsPage = getSymbolsPage()
  const symbolsPageId = symbolsPage ? symbolsPage.id : null
  pages.sort(function (a, b) {
    const pageA = fromNative(a)
    const pageB = fromNative(b)
    if (pageA.id === symbolsPageId) {
      return 1
    }
    if (pageB.id === symbolsPageId) {
      return -1
    }
    if (pageA.name === pageB.name) {
      return naturalCompare(pageA.id, pageB.id)
    }
    return naturalCompare(pageA.name.toLowerCase(), pageB.name.toLowerCase())
  })
  document.performPageSwitchUpdates()
}

function deleteEmptyPages () {
  let count = 0
  getAllPages().forEach(function (page) {
    if (page.layers.length === 0) {
      page.remove()
      count++
    }
  })
  return count
}
