import { implementationFactory } from '../factory/implementation-factory'

export const addArtboardTitles = implementationFactory({
  mapArtboards,
  groupName: '@ArtboardTitles',
  settingsKey: 'addArtboardTitles',
  successMessage: 'Added artboard titles'
})

function mapArtboards (artboards, settings) {
  return artboards.map(function (artboard) {
    const artboardName = artboard.name
    const artboardFrame = artboard.frame
    const textLayer = MSTextLayer.alloc().initWithFrame(NSMakeRect(0, 0, 0, 0))
    textLayer.setFontPostscriptName(settings.font)
    textLayer.setFontSize(settings.fontSize)
    textLayer.setLineHeight(settings.lineHeight)
    textLayer.setStringValue(artboardName)
    textLayer.setName(artboardName)
    textLayer.setIsLocked(true)
    textLayer.setVerticalAlignment('bottom')
    textLayer.frame().setWidth(artboardFrame.width)
    textLayer.setTextBehaviour(1)
    textLayer.adjustFrameToFit()
    textLayer.frame().setX(artboardFrame.x)
    textLayer
      .frame()
      .setY(
        artboardFrame.y -
          textLayer.frame().height() -
          parseInt(settings.verticalSpace, 10)
      )
    return textLayer
  })
}
