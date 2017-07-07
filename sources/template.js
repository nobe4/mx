// Template, used to provide instructions for creating a new source file.
// url:					The base url of the website
// css:					The extra css to inject into the page
// js: 					The extra js to inject to the page
// search: 			The url and selector to perform a search
// blacklist:		The urls to block
// bindings:		The event and selectors to bind (see bindButton)
module.exports = {
	url: '',
	css: '',
	js: '',
	search: [],
	blacklist: [],
	bindings: [
		['MediaNextTrack', ''],
		['MediaPreviousTrack', ''],
		['MediaPlayPause', ''],
	]
};
