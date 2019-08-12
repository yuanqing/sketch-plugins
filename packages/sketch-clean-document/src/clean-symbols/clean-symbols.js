import {
  showMessage,
  showSuccessMessage
} from '@sketch-plugin-helper/utilities'
import { checkSettings } from '../settings/check-settings'
import { getSettings } from '../settings/settings'
import { deleteUnusedSymbols } from './delete-unused-symbols'
import { organiseSymbols } from './organise-symbols'

export function cleanSymbols ({
  isCleanDocument,
  totalDeletedSymbolsCount = 0
}) {
  const settings = getSettings().cleanSymbols
  if (!checkSettings(settings)) {
    return
  }
  let count = 0
  if (settings.deleteUnusedSymbols) {
    count = deleteUnusedSymbols()
  }
  if (settings.organiseSymbols) {
    organiseSymbols(parseInt(settings.groupDefinition, 10), settings.space)
  }
  if (isCleanDocument) {
    return
  }
  if (settings.deleteUnusedSymbols) {
    totalDeletedSymbolsCount += count
    if (count !== 0) {
      // Keep attempting to delete symbols if at least one symbol was
      // deleted in this iteration
      cleanSymbols({ isCleanDocument, totalDeletedSymbolsCount })
      return
    }
    if (totalDeletedSymbolsCount === 0) {
      showMessage('No unused symbols')
      return
    }
    showSuccessMessage(
      `Deleted ${totalDeletedSymbolsCount} unused symbol${
        totalDeletedSymbolsCount === 1 ? '' : 's'
      }`
    )
  }
}
