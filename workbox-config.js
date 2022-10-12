module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{ico,png,woff,ttf,eot,woff2,svg,gif,jpg}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};