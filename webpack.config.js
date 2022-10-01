const path = require('path');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
// const target = process.env.TARGET || 'web';

module.exports = {
	mode: env,

	target: env === 'development' ? 'web' : 'browserslist',

	entry: {
		index: path.resolve(__dirname, './src/js/index.js'),
		main: path.resolve(__dirname, './src/js/main.jsx'),
		// vendors: ['react', 'react-dom', 'react-refresh/runtime'],
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].[chunkhash:6].js',
		clean: true,
	},

	// devtool: env === 'production' ? 'source-map' : 'eval-source-map',

	devServer: {
		static: [
			{
				directory: path.resolve(__dirname, 'dist'),
				publicPath: 'dist',
				serveIndex: true,
			},

			{
				directory: path.resolve(__dirname, 'assets'),
				// publicPath: 'assets',
			},
		],
		watchFiles: ['src/**/*.html'],
		// open: ['/?env=dev'],
		hot: true,
		// compress: true,
		historyApiFallback: true,
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},

			// {
			// 	test: /\.jsx$/,
			// 	exclude: /(node_modules|bower_components)/,
			// 	use: [
			// 		{
			// 			loader: 'babel-loader',
			// 		},
			// 	],
			// },

			{
				test: /\.css$/i,
				use: [
					env === 'development'
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								// options: {
								//   publicPath: '../',
								// },
						  },
					// { loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.js'),
							},
						},
					},
				],
			},

			{
				test: /\.s[ca]ss$/i,
				use: [
					env === 'development'
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								// options: {
								//   publicPath: '../',
								// },
						  },
					// { loader: MiniCssExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: path.resolve(__dirname, 'postcss.config.js'),
							},
						},
					},
					{
						loader: 'sass-loader',
						// options: {
						//   sassOptions: {
						//     indentWidth: 2,
						//   }
						// },
					},
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:6].css',
		}),

		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/index.html',
			favicon: './src/assets/favicon.ico',
			inject: 'body',
			// chunks: ['index', 'main'],
			// excludeChunks: env === 'production' ? ['ie', 'popular', 'scroll', 'user'] : ['ie', 'user'],
			minify:
				env === 'production'
					? {
							collapseWhitespace: true,
							removeComments: true,
							removeRedundantAttributes: false,
							removeScriptTypeAttributes: true,
							removeStyleLinkTypeAttributes: true,
							useShortDoctype: true,
					  }
					: false,
		}),

		// new ReactRefreshWebpackPlugin({
		// 	forceEnable: true,
		// }),
	],

	resolve: {
		extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
	},

	optimization: {
		runtimeChunk: 'single', // 確保只有一個實例，避免多個入口點熱更新 ChunkLoadError
		minimizer:
			env === 'production'
				? [
						new CssMinimizerPlugin({
							minimizerOptions: {
								preset: [
									'default',
									{
										discardComments: { removeAll: true },
									},
								],
							},
						}),
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: true,
								},
								format: {
									// comments: /@license/i,
									comments: false,
								},
							},
							extractComments: true,
						}),
				  ]
				: [],
	},
};
