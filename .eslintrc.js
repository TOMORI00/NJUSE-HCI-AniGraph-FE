module.exports = {
	env: {
		'browser': true,
		'es6': true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/essential'
	],
	globals: {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	plugins: [
		'vue'
	],
	rules: {
		'linebreak-style': ["off", "windows"],
		'no-console': 'off',
		'quotes': [
			'error',
			'double'
		],
		'semi': [
			'error',
			'always'
		]
	}
};