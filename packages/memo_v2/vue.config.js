const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://121.36.32.150:5003'

module.exports = {
	transpileDependencies: [ 'vuetify' ],
	devServer: {
		proxy: {
			'/': {
				target: baseURL,
				ws: true,
				changeOrigin: true
			}
		}
	}
}
