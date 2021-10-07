<template>
	<view class="Homepage">
		<view class="header">
			<view class="logo">兑吧</view>
			<view class="tip"> 24小时自动发卡</view>
			<view class="btns" v-if="!token">
				<view class="login-btn" @click="gotoLogin">登录</view>
				<view class="register-btn" @click="gotoRegister">注册</view>
			</view>
			<view class="user-msg" v-if="token">
				<view><span style="color: #000000;">欢迎：</span>{{user.mobile}}</view>
				<view style="color: #000000;" @click="rechargeHandler"><span>余额：</span>{{user.balance}}元 <span
						style="margin-left: 20rpx; color: #514dff;">充值</span></view>
			</view>
		</view>
		<view class="ad">
			<view class="notice" @click="noticeHandle">
				<uni-notice-bar background-color="#fff" color="#666666" :show-icon="true" :speed="8" :scrollable="true"
					:single="true" :text="notice" />
			</view>
		</view>
		<view class="product">
			<!--  -->
			<view class="home-title">
				<view class="h1">充值卡自助承兑平台</view>
				<view class="title-tip">在线兑换充值卡，上闲鱼回收轻松赚差价！</view>
			</view>
			<view class="products-title">我要兑换</view>
			<view class="product-list">
				<view class="item-data" v-for="(item,i) in goodsList"
					:style="{'background': `rgba(0,0,0,0.1) url(data:image/png;base64,${item.goodsImg}) no-repeat center center`}"
					style="background-size:100% 100%">
					<view class="card-type">{{item.goodsTypeName}}{{item.quantity}}张</view>
					<view class=" price"> 价格：{{item.unitPrice}} 元/张
					</view>
					<view class="item" style="margin-top: 10rpx;">
						<view class="title">合计总面值</view>
						<view class="amount">{{item.totalFaceValue}}元</view>
					</view>
					<view class="item">
						<view class="title">面值</view>
						<view class="amount">{{item.faceValue}}元</view>
					</view>
					<view class="item">
						<view class="title">仅需支付</view>
						<view class="amount">{{item.totalPrice}}元</view>
					</view>
					<view class="item">
						<view class="title">预计赚得</view>
						<view class="amount">{{item.yjhszqje}}元</view>
					</view>
					<view class="item">
						<u-button class="duihuan-btn" type="primary" :disabled="!item.isMayBuy" @click="buyHandler(item.goodsId)">立即兑换</u-button>
						<!-- <u-button class="pass-word-btn" @click="">卡密提取</u-button> -->
					</view>

				</view>
			</view>
		</view>
		<view class="help">
			<view class="products-title">教程</view>
			<u-collapse :item-style="itemStyle">
				<u-collapse-item :title="item.textTitile" v-for="(item, index) in itemList" :key="index">
					{{item.textContent}}
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="help2">
			<view class="products-title">赚钱两部曲</view>
			<view class="items">
				<view class="item">
					<view class="item-title">01</view>
					<view class="content">购买卡密，提取卡密</view>
				</view>
				<view class="item">
					<view class="item-title">02</view>
					<view class="content">去闲鱼、人人销卡、兑卡吧等.平台回收赚取差价</view>
				</view>
			</view>
			<img class="help2-img" src="/static/images/ixImg2.png" alt="">
		</view>
		<view class="to-usdt">
			<view>USDT步骤</view>
			<view class="items">
				<view class="item">
					<img src="/static/images/home/ixImg3_1.png" alt="">
					<view class="title">注册</view>
				</view>
				<view class="item">
					<img src="/static/images/home/ixImg3_2.png" alt="">
					<view class="title">实名认证</view>
				</view>
				<view class="item">
					<img src="/static/images/home/ixImg3_3.png" alt="">
					<view class="title">购买USDT</view>
				</view>
				<view class="item">
					<img src="/static/images/home/ixImg3_4.png" alt="">
					<view class="title">在资产里提币</view>
				</view>
			</view>
		</view>
		<view class="kefu">
			客服
			<span class="kefu-link" @click="doService">{{keFuUrl}}</span>
		</view>
		<!-- 卡密弹框 -->
		<u-popup v-model="show" mode="center">
			<view class="rechange-mode">
				<view class="title">卡密列表</view>
				<view class="res-list">
					<view class="list-item" v-for="(item,i) in cardList" :key="item" @click="copy(item)">{{item}}</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice: '',
				token: '',
				user: {},
				itemList: [],
				itemStyle: {
					"font-size": "40rpx"
				},
				keFuUrl: '',
				goodsList: [],
				show: false,
				cardList: [],
			}
		},
		onLoad() {
			this.init();
		},
		onReachBottom() {},
		components: {},
		watch: {
			'$route.path': function(to, from) {
				if (to === '/') {
					this.init();
				}
			}
		},
		mounted() {},
		onTabItemTap() {},
		methods: {
			init() {
				this.token = uni.getStorageSync("token");
				this.user = uni.getStorageSync("user");
				setTimeout(() => {
					this.$api.loading(false);
				}, 500);
				uni.setNavigationBarTitle({
					title: this.$t('Home')
				})
				uni.setTabBarItem({
					index: 0
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('mine')
				})
				if (this.token) {
					this.getTutorials()
					this.getKeFuUrl()
					this.getUserInfo()
				}
				this.getGoods()
				this.getNews()
			},
			getUserInfo() {
				let token = uni.getStorageSync("token");
				this.$Request
					.post('/user/getUserInfo', {
						mobile: this.user.mobile,
						token: token
					})
					.then(res => {
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
			copy(value) {
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
							uni.showToast({
								title: this.$t('Copy_failed'),
								duration: 2000,
								icon: 'none'
							});
						}
					});
				}
			},
			noticeHandle() {
				// uni.navigateTo({
				// 	url: '../login/login'
				// })
			},
			gotoLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			gotoRegister() {
				uni.navigateTo({
					url: '../login/register'
				})
			},
			rechargeHandler() {
				uni.navigateTo({
					url: '../recharge/index'
				})
			},
			buyHandler(goodsId) {
				uni.showModal({
					content: '确认兑换？', //模板中提示的内容
					confirmText: "确认",
					cancelText: "取消",
					success: (res) => {
						if (res.confirm) {
							this.$Request
								.post('/business/forGoods', {
									goodsId,
									mobile: this.user.mobile,
									token: this.token
								})
								.then(res => {
									//console.log(res.resultCode);
									// console.log("兑换结果", res);
									if (res.code == 200) {
										this.cardList = res.data
										this.$queue.showToast(res.message);
										this.getUserInfo()
										if (this.cardList.length > 0) {
											this.show = true
										}
									} else {
										this.$queue.showToast(res.message);
									}
								})
								.catch(res => {});
						}
					}
				});
			},
			onShow() {
				uni.setTabBarItem({
					index: 0
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('mine')
				})
			},
			getGoods() {
				this.$Request
					.post('/business/getGoodsInfo', {
						mobile: this.user.mobile,
						token: this.token
					})
					.then(res => {
						//console.log(res.resultCode);
						console.log("产品列表", res);
						if (res.code == 200) {
							this.goodsList = res.data
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			getNews() {
				this.$Request
					.post('/business/getNewestPayInfo', {})
					.then(res => {
						//console.log(res.resultCode);
						// console.log("跑马灯新消息", res);
						if (res.code == 200) {
							let text = ''
							res.data.map((item) => {
								let news = item.payMinute + "分钟前," +
									"vip" + item.vipLevel + "用户" + item.mobile + "," + "充值" + item.payAmount +
									`元！    `
								text += news
							})
							this.notice = text
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			getTutorials() {
				this.$Request
					.post('/config/getTutorialConfigList', {
						mobile: this.user.mobile,
						token: this.token
					}, "application/json")
					.then(res => {
						// console.log("教程", res);
						if (res.code == 200) {
							// this.$queue.setData('token', res.data.token);
							// this.getUserInfo();
							this.itemList = res.data
						} else {
							this.$queue.showToast(res.message);
						}
						// uni.hideLoading();
					})
					.catch(res => {
						// uni.hideLoading();
					});
			},
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
			doService() {
				// #ifdef H5
				if (uni.getSystemInfoSync().platform === 'ios') {
					window.open(this.keFuUrl)
				} else {
					window.location.href = this.keFuUrl + '?v=' + (new Date().getTime());
				}
				// #endif
			},
		}
	};
</script>

<style lang="scss" scoped>
	.Homepage {
		.header {
			height: 140rpx;
			box-shadow: 0 0 50rpx 0 rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logo {
				font-size: 52rpx;
				color: #514dff;
				font-weight: bold;
				width: 180rpx;
				text-align: center;
			}

			.tip {
				height: 44rpx;
				line-height: 44rpx;
				font-size: 28rpx;
				background-size: 14rpx;
				padding-left: 20rpx;
				border-left: 1rpx solid #aaa;
			}

			.btns {
				display: flex;
				color: #514dff;
				font: 32rpx fontR, 微软雅黑;

				view {
					padding: 0 20rpx 0;
				}

				view:first-child {
					border-right: 1rpx solid #514dff;
				}
			}

			.user-msg {
				color: #514dff;
				font-size: 30rpx;
				margin-right: 30rpx;
			}
		}

		.ad {
			width: 750rpx;
			max-width: 750px;
			margin: auto;
			margin-top: 20rpx;
		}

		.product {
			.h1 {
				text-align: center;
				font-size: 64rpx;
				margin-bottom: 30rpx;
			}

			.title-tip {
				text-align: center;
			}

			.products-title {
				margin: 20rpx 0 0 30rpx;
				font-size: 44rpx;
			}

			.product-list {
				width: 100%;
				margin-top: 80rpx;
				padding: 0 30rpx;
				display: flex;
				flex-wrap: wrap;

				.item-data {
					position: relative;
					margin-top: 80rpx;
					padding: 40rpx 30rpx;
					line-height: 1.4;
					width: 690rpx;
					height: 400rpx;
					border-radius: 20rpx;
					border: 1rpx solid #ddd;
					box-shadow: 0 0 8rpx 8rpx #eee;
					font-size: 32rpx;

					.card-type {
						position: absolute;
						background-color: #6f42c1;
						color: #fff;
						top: -50rpx;
						padding: 10rpx 12rpx;
						box-shadow: 0 4rpx 10rpx 0 #ddd;
					}
				}

				.item {
					display: flex;
					justify-content: space-between;

					.duihuan-btn {
						margin-top: 30rpx;
						width: 200rpx;
						height: 70rpx;
					}

					.pass-word-btn {
						margin-top: 30rpx;
						width: 200rpx;
						height: 70rpx;
					}
				}
			}
		}

		.help {
			width: 750rpx;
			max-width: 750px;
			margin-top: 20rpx;
			padding: 0 30rpx;

			.products-title {
				margin: 20rpx 0 0 30rpx;
				font-size: 44rpx;
			}
		}

		.help2 {
			width: 760rpx;

			.products-title {
				margin: 20rpx 0 0 30rpx;
				font-size: 44rpx;
			}

			.items {
				margin-top: 30rpx;
				display: flex;

				.item {
					flex: 1;
					text-align: center;
					padding: 0 20rpx;
				}

				.item-title {
					color: rgb(81, 77, 255);
					font-family: impact, 微软雅黑;
					font-size: 44rpx;
					font-stretch: 100%;
				}
			}

			.help2-img {
				width: 760rpx;
				height: 345rpx;
			}
		}

		.to-usdt {
			margin: 20rpx 0 0 30rpx;
			font-size: 44rpx;

			.items {
				margin-top: 30rpx;

				.item {
					display: inline-block;
					width: 345rpx;
					text-align: center;

					img {
						width: 160rpx;
						height: 160rpx;
					}

					.title {
						font-size: 32rpx;
					}

					margin: 0 0 60rpx 0;
				}
			}
		}

		.kefu {
			margin: 20rpx 0 60rpx 30rpx;
			font-size: 44rpx;

			.kefu-link {
				margin-left: 30rpx;
				text-align: center;
				font-size: 32rpx;
				color: rgb(81, 77, 255);
				;
			}
		}

		.rechange-mode {
			text-align: center;
			width: 600rpx;
			padding: 30rpx;

			.title {
				font-size: 44rpx;
				text-align: center;
			}

			.copy {
				height: 60rpx;
				font-size: 30rpx;
				line-height: 60rpx;
			}
		}
	}
</style>
