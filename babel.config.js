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
					// targets: {
					//   browsers: ["defaults", "ie > 10"],
					//   // browsers: ['defaults', 'not IE 11'],
					// },
					// useBuiltIns: 'entry',
					// useBuiltIns: 'usage',  // polyfill 只載入使用的部分
					// corejs: '3',
				},
			],
			// 解析react
			'@babel/preset-react',
		],
		plugins: [
			[
				// api.env('development') && 'react-refresh/babel',  // React 18 已內建
				'@babel/plugin-transform-runtime',
				{
					corejs: {
						version: 3,
						proposals: true,
					},
				},
			],
		],
	};
};
  