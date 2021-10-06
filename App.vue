<script>
	export default {
		globalData: {
			$i18n: {},
			$t: {}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.globalData.$i18n = this.$i18n
			this.globalData.$t = str => this.$t(str)
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary');
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>




<style lang="scss">
	@import '@/common/css/colorui/main.css';
	@import '@/common/css/colorui/icon.css';
	@import "/common/css/iconfont.css";
	@import "uview-ui/index.scss";


	/* button样式改写 */
	button {
		font-size: 34rpx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	button[type='default'] {
		color: #303133;
	}

	uni-button:after {
		border: 0;
	}

	// 修改tabbar样式
	uni-tabbar {
		.uni-tabbar {
			// tab背景
			border-top-left-radius: 30rpx !important;
			border-top-right-radius: 30rpx !important;
			overflow: hidden !important;

			.uni-tabbar-border {
				// tabBar上边框
				// background-color:red!important; // tabBar上边框的颜色
			}

			.uni-tabbar-border {
				background-color: rgba(0, 0, 0, 0) !important;
			}

			.uni-tabbar__bd {

				// tabBar单项
				.uni-tabbar__icon {
					// 图标
					width: 52rpx !important;
					height: 52rpx !important;
				}

				.uni-tabbar__label {
					// 文字
					font-size: 14rpx !important;
				}
			}
		}
	}

	// uni.showToast 样式：
	.uni-simple-toast__text {
		word-break: break-word !important;
	}
</style>
