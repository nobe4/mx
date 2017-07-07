module.exports = {
	url: 'https://soundcloud.com/search/sounds',
	css: '.header__logo { padding-left: 5em; }}',
	js: '',
	search: ['https://soundcloud.com/search', '.headerSearch__input'],
	blacklist: [
		'https://*.doubleclick.net/*',
	],
	bindings: [
		['MediaNextTrack', '.skipControl__next'],
		['MediaPreviousTrack', '.skipControl__previous'],
		['MediaPlayPause', '.playControls__play '],
	]
};

