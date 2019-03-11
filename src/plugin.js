import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'

function Dropbear () {
	const options = {
		identifier: 'com.mlgrto.Dropbear',
		alwaysOnTop: true,
	}

	const browserWindow = new BrowserWindow(options)

	browserWindow.loadURL(require('./index.html'))

	browserWindow.webContents
		.executeJavaScript('display("Hello!")')
		.then(res => {
			sketch.UI.message('Connected.')
		})

	browserWindow.webContents.on('eventEmitted', function(s) {
		sketch.UI.message(s)
	})
}

export default Dropbear