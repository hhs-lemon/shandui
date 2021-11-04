<template>
	<view class="user">
		<mask-model ref="logoutPop" btnType="1" @confirm="confirm" :showTip="false" @cancel="cancel" titleColoe="#000"
			cancelColor="#007AFF" confirmColor="#007AFF" :maskTitle="maskTitle"></mask-model>
		<!-- 头部操作 -->
		<view class="header">
			<view class="wrap">
				<view class="kf" @tap="doService">
					<view>{{$t('Customer_Service')}}</view>
					<image class="service" mode="scaleToFill" :src="servicePicUrl"></image>
					<!-- <image class="cancel" mode="scaleToFill" :src="cancelPicUrl" @click="logoutConfirm"></image> -->
				</view>
				<view class="user-msg">
					<image class="user-avatar" mode="aspectFill" :src="headPicUrl"></image>
					<view class="uname">
						<span class="user-name">{{user.mobile}}<img class='vip-icon'
								src="/static/images/my/vip_icon.png" alt=""></span>
						<view></view>
						<view class="user-level">VIP:{{user.vipLevel}}</view>
					</view>
				</view>
			</view>

			<!-- 余额信息 -->
			<view class="balance-info">
				<view class="user-balance">
					<view class="balance">
						<img src="/static/images/my/wallet.png" alt="">
						<span>{{$t('My_Balance')}}</span>
					</view>
					<span>{{user.balance}}</span>
				</view>
				<view class="charge-btn" @click="navTo('/pages/recharge/index')">
					{{this.$t('Recharge')}}
				</view>
			</view>
			<!-- 交易 -->
			<!-- <view class="order-status">
				<view
					class="status-item"
					hover-class="btn-hover"
					v-for="(item, index) in order1"
					:key="index"
					@tap="toPage1(index)"
					:style="{ background: item.background }"
				>
					<view class="item-icon" :class="item.icon"></view>
					<view class="item-text">{{ item.name }}</view>
				</view>
			</view> -->
		</view>

		<!-- 用户功能 -->
		<view class="common_service">
			<view class="service_item" v-for="(item, index) in commonSeviceList" :key="item.path"
				@tap="toPath(item.path)">
				<img :src="item.icon" alt="">
				<view class="text" :class="{'uiIde': index ==0 ||index ==1 || index ==3}">{{item.title}}</view>
			</view>
		</view>
		<view class="com-item">
			<view class="com-wrap" style="margin-bottom: 19rpx;">
				<view class="cell" v-for="(item, index) in order2" :key="index" @tap="toPage2(index)">
					<view class="cell-left">
						<image class="cell-icon" :src="item.icon"></image>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="iconfont iconmore1"></view>
					<view class="hr"></view>
				</view>
			</view>
		</view>

		<!-- 用户服务 -->
		<!-- <view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in order3" :key="index" @tap="toPage3(index)">
					<view class="cell-left">
						<image class="cell-icon" :src="item.icon"></image>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="iconfont iconmore1"></view>
					<view class="hr"></view>
				</view>
			</view>
		</view> -->
		<!-- 退出登录 -->
		<view class="sign_out" @tap="logoutConfirm">
			{{ this.$t('sign_out') }}
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.user = uni.getStorageSync("user");
			uni.setNavigationBarTitle({
				title: this.$t('mine')
			})
			uni.setTabBarItem({
				index: 0
			})
			uni.setTabBarItem({
				index: 1,
				text: this.$t('mine')
			})
			this.init();
		},
		data() {
			return {
				maskTitle: this.$t('Whether_to_log_out'),
				token: '',
				keFuUrl: '',
				user: {},
				headPicUrl: '/static/images/user/avatar.jpg',
				servicePicUrl: '/static/images/user/kefu.png',
				cancelPicUrl: '/static/images/user/guanji.png',
				money: '-',
				level: 1,
				level_name: '-',
				order1: [
					// { name: this.$t('Recharge'), icon: 'iconfont icon31daifahuo', status: 35, path: '../recharge/index', background: 'linear-gradient(to right, #fa6a41, #fd3c49)' },
					{
						name: this.$t('trade_'),
						icon: 'iconfont icon31daifahuo',
						status: 35,
						path: '../transaction/index',
						background: 'linear-gradient(to right, #fa6a41, #fd3c49)'
					},
					// { name: this.$t('withdraw'), icon: 'iconfont icon31daifukuan', status: 15, path:'../withdraw/index', background: 'linear-gradient(to right, #f9b708, #f18d09)' },
				],
				currentIndex: 0,
				order3: [{
					// title: this.$t('my_team'),
					icon: '/static/images/my/team.png',
					path: '../refer/home'
				}, {
					// title: this.$t('App_Download'),
					icon: '/static/images/my/download.png',
					path: 'App_Download'
				}, {
					// title: this.$t('immediate_score'),
					icon: '/static/images/my/bifen.png',
					path: 'jishibifen'
				}, {
					// title: this.$t('Live_matches'),
					icon: '/static/images/my/matches.png',
					path: 'saishizhibo'
				}],
				downloadUrl: '',
			};
		},
		computed: {
			commonSeviceList() {
				let list = []
				if (this.user.isAgency === "YES") { //是否是代理
					list = [
						// {
						// 	title: this.$t('Recharge_record'),
						// 	icon: '/static/images/my/charge.png',
						// 	path: '../list/recharge_list'
						// },
						// {
						// 	title: this.$t('Withdrawals_record'),
						// 	// icon: '/static/images/my/withdraw.png',
						// 	// path: '../list/withdraw_list'
						// },
						{
							title: this.$t('Account_Change_Details'),
							icon: '/static/images/my/detail.png',
							path: '../list/wallet_list'
						},
						{
							title: "兑换订单",
							icon: '/static/images/my/charge.png',
							path: '../list/orders'
						},
						{
							title: "代理提成明细",
							icon: '/static/images/my/data.png',
							path: '../list/commission'
						},
						{
							title: "下线会员",
							icon: '/static/images/my/data.png',
							path: '../list/sub_member_list'
						},
					]
				} else {
					list = [{
							title: this.$t('Account_Change_Details'),
							icon: '/static/images/my/detail.png',
							path: '../list/wallet_list'
						},
						{
							title: "兑换订单",
							icon: '/static/images/my/charge.png',
							path: '../list/orders'
						},
					]
				}
				return list
			},
			order2() {
				let list = []
				if (this.user.isAgency === "YES") { //是否是代理
					list = [
						// {
						// 	// title: this.$t('Race_result_query'),
						// 	icon: '/static/images/my/event_search.png',
						// 	path: '../match/match_history'
						// },
						// {
						// 	// title: this.$t('Bet_record'),
						// 	icon: '/static/images/my/bet_record.png',
						// 	path: '../user/bet_record/bet_record'
						// },
						// {
						// 	// title: this.$t('Help_Center'),
						// 	icon: '/static/images/my/help.png',
						// 	path: '../user/help/help'
						// },
						{
							title: this.$t('My_Share'),
							icon: '/static/images/my/share.png',
							path: '../refer/share'
						},
					]
				} else {
					list = []
				}
				return list
			}
		},
		watch: {
			'$route.path': function(to, from) {
				if (to === '/pages/user/user') {
					this.init();
				}
			}
		},
		mounted() {
			// this.init();
			// this.$Request
			// 	.get('/app/download/list', {})
			// 	.then(res => {
			// 		//console.log(res.resultCode);
			// 		if (res.code == 0) {
			// 			if (uni.getSystemInfoSync().platform === 'ios') {
			// 				this.downloadUrl = res.data.ios;
			// 			} else {
			// 				this.downloadUrl = res.data.android;
			// 			}
			// 			this.$api.loading(false);
			// 		} else {
			// 			this.$queue.showToast(res.msg);
			// 		}
			// 	})
			// 	.catch(res => {
			// 		this.$api.loading(false);
			// 	});
		},
		onShow() {
			// this.init();
		},
		methods: {
			// {
			// title: this.$t('Bet_record'),
			// icon: '/static/images/my/bet_record.png',
			// path: '../list/withdraw_list'
			// }
			// modalTap() {
			// 	uni.showModal({
			// 		title: this.$t('online_service'),
			// 		content: this.$t('Customer_service_link_is_not_connected'),
			// 		showCancel: false,
			// 		confirmText: this.$t('determine')
			// 	})
			// },
			getKeFuUrl() {
				this.$Request
					.post('/config/getServiceUrl', {
						mobile: this.user.mobile,
						token: this.token
					}, "application/json")
					.then(res => {
						// console.log("客服", res);
						if (res.code == 200) {
							this.keFuUrl = res.data
						} else {
							this.$queue.showToast(res.message);
						}
						// uni.hideLoading();
					})
					.catch(res => {
						// uni.hideLoading();
					});
			},
			openURL(url) {
				// #ifdef H5
				if (uni.getSystemInfoSync().platform === 'ios') {
					window.open(url)

				} else {
					window.location.href = url + '?v=' + (new Date().getTime() + Math.random());
				}
				// #endif
			},
			doService() {
				// #ifdef H5
				if (uni.getSystemInfoSync().platform === 'ios') {
					window.open(this.keFuUrl)
				} else {
					window.location.href = this.keFuUrl + '?v=' + (new Date().getTime());
				}
				// #endif
			},
			confirm() { //确定按钮
				this.logout();
			},
			cancel() { //取消按钮
			},
			logoutConfirm() { //打开询问弹窗
				this.$refs.logoutPop.show();
			},
			copy(value) {
				console.log(333, uni.setClipboardData())
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: this.$t('Copy_Username'),
					success: () => { //点击复制内容的后调函数
						if (document.execCommand) {
							let oInput = document.createElement('input');
							oInput.value = value;
							document.body.appendChild(oInput);
							oInput.select(); // 选择对象;
							document.execCommand("Copy"); // 执行浏览器复制命令
							// 复制成功提示;
							uni.showToast({
								title: this.$t('Copy_successful'),
								icon: 'none',
								duration: 2000
							});
							oInput.remove()
						} else {
							uni.setClipboardData({
								data: value, //要被复制的内容
								success: function() {
									//在success中加入uni.hideToast()可以解决
									uni.hideToast({
										title: this.$t('Copy_successful'),
										duration: 2000,
										icon: 'none'
									});
									//以下就可自定义操作了~
								},
								fail: function(err) {
									console.log(44, err)
									uni.showToast({
										title: this.$t('Copy_failed'),
										duration: 2000,
										icon: 'none'
									});
								}
							});
						}
					}
				});
			},
			init() {
				var token = this.$queue.getData('token');
				this.token = token
				//没有token就去登录页面
				if (!token) {
					uni.reLaunch({
						url: '../login/login',
					});
					return
				}
				this.getUserInfo();
				this.getKeFuUrl()
			},
			getUserInfo() {
				let token = uni.getStorageSync("token");
				this.$Request
					.post('/user/getUserInfo', {
						mobile: this.user.mobile,
						token: token
					})
					.then(res => {
						console.log('user', res)
						if (res.code == 200) {
							this.$queue.setData('user', res.data);
							this.user = uni.getStorageSync("user");
						} else {
							this.$queue.showToast(res.message);
						}
						uni.hideLoading();
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			toPath(path) {
				uni.navigateTo({
					url: path
				});
			},
			goWallet() {
				//钱包明细
				uni.navigateTo({
					url: '../list/wallet_list'
				});
			},
			goUserLevel() {
				//会员等级
				uni.navigateTo({
					url: './user_level'
				});
			},
			toPage1(index) {
				uni.navigateTo({
					url: this.order2[index].path
				});
			},
			toPage2(index) {
				uni.navigateTo({
					url: this.order2[index].path
				});
			},
			toPage3(index) {
				if (this.order3[index].path == 'App_Download') {
					this.openURL(this.downloadUrl);

				} else if (this.order3[index].path == 'jishibifen') {
					let url = 'https://tructiep24h.net/ty-le-keo-bong-da'
					this.openURL(url);
				} else if (this.order3[index].path == 'saishizhibo') {
					let url = 'https://www.thedolive.co'
					this.openURL(url);
				} else {
					uni.navigateTo({
						url: this.order3[index].path
					});
				}
			},
			goInfo() {
				uni.navigateTo({
					url: './info'
				});
			},
			goService() {
				this.$queue.showToast(this.$t('Jump_Customer_Service'));
				// uni.navigateTo({
				// 	url:'../login/login'
				// });
			},
			logout() {
				this.$queue.setData('token', '');
				var token = this.$queue.getData('token');
				//没有token就去登录页面
				if (!token) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
				// this.$Request
				// 	.get('/app/user/logout', {})
				// 	.then(res => {
				// 		if (res.code == 0) {
				// 			console.log('logout0');
				// 		} else {
				// 			console.log('logout1');
				// 			this.$queue.showToast(res.msg);
				// 		}
				// 		uni.reLaunch({
				// 			url: '../login/login',
				// 		});
				// 	})
				// 	.catch(res => {});
			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.user {
		background: #eee;
		overflow-y: auto;
		padding-bottom: 50rpx;

		.header {
			.wrap {
				height: 372rpx;
				padding: 50rpx 30rpx 30rpx;
				//background: url('https://handsel.oss-cn-shenzhen.aliyuncs.com/1588938371592.jpg') no-repeat;
				//背影色
				background-image: url('/static/images/my/my_nav_bg.png');
				background-size: cover;

				.service,
				.cancel {
					width: 50rpx;
					height: 50rpx;
				}

				.kf {
					width: 100%;
					height: 60rpx;
					color: #fff;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					view {
						margin-right: 10rpx;
					}
				}
			}

			.user-msg {
				display: flex;
				margin-top: 20rpx;

				.user-avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 10rpx;
				}

				.uname {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 80rpx;

					.user-name {
						font-size: 36rpx;
						color: #FFFFFF;

						img {
							margin-left: 10rpx;
						}
					}


					.user-level {
						font-size: 24rpx;
						color: #fff;
					}

					.vip-icon {
						width: 30rpx;
						line-height: 60rpx;
					}
				}
			}

			.balance-info {
				margin: 0 30rpx;
				margin-top: -100rpx;
				padding: 26rpx 24rpx 20rpx;
				height: 140rpx;
				background: #FFFFFF;
				box-shadow: 4rpx 3rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.user-balance {
					// border: 1rpx solid red;
					display: flex;
					flex-direction: column;
					font-size: 26rpx;
					color: #333333;

					.balance {
						display: flex;
						align-items: center;
					}

					img {
						width: 34rpx;
						margin-right: 20rpx;
					}

					>span {
						margin-top: 16rpx;
						margin-left: 54rpx;
						font-size: 44rpx;
						font-weight: 700;
						color: #333333;
						line-height: 44rpx;
					}
				}


				.charge-btn {
					height: 55rpx;
					background: #FFFFFF;
					border: 1rpx solid #3B79FF;
					border-radius: 28rpx;
					padding: 0 34rpx;
					line-height: 55rpx;
					margin-right: 10rpx;

					font-size: 34rpx;
					color: #3B79FF;
				}
			}
		}

		.order-status {
			display: flex;
			justify-content: space-between;
			padding: 35rpx 127rpx 35rpx;

			.status-item {
				display: flex;
				align-items: center;
				padding: 18rpx 44rpx;
				border-radius: 20rpx;
			}
		}

		.common_service {
			// border: 1rpx solid red;
			padding: 0 30rpx;
			height: 174rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-top: 1rpx solid #eee;

			.service_item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 180rpx;

				img {
					width: 66rpx;
					height: 66rpx;
				}

				.text {
					margin-top: 12rpx;
					text-align: center;
				}

				.uiIde {
					width: 120rpx;
				}
			}
		}

		.com-item {
			.com-wrap {
				overflow: hidden;
			}
		}

		.cell {
			height: 90rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			position: relative;

			.hr {
				height: 1rpx;
				width: 554rpx;
				position: absolute;
				bottom: 0;
				right: 100rpx;
				border-bottom: 1rpx solid #eee;
			}

			&:active {
				background: #f2f2f2;
			}

			&:last-child {
				border-bottom: none !important;
			}

			.cell-left {
				display: flex;
				align-items: center;

				.cell-icon {
					width: 56rpx;
					height: 56rpx;
				}

				.cell-text {
					margin-left: 30rpx;
					font-size: 34rpx;
					color: #333333;
				}
			}

			.iconfont {
				font-size: 32rpx;
				font-weight: bold;
				color: #999;
			}
		}

		/deep/.model-count {
			width: 450rpx;
			min-height: unset;
			height: 200rpx;

			.btm-box {
				border-top: 1rpx solid #D4D4D4;
				height: 80rpx;

				.btn {
					line-height: 80rpx;
				}
			}

			.btm-box .btn.cancel {
				border-right: 1rpx solid #D4D4D4;
			}
		}
	}

	.sign_out {
		margin-top: 19rpx;
		// width: 750rpx;
		width: 100%;
		height: 90rpx;
		background: #FFFFFF;
		text-align: center;
		line-height: 90rpx;
		font-size: 34rpx;
		color: #F72B2B;
	}
</style>
