import implementationFactory from '../factory/implementation-factory'

export default implementationFactory({
  mapArtboards,
  groupName: '@ArtboardBorders',
  settingsKey: 'addArtboardBorders',
  successMessage: 'Added artboard borders'
})

function mapArtboards (artboards, settings) {
  return artboards.map(function (artboard) {
    const shapeLayer = MSRectangleShape.alloc().initWithFrame(
      artboard.sketchObject.rect()
    )
    shapeLayer.setName(artboard.name)
    shapeLayer.setIsLocked(true)
    const style = MSStyle.alloc().init()
    const border = style.addStylePartOfType(1)
    border.color = MSImmutableColor.colorWithSVGString(
      settings.borderColor
    ).newMutableCounterpart()
    border.thickness = settings.borderWidth
    border.position = 2
    shapeLayer.setStyle(style)
    return shapeLayer
  })
}
