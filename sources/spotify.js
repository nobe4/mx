module.exports = {
	url: 'https://open.spotify.com/collection/playlists',
	css: '.ads-container, .download-item { display: none !important; } .nav-bar-container { padding-top: 30px !important; }',
	js: '',
	search: ['https://open.spotify.com/search/recent', '.inputBox-input'],
	blacklist: [
		'https://*.cloudfront.net/mp3-ad/*',
		'https://spclient.wg.spotify.com/ads/*'
	],
	bindings: [
		['MediaNextTrack', '.player-controls [title=Next]'],
		['MediaPreviousTrack', '.player-controls [title=Previous]'],
		['MediaPlayPause', '.player-controls [title=Play], .player-controls [title=Pause]'],
	]
};
