module.exports = {
	outputDir:"backend/public",
	assetsDir:"assets",
	configureWebpack: {
		devtool: 'source-map'
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000/api',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}