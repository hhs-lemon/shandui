import configdata from './config'
import cache from './cache'

module.exports = {
	config: function(name) {
		var info = null;
		if (name) {
			var name2 = name.split("."); //字符分割
			if (name2.length > 1) {
				info = configdata[name2[0]][name2[1]] || null;
			} else {
				info = configdata[name] || null;
			}
			if (info == null) {
				let web_config = cache.get("web_config");
				if (web_config) {
					if (name2.length > 1) {
						info = web_config[name2[0]][name2[1]] || null;
					} else {
						info = web_config[name] || null;
					}
				}
			}
		}
		return info;
	},
	post: function(url, data, header) {
		// header = header || "application/x-www-form-urlencoded";
		header = header || "application/json";
		url = this.config("APIHOST") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header
						// "token": token,
					},
					success: function(result) {
						if (result.data.message == 'token过期，请重新登录' || result.data.message ==
							'认证失败,登陆令牌错误！' || result.data.code == 401 || result.data.code ==
							904) {
							succ.call(self, result.data)
							uni.reLaunch({
								url: '/pages/login/login'
							})
						} else {
							//console.error(result.data)
							succ.call(self, result.data)
						}

					},
					fail: function(e) {
						uni.showToast({
							title: this.$('Please_check_netword'),
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		} else {
			console.log(999);
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header
					},
					success: function(result) {
						console.log(2222, result);
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: this.$('Please_check_netword'),
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		}
	},
	uploadFile: function(url, data) {
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					'Content-Type': 'multipart/form-data'
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title: this.$('Please_check_netword'),
						icon: 'none'
					})
					error.call(self, e)
				}
			})
		})
	},
	postT: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		url = this.config("APIHOST") + url;
		let token = uni.getStorageSync("token");
		let currentLang = uni.getStorageSync('CURRENT_LANG') || 'cn'

		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
						"token": token,
						"lang": currentLang
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: this.$('Please_check_netword'),
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
						"token": token,
						"lang": currentLang
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: this.$('Please_check_netword'),
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		}
	},
	getT: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		url = this.config("APIHOST") + url;
		let token = uni.getStorageSync("token");
		let currentLang = uni.getStorageSync('CURRENT_LANG') || 'cn'

		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header,
						"token": token,
						"lang": currentLang
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: this.$('Please_check_netword'),
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: this.$('Please_check_netword'),
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		}

	},
	posts: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title: this.$('Please_check_netword'),
						icon: 'none'
					})
					error.call(self, e)
				}
			})
		})
	},
	postF: function(url, data, header) {
		let token = uni.getStorageSync("token");
		let currentLang = uni.getStorageSync('CURRENT_LANG') || 'cn'

		header = header || "application/json";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header,
					"token": token,
					"lang": currentLang
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title: this.$('Please_check_netword'),
						icon: 'none'
					})
					error.call(self, e)
				}
			})
		})
	},
	postFs: function(url, data, header) {
		header = header || "application/json";
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title: this.$('Please_check_netword'),
						icon: 'none'
					})
					error.call(self, e)
				}
			})
		})
	},
	get: function(url, data, header) {
		// let token = uni.getStorageSync("token");
		let currentLang = uni.getStorageSync('CURRENT_LANG') || 'cn'

		header = header || "application/json";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header,
					// "token": token,
					"lang": currentLang
				},
				success: function(result) {
					console.log(333, result);
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title: this.$('Please_check_netword'),
						icon: 'none'
					})
					error.call(self, e)
				}
			})
		})
	},
	getRaw: function(url, data, header) {
		let token = uni.getStorageSync("token");
		let currentLang = uni.getStorageSync('CURRENT_LANG') || 'cn'

		header = header || "application/x-www-form-urlencoded";
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header,
					"token": token,
					"lang": currentLang
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title: this.$('Please_check_netword'),
						icon: 'none'
					})
					error.call(self, e)
				}
			})
		})
	}
};
