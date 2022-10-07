module.exports = (api) => {
	api.cache(true);

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					// debug: true,
					// // The entry point for the corejs3 polyfill has not been found.
					modules: false,
					loose: false,
					// useBuiltIns: 'entry',
					// also need import 'core-js/stable' and 'regenerator-runtime/runtime' to entry (index.js)
					// 'entry': 210K, 'usage': 89K
					useBuiltIns: 'usage',
					corejs: {
						version: '3',
						proposals: true,
					},
					// targets: {
					//   browsers: ["defaults", "ie > 10"],
					//   // browsers: ['defaults', 'not IE 11'],
					// },
				},
			],
			[
				// Babel preset for all React plugins
				'@babel/preset-react',
			],
		],
		plugins: [
			[
				// api.env('development') && 'react-refresh/babel',  // React 18 已內建
				'@babel/plugin-transform-runtime',
				// {
				// 	corejs: {
				// 		version: 3,
				// 		proposals: true,
				// 	},
				// },
			],
		],
	};
};
