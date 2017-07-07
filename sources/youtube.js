module.exports = {
	url: 'http://youtube.com/',
	css: '.sitewide-consent-visible .yt-consent-banner { display: none !important; } #yt-masthead-container { padding-left: 6em; }',
	js: '',
	search: ['https://www.youtube.com/', '#masthead-search-term'],
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
		['MediaPlayPause', '.ytp-play-button.ytp-button'],
		['MediaNextTrack', '.ytp-next-button.ytp-button'],
		['MediaPreviousTrack', '.ytp-next-button.ytp-button'],
	],
};
