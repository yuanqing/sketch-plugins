import { getCurrentDocument } from '@sketch-plugin-helper/utilities'

export const deleteUnusedLayerStyles = deleteUnusedStylesFactory(
  'layerStyles',
  'sharedLayerStyles'
)
export const deleteUnusedTextStyles = deleteUnusedStylesFactory(
  'layerTextStyles',
  'sharedTextStyles'
)

function deleteUnusedStylesFactory (documentDataKey, documentKey) {
  return function () {
    const document = getCurrentDocument()
    const styles = document.sketchObject.documentData()[documentDataKey]()
    let count = 0
    document[documentKey].forEach(function (sharedStyle) {
      if (sharedStyle.getAllInstancesLayers().length === 0) {
        styles.removeSharedStyle(styles.sharedStyleWithID(sharedStyle.id))
        count++
      }
    })
    return count
  }
}
