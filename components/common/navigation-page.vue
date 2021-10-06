<template>
	<view v-if="navigation_show" class="navigation" @click="onCancel" @touchstart.stop>
		<view class="navigation-body" @touchstart.stop @click.stop>
			<image class="navigation-body-logo" mode="scaleToFill" src="/static/images/user/avatar.jpg" />
			<view class="navigation-body-list">
				<view v-for="it in data_list" @click="goTo(it.path)" class="navigation-body-list-menu" :key="it.text">
					<image mode="scaleToFill" :src="it.image" />{{it.text}}
				</view>
			</view>
		</view>
		<mask-model ref="logoutPop" btnType="1" @confirm="confirm" :showTip="false" @cancel="cancel" titleColoe="#000"
			cancelColor="#007AFF" confirmColor="#007AFF" :maskTitle="maskTitle"></mask-model>
	</view>
</template>

<script>
	export default {
		props: {

			navigation_show: {
				type: Boolean,
				default: false,
			},
			navigationShow: {
				onCancel: Function,
				default: () => '',
			}
		},
		created() {
			console.log('1111 created');
		},
		watch: {
			navigation_show(v) {
				if (v) {
					this.$Request
						.get('/app/download/list', {})
						.then(res => {
							//console.log(res.resultCode);
							if (res.code == 0) {
								if (uni.getSystemInfoSync().platform === 'ios') {
									this.downloadUrl = res.data.ios;
								} else {
									this.downloadUrl = res.data.android;
								}
							} else {
								this.$queue.showToast(res.message);
							}
						})
						.catch(res => {
							uni.hideLoading();
						});
				}
			}

		},
		data() {
			return {
				data_list: [{
						image: '/static/images/sidebar/activity.png',
						text: this.$t('Event_Hall'),
						path: '../events/index'
					},
					{
						image: '/static/images/sidebar/event_search.png',
						text: this.$t('Race_result_query'),
						path: '../match/match_history'
					},
					{
						image: '/static/images/sidebar/notice.png',
						text: this.$t('Message_center'),
						path: '../list/notice_list'
					},
					{
						image: '/static/images/sidebar/download.png',
						text: this.$t('App_Download'),
						path: 'App_Download'
					},
					{
						image: '/static/images/sidebar/service.png',
						text: this.$t('online_service'),
						path: '../deposit/index'
					},
					{
						image: '/static/images/sidebar/charge.png',
						text: this.$t('Recharge'),
						path: '/pages/recharge/index'
					},
					{
						image: '/static/images/sidebar/withdraw.png',
						text: this.$t('withdraw'),
						path: '/pages/withdraw/index'
					},
					{
						image: '/static/images/sidebar/exit.png',
						text: this.$t('Exit'),
						path: 'Exit'
					},
				],
				downloadUrl: '',
				maskTitle: this.$t('Whether_to_log_out'),
			};
		},
		onLoad() {

		},
		methods: {
			onCancel() {
				this.$emit('navigationShow', false)
			},
			goTo(path) {
				if (path == 'Exit') {
					this.$refs.logoutPop.show();
				} else if (path == 'App_Download') {
					this.openURL();
				} else {
					uni.navigateTo({
						url: path,
					});
				}

			},
			openURL() {
				// #ifdef H5
				if (uni.getSystemInfoSync().platform === 'ios') {
					window.open(this.downloadUrl)

				} else {
					window.location.href = this.downloadUrl + '?v=' + (new Date().getTime());
				}
				// #endif
			},
			logout() {
				var token = this.$queue.getData('token');
				//没有token就去登录页面
				if (!token) {
					uni.reLaunch({
						url: '../login/login',
					});

				}
				this.$Request
					.get('/app/user/logout', {})
					.then(res => {
						if (res.code == 0) {
							console.log('logout0');
						} else {
							console.log('logout1');
							this.$queue.showToast(res.message);
						}
						uni.reLaunch({
							url: '../login/login',
						});
					})
					.catch(res => {});
				uni.navigateTo({
					url: '../login/login'
				});
			},
			confirm() { //确定按钮
				this.logout();
			},
			cancel() { //取消按钮
			},
			logoutConfirm() { //打开询问弹窗
				this.$refs.logoutPop.show();
			},
		}
	};
</script>

<style lang="scss" scoped>
	.navigation {
		z-index: 10056;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);

		&-body {
			width: 500rpx;
			background: #fff;
			padding: 110rpx 40rpx 0 80rpx;
			height: 100%;
			border-top-right-radius: 40rpx;
			border-bottom-right-radius: 40rpx;

			&-logo {
				display: block;
				width: 122rpx;
				height: 122rpx;
				border-radius: 20rpx;
			}

			&-list {
				margin-top: 40rpx;
				border-top: 1rpx dashed #ccc;
				font-size: 24rpx;
				color: #333333;

				&-menu {
					display: flex;
					align-items: center;
					padding: 25rpx 0;

					image {
						width: 44rpx;
						height: 44rpx;
						margin-right: 32rpx;
					}
				}

				&-menu:first-child {
					padding-top: 10rpx;
				}

				&-menu:nth-child(6) {
					font-size: 30rpx;
					border-top: 1rpx dashed #ccc;
					color: #3586FF;
				}

				&-menu:nth-child(7) {
					font-size: 30rpx;
					color: #3586FF;
				}

				&-menu:last-child {
					border-top: 1rpx dashed #ccc;
				}
			}
		}

		/deep/.model-count {
			width: 450rpx;
			min-height: unset;
			height: 200rpx;

			.btm-box {
				border-top: 1px solid #D4D4D4;
				height: 80rpx;

				.btn {
					line-height: 80rpx;
				}
			}

			.btm-box .btn.cancel {
				border-right: 1px solid #D4D4D4;
			}
		}
	}
</style>
