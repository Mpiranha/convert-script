module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,ico,png,woff,ttf,eot,woff2,svg,gif,jpg,html,js}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};