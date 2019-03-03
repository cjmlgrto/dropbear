import sketch from 'sketch'

function Dropbear () {
	// Constants
	const panelWidth = 320
	const panelHeight = 320

	// Initialise panel
	var identifier = 'com.mlgrto.Dropbear'
	var threadDictionary = NSThread.mainThread().threadDictionary()

	if (threadDictionary[identifier]) return

	var panel = NSPanel.alloc().init()
	threadDictionary[identifier] = panel
	COScript.currentCOScript().setShouldKeepAround_(true)

	// Setup panel
	panel.setFrame_display(NSMakeRect(0, 0, panelWidth, panelHeight), true)
	panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask)
	panel.setBackgroundColor(NSColor.whiteColor())

	panel.title = 'Dropbear'
	panel.titlebarAppearsTransparent = true

	panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
	panel.standardWindowButton(NSWindowZoomButton).setHidden(true)

	var closeButton = panel.standardWindowButton(NSWindowCloseButton)
	closeButton.setCOSJSTargetFunction(function(sender) {
		panel.close();
		threadDictionary.removeObjectForKey(identifier);
		COScript.currentCOScript().setShouldKeepAround_(false);
	});

	var vibrancy = NSVisualEffectView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight))
	vibrancy.setAppearance(NSAppearance.appearanceNamed(NSAppearanceNameVibrantLight))
	vibrancy.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
	panel.contentView().addSubview(vibrancy)

	panel.center()
	panel.makeKeyAndOrderFront(null)
	panel.setLevel(NSFloatingWindowLevel)

	// Setup web view
	var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight - 44))
	var request = NSURLRequest.requestWithURL(context.plugin.urlForResourceNamed("dropbear.html"))
	webView.mainFrame().loadRequest(request)
	webView.setDrawsBackground(false)
	panel.contentView().addSubview(webView)
}

export default Dropbear