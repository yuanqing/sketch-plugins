# Clean Document [![npm Version](https://img.shields.io/npm/v/sketch-clean-document)](https://www.npmjs.com/package/sketch-clean-document)

> A Sketch plugin to automagically organise and clean up your Sketch document

![Clean Layers](media/clean-layers.gif)

## Commands

### Clean Layers

- Deletes hidden layers
- Unnests nested groups
- Rounds layer edges to the nearest pixel
- Smart rename layers
- Operates on layers in the selection, or on layers on the current page if the selection is empty
- Skips processing of certain layers that match a whitelist regular expression

### Clean Symbols

- Deletes unused symbol masters
- Organises the Symbol page

### Clean Styles

- Deletes unused text styles and layer styles

### Clean Pages

- Deletes empty pages
- Sorts the pages in alphabetical order

### Clean Document

- Executes the above four commands on all layers, all symbols, all text styles and layer styles, and all pages in the current document

## Installation

1. [Download and unzip the latest release](https://github.com/yuanqing/sketch-plugins/releases/download/sketch-clean-document-0.1.1/plugin.zip)
2. Double-click `Clean Document.sketchplugin` to install

## License

[MIT](LICENSE.md)
