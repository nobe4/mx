const electron = require('electron');
const app = electron.app;

// Add Chromium's Widevine plugin back into Electron
const widevinePath = require('child_process').execSync('find "/Applications/Google Chrome.app" -name widevinecdmadapter.plugin').toString().split('\n')[0];
app.commandLine.appendSwitch('widevine-cdm-path', widevinePath)
app.commandLine.appendSwitch('widevine-cdm-version', '0')

// Save the window and current config globally
let window;
let current_config;

const config = require('./config.js');

// Change the current site, update the config and bindings.
const changeSite = function(name) {
	// Only change the site if the new site is actually changing.
	if (current_config != config[name]){
		current_config = config[name];

		window.loadURL(current_config.url);

		// Bind key shortcuts for media control
		current_config.bindings.forEach(([key, element]) => {
			// Remove previous binding
			electron.globalShortcut.unregister(key);
			// Bind the new function
			electron.globalShortcut.register(key, function(){
				window.webContents.executeJavaScript(
					`document.querySelector('${element}').click();`
				)
			});
		});
	}
};

// helper to search in the website
const goToSeach = function(){
	window.loadURL(current_config.search[0]);
	window.webContents.executeJavaScript(`document.querySelector('${current_config.search[1]}').focus();`);
}

// Lauch the app
app.on('ready', function(){
	// Open the main window
	window = new electron.BrowserWindow(config.window);

	// For debug
	// window.openDevTools();

	// Load Spotify by default
	changeSite('spotify');

	// Blacklist ads
	window.webContents.session.webRequest.onBeforeRequest({urls: current_config.blacklist}, (details, callback) => callback({cancel: true}));

	// Inject custom style and script
	window.webContents.on('did-finish-load', () => {
		window.webContents.insertCSS(current_config.css)
		window.webContents.executeJavaScript(current_config.js);
	});

	// Bind local key shortcuts for navigation and paste
	electron.Menu.setApplicationMenu(
		electron.Menu.buildFromTemplate(
			require('./menu.js')(app, changeSite, window, goToSeach)
		)
	);

	// Bind quit
	app.on('window-all-closed', () => app.quit());
});
