import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'

function Dropbear (context) {

	const document = sketch.fromNative(context.document)
	const symbols = document.getSymbols()

	const options = {
		identifier: 'com.mlgrto.Dropbear',
		alwaysOnTop: true,
	}

	const browserWindow = new BrowserWindow(options)

	browserWindow.loadURL(require('./index.html'))

	browserWindow.webContents.on('requestSymbolCount', function (s) {
		browserWindow.webContents.executeJavaScript(`updateOutput(${symbols.length})`)
	})
}

export default Dropbear