const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: ['./src'],
	output: {
		path: path.resolve(__dirname, './static/frontend'),
		filename: '[name].js',
		publicPath:
			'https://django-react-drive-static.s3.amazonaws.com/static/frontend/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
		],
	},
	optimization: {
		minimize: true,
	},
	devServer: {
		disableHostCheck: true, // does not check for host when using ngrok
		contentBase: './static/frontend/',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		hot: true,
		inline: true,
		proxy: {
			'!/static/frontend/**': {
				target: 'http://localhost:8000', // points to django dev server
				changeOrigin: true,
			},
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		// new CompressionPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
};
