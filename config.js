// Config required for the window, and media sources
module.exports = {
	// General electron's window settings
	window: {
		width: 1280,
		height: 800,
		titleBarStyle: 'hidden-inset',
		title: 'Mx',
		backgroundColor: '#070707',
		webPreferences: {plugins: true}
	},

	// Per-source settings
	bandcamp: require('./sources/bandcamp.js'),
	soundcloud: require('./sources/soundcloud.js'),
	spotify: require('./sources/spotify.js'),
	youtube: require('./sources/youtube.js'),
	fip: require('./sources/fip.js'),
};
