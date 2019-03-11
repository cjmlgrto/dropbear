import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'

function Dropbear (context) {

	const document = sketch.fromNative(context.document)
	const selection = sketch.fromNative(context.selection)
	const symbols = document.getSymbols()

	const options = {
		identifier: 'com.mlgrto.Dropbear',
		titleBarStyle: 'hidden',
		alwaysOnTop: true,
		devTools: true,
		height: 320,
		width: 320,
	}

	const browserWindow = new BrowserWindow(options)

	browserWindow.loadURL(require('./index.html'))

	for (var i = 0; i < symbols.length; i++) {
		var name = symbols[i].name
		var id = symbols[i].id
		browserWindow.webContents.executeJavaScript(`list("${name},${id}")`)
	}

	browserWindow.webContents.on('symbolClicked', function (s) {
		sketch.UI.message(s)
	})
}

export default Dropbear