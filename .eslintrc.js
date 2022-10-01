module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		//
		'plugin:import/recommended',
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		//
		'simple-import-sort',
		'import',
		'react',
		'prettier',
	],
	rules: {
		// indent: ['error', 'tab'],
		// 'linebreak-style': ['error', 'unix'],
		// quotes: ['error', 'single'],
		// semi: ['error', 'always'],
		'sort-imports': 'off',
		'import/order': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		// 'import/no-unresolved': 'warn', // use eslint-import-resolver-alias
		'no-console': 'off',
		'no-unused-vars': 'warn',
		'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: './webpack.config.js',
			},
			// alias: {
			//   map: [
			//     //
			//     ['rtcSubscriber', './Electroteque-webrtc/rtcstreaming/src/rtc-subscriber.js'],
			//     ['vr360', './Electroteque-VR/vr360/src/javascript/vrvideo.js'],
			//   ],
			// },
		},
	},
};
