const electron = require("electron");
const app = electron.app;

// Add Chromium's Widevine plugin back into Electron
const widevinePath = require("child_process").execSync("find '/Applications/Google Chrome.app' -name widevinecdmadapter.plugin").toString().split("\n")[0];
app.commandLine.appendSwitch("widevine-cdm-path", widevinePath)
app.commandLine.appendSwitch("widevine-cdm-version", "0")

// Save the window and current config globally
let window;
let current_config;

// Config required for the window, and three sources
const config = {
	// General electron's window settings
	window: {
		width: 1280,
		height: 800,
		titleBarStyle: "hidden-inset",
		title: "Stopify",
		backgroundColor: "#070707",
		webPreferences: {plugins: true}
	},

	// Per-source settings
	// url:					the base url of the website
	// css:					the extra css to inject into the page
	// js: 					the extra js to inject to the page
	// blacklist:		the urls to block
	// bindings:		the event and selectors to bind (see bindButton)
	spotify: {
		url: 'https://open.spotify.com/collection/playlists',
		css: '.ads-container, .download-item { display: none !important; } .nav-bar-container { padding-top: 30px !important; }',
		js: '',
		blacklist: [
			"https://*.cloudfront.net/mp3-ad/*",
			"https://spclient.wg.spotify.com/ads/*"
		],
		bindings: [
			["MediaNextTrack", ".player-controls [title=Next]"],
			["MediaPreviousTrack", ".player-controls [title=Previous]"],
			["MediaPlayPause", ".player-controls [title=Play], .player-controls [title=Pause]"],
		]
	},
	soundcloud: {
		url: 'https://soundcloud.com/search/sounds',
		css: '.header__logo { padding-left: 5em; }}',
		js: '',
		blacklist: [
			'https://*.doubleclick.net/*',
		],
		bindings: [
			["MediaNextTrack", ".skipControl__next"],
			["MediaPreviousTrack", ".skipControl__previous"],
			["MediaPlayPause", ".playControls__play "],
		]
	},
	youtube: {
		url: 'http://youtube.com/',
		css: '.sitewide-consent-visible .yt-consent-banner { display: none !important; } #yt-masthead-container { padding-left: 6em; }',
		js: '',
		blacklist: [
			'https://*.googlesyndication.com/*',
			'https://*.doubleclick.net/*',
			'https://*.google.com/pagead/*',
			'https://*.youtube.com/pagead/*',
			'https://*.youtube.com/api/stats/ads*',
			'https://*.googleadservices.com/pagead/*',
			'https://*.google.com/uds/afs/*',
			'https://*.bs.serving-sys.com/*',
		],
		bindings: [
			["MediaPlayPause", ".ytp-play-button.ytp-button"],
			["MediaNextTrack", ".ytp-next-button.ytp-button"],
			["MediaPreviousTrack", ".ytp-next-button.ytp-button"],
		],
	}
}

// Bind a physical button to the click on a DOM element.
const bindButton = function(key, element) {
	// Remove previous binding
	electron.globalShortcut.unregister(key);
	// Bind the new function
	electron.globalShortcut.register(key, function(){
		window.webContents.executeJavaScript(
			`debugger;document.querySelector("${element}").click();`
		)
	});
}

// Change the current site, update the config and bindings.
const changeSite = function(name) {
	// Only change the site if the new site is actually changing.
	if (current_config != config[name]){
		current_config = config[name];

		window.loadURL(current_config.url);
		
		// Bind global key shortcuts for media control
		current_config.bindings.forEach(([binder, bindee]) => {
			bindButton(binder, bindee);
		});
	}
}

// Lauch the app
app.on("ready", function(){
	// Open the main window
	window = new electron.BrowserWindow(config.window);

	// For debug
	// window.openDevTools();

	// Load Spotify
	changeSite('spotify');

	// Blacklist ads
	window.webContents.session.webRequest.onBeforeRequest({urls: current_config.blacklist}, (details, callback) => callback({cancel: true}));

	// Inject custom style and script
	window.webContents.on("did-finish-load", () => {
		window.webContents.insertCSS(current_config.css)
		window.webContents.executeJavaScript(current_config.js);
	});

	// Bind local key shortcuts for navigation and paste
	electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate([{
			label: "Stopify",
			submenu: [
				{label: "Close", accelerator: "CmdOrCtrl+W", click: () => app.quit()},
				{label: "Close all", accelerator: "CmdOrCtrl+Shift+W", click: () => app.quit()},
				{label: "Quit", accelerator: "CmdOrCtrl+Q", click: () => app.quit()},
			]
		}, {
			label: "Source",
			submenu: [
				{label: "Spotify", accelerator: "CmdOrCtrl+S", click: () => changeSite('spotify')},
				{label: "Youtube", accelerator: "CmdOrCtrl+Y", click: () => changeSite('youtube')},
				{label: "SoundCloud", accelerator: "CmdOrCtrl+D", click: () => changeSite('soundcloud')},
			]
		}, {
			label: "Edit",
			submenu: [
				{label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut"},
				{label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy"},
				{label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste"},
				{label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall"},
			]
		}, {
			label: "Navigation",
			submenu: [
				{label: "Reload", accelerator: "CmdOrCtrl+R", click: () => window.webContents.reloadIgnoringCache()},
				{label: "Back", accelerator: "CmdOrCtrl+Left", click: () => window.webContents.goBack()},
				{label: "Forward", accelerator: "CmdOrCtrl+Right", click: () => window.webContents.goForward()},
				{label: "Search", accelerator: "CmdOrCtrl+F", click: () => window.webContents.executeJavaScript(`document.querySelector('a[href="/search"]').click();`)},
			]
		},
	]))

	// Bind quit
	app.on("window-all-closed", () => app.quit());
});
