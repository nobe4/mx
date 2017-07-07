// We need some function to use this module
module.exports = function(app, changeSite, window, goToSeach) {
	return [
		// General Menu
		{
			label: 'Mx',
			submenu: [
				{label: 'Close', accelerator: 'CmdOrCtrl+W', click: () => app.quit()},
				{label: 'Close all', accelerator: 'CmdOrCtrl+Shift+W', click: () => app.quit()},
				{label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit()},
			]
		},
		// Sources menu, change the source to a new one
		{
			label: 'Source',
			submenu: [
				{label: 'Spotify', accelerator: 'CmdOrCtrl+S', click: () => changeSite('spotify')},
				{label: 'Youtube', accelerator: 'CmdOrCtrl+Y', click: () => changeSite('youtube')},
				{label: 'SoundCloud', accelerator: 'CmdOrCtrl+D', click: () => changeSite('soundcloud')},
				{label: 'BandCamp', accelerator: 'CmdOrCtrl+B', click: () => changeSite('bandcamp')},
			]
		},
		// Edit utilites: copy, select and paste
		{
			label: 'Edit',
			submenu: [
				{label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut'},
				{label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy'},
				{label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste'},
				{label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall'},
			]
		},
		// Navigation actions
		{
			label: 'Navigation',
			submenu: [
				{label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => window.webContents.reloadIgnoringCache()},
				{label: 'Back', accelerator: 'CmdOrCtrl+Left', click: () => window.webContents.goBack()},
				{label: 'Forward', accelerator: 'CmdOrCtrl+Right', click: () => window.webContents.goForward()},
				{label: 'Search', accelerator: 'CmdOrCtrl+F', click: () => goToSeach()},
			]
		}]
};
