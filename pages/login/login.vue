<template>
	<view style="background-color: #fff;height: 100vh;">
		<uni-nav-bar left-icon="back" :title="this.$t('log_in')" @clickLeft="navBack()">
		</uni-nav-bar>
		<!-- 主体表单 -->
		<!-- <view class="mans-bg">
			<img src="/static/images/login/mans.png" alt="">
		</view> -->
		<view class="wrap" style="">
			<!-- <img src="/static/login/logo.png" alt="" class="logo"> -->
			<view class="login_content" style="border: none">
				<table></table>
				<view class="togo">
					<!-- <u-subsection active-color="#fff" :current="current" class="togo-buttom" :list="['登录', '注册']"
						@change="shapeChange"></u-subsection> -->
					<!-- <img src="/static/login/togo.png" alt=""> -->
				</view>
				<view class="item">
					<image class="login_image" src="../../static/images/login/account.png"></image>
					<input v-model="phoneData" maxlength="20" class="main-input"
						:placeholder="this.$t('please_enter_account')" />
				</view>
				<view style="margin-top: 8px"></view>
				<view class="item">
					<image class="login_image" src="../../static/images/login/password.png"></image>
					<input v-model="passData" class="main-input" type="password" maxlength="20"
						:placeholder="this.$t('Please_enter_your_password')" />
				</view>
				<!-- 忘记密码 -->
				<view class="footer" style="margin-top: 26rpx">
					<view>
						<navigator url="/pages/login/register" open-type="navigate">{{$t('New_User_Registration')}}
						</navigator>
					</view>
					<view>
						<view class="forget" @click="doService">{{$t('Forgot_password')}}</view>
						<!-- <navigator url="/pages/login/forget" open-type="navigate"></navigator> -->
					</view>
				</view>
				<u-button type="primary" class="login-btn" @click="startLogin">登录</u-button>
				<!-- 下载、客服 -->
				<!-- <view class="services">
					<view class="service-item">
						<img src="../../static/login/custom_service.png" alt="">
						<text>24H{{this.$t('Customer_Service')}}</text>
					</view>
					<view class="service-item">
						<view @click="openURL()">
							<img src="../../static/login/app_download.png" alt="">
							<text>{{this.$t('App_Download')}}</text>
						</view>
					</view>

				</view> -->
			</view>

			<!-- 语言 -->
			<!-- <view class="langs">
				<xfl-select :list="list" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="false"
					:style_Container="'height: 50px; font-size: 16px;'" :placeholder="'placeholder'" :initValue="'中文'"
					:selectHideType="'hideAll'" @change='change($event)'>
				</xfl-select>
			</view> -->
		</view>


		<!--
		<view class="weixinLogin">
			<view style="border: 1upx inset;width:30%;float: left;margin-top: 2%;margin-left: 3%;border-color: #F8F8F8;"></view>
			第三方账号登录
			<view style="border: 1upx inset;width:30%;float: right;margin-top: 2%;margin-right: 3%;border-color: #F8F8F8;"></view>
		</view>
		<view class="footer_des">你的网购省钱专家</view>
		-->
		<!-- <view class="lang">
			<view v-if="showLang" class="lang-mask" @click="hideLang"></view>
			<view class="buttom" @click.stop="togoLang">
				<img :src="list[0].url" alt="">
				<transition name="slide-fade">
					<view @click.stop="" v-if="showLang" class="langs">
						<view class="lang-item" v-for="(item,index) in list.slice(1,3)" :key="index"
							@click="changeLang(index+1)">
							<img :src="item.url" alt="">
						</view>
					</view>
				</transition>
			</view>
		</view> -->
	</view>
</template>

<script>
	var _this;
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import xflSelect from '../../components/xfl-select/xfl-select.vue'; //导入
	import xlSliderVerify from '@/components/xl-slider-verify/xl-slider-verify.vue'

	export default {
		components: {
			uniNavBar,
			xflSelect
		},
		data() {
			return {
				//logo图片 base64
				phoneData: '', //用户/电话
				passData: '', //密码
				isRotate: false, //是否加载旋转】
				list: [ //要展示的数据
					{
						type: '中文',
						url: "static/images/login/cn.png",
						lang: "zh"
					},
					{
						type: 'Tiếng Việt',
						url: "static/images/login/vi.png",
						lang: "vi"
					},
					{
						type: 'English',
						url: "static/images/login/en.png",
						lang: "en"
					},
				],
				downloadUrl: '',
				current: 0,
				showLang: false,
				showItems: true,
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('log_in')
			})
			const lang = uni.getStorageSync('CURRENT_LANG')
			switch (lang) {
				case "cn":
					this.initList(0)
					break;
				case "vi":
					this.initList(1)
					break;
				case "en":
					this.initList(2)
					break;
			}
			console.log('lang is ', lang);
			this.$data.system_lenguage = lang;
			// this.$Request
			// 	.get('/app/download/list', {})
			// 	.then(res => {
			// 		//console.log(res.resultCode);
			// 		console.log(res);
			// 		console.log(res.code);
			// 		console.log(res.message);
			// 		if (res.code == 0) {
			// 			if (uni.getSystemInfoSync().platform === 'ios') {
			// 				this.downloadUrl = res.data.ios;
			// 			} else {
			// 				this.downloadUrl = res.data.android;
			// 			}
			// 		} else {
			// 			this.$queue.showToast(res.message);
			// 		}
			// 	})
			// 	.catch(res => {
			// 		uni.hideLoading();
			// 	});
		},
		mounted() {
			_this = this;
		},
		destroyed() {
			uni.hideKeyboard();
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			// change(e) {
			// 	var id = e.orignItem.id;
			// 	console.log('change id ', e)
			// 	let langIndex = e.index;
			// 	let lang = ['zh', 'vi', 'en'];

			// 	let language = this._i18n.locale = lang[langIndex];
			// 	console.log('language is', language);
			// 	uni.setStorageSync('CURRENT_LANG', language)
			// 	uni.reLaunch({
			// 		url: 'index'
			// 	})
			// },
			changeLang(index) {
				this.initList(index)
				let language = this._i18n.locale = this.list[0].lang;
				console.log('language is', language);
				uni.setStorageSync('CURRENT_LANG', language)
				uni.reLaunch({
					url: 'index'
				})
				this.showLang = false
			},
			initList(index) {
				let currentLang = this.list.slice(index, index + 1)
				this.list.splice(index, 1)
				this.list.unshift(currentLang[0])
				this.list.push(currentLang)
				console.log(1212, this.list);
			},
			shapeChange(number) {
				console.log(222, number)
			},
			doService() {
				this.$queue.showToast(this.$t('Access_Customer_Service'));
			},
			toLogin() {
				this.$queue.showLoading("登录中" + '...');
				this.$Request
					.post('/user/login', {
						mobile: this.phoneData,
						password: this.passData
					}, "application/json")
					.then(res => {
						//console.log(res.resultCode);
						console.log("登录", res);
						if (res.code == 200) {
							this.$queue.setData('token', res.data.token);
							this.getUserInfo();
						} else {
							this.$queue.showToast(res.message);
						}
						uni.hideLoading();
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			getUserInfo() {
				let token = uni.getStorageSync("token");
				this.$Request
					.post('/user/getUserInfo', {
						mobile: this.phoneData,
						token: token
					}, "application/json")
					.then(res => {
						console.log('user', res)
						if (res.code == 200) {
							this.$queue.setData('user', res.data);
							// this.$queue.setData('wallet', res.data.wallet);
							uni.reLaunch({
								url: '../home/index',
							});

						} else {
							this.$queue.showToast(res.message);
						}
						uni.hideLoading();
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			startLogin() {
				if (this.phoneData.length == 0) {
					this.$queue.showToast(this.$t('please_enter_account'));
					return;
				}
				if (this.passData.length < 1) {
					this.$queue.showToast('请输入密码');
					return;
				}

				this.toLogin();
			},
			verifySuccess() {
				console.log('验证成功')
			},
			togoLang() {
				this.showLang = !this.showLang
			},
			hideLang() {
				this.showLang = false
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
		}
	};
</script>

<style scoped lang="scss">
	@import url('../../static/css/main.css');
	@import url('../../static/css/icon.css');

	.main-page {
		position: relative;
	}

	.wrap {
		position: absolute;
		left: 0;
		right: 0;
		top: 300rpx;
		text-align: center;

		.login_content {
			z-index: 3;
			margin: auto;
			margin-top: 40rpx;
			padding-bottom: 40rpx;
			width: 500rpx;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 20rpx;

			.togo {
				margin: auto;
				margin-top: 50rpx;
				width: 400rpx;
				// border-radius: 35rpx;

				.togo-buttom {
					background-color: #c8c6c6 !important;
					border-radius: 35rpx !important;

					/deep/.u-item-bg {
						position: absolute;
						background: url('/static/login/togo.png') no-repeat center center;
						background-size: contain;
						background-color: transparent !important;
					}
				}
			}

			.item {
				margin: auto;
				margin-top: 30rpx;
				width: 80%;
				display: flex;
				border-bottom: 1px solid #bbb;

				.login_image {
					margin-top: 25rpx;
					width: 30rpx;
					height: 30rpx;
				}

				.main-input {
					color: #fff;
					font-size: 14px;
					margin-left: 16px;
					height: 40px;
					width: 200px;
					line-height: 40px;
					flex: 1;
					text-align: left;
				}
			}

			.footer {
				margin: auto;
				width: 400rpx;
				display: flex;
				justify-content: space-between;
				color: #ccc;
				font-size: 20rpx;
			}

			.slider-verify {
				margin: 75rpx auto 0;
				width: 260rpx;
			}

			.services {
				width: 46%;
				margin: auto;
				margin-top: 45rpx;
				padding-bottom: 50rpx;
				display: flex;
				justify-content: space-between;

				.service-item {
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					align-items: center;
					color: #ddd;
					font-size: 18rpx;

					>view {
						display: block;
						display: flex;
						flex-direction: column;
						flex-wrap: wrap;
						align-items: center;
						color: #ddd;
						text-decoration: none;
					}

					.img {
						width: 70rpx;
					}

					text {
						margin-top: 10rpx;
					}
				}
			}
		}
	}

	.lang {
		.lang-mask {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			height: 100vh;
			z-index: 999;
		}

		.buttom {
			color: #FFF;
			position: fixed;
			left: 30rpx;
			top: 30rpx;
			border-radius: 8rpx;
			z-index: 1000;

			img {
				width: 100rpx;
			}

			.langs {
				position: absolute;
				width: 100rpx;
				top: 70rpx;

				.lang-item {
					text-align: center;
					border-radius: 10rpx;
				}
			}

			// 语言切换动画
			.slide-fade-enter-active {
				transition: all .1s linear;
			}

			.slide-fade-leave-active {
				transition: all .1s linear;
			}

			.slide-fade-enter {
				transform: translateY(10rpx);
			}

			.slide-fade-leave-to {
				transform: translateY(10rpx);
			}
		}
	}

	.mans-bg {
		position: absolute;
		bottom: 0;

		img {
			width: 100vw;
		}
	}

	.input-placeholder {
		color: #fff;
	}

	.login-btn {
		width: 400rpx;
	}
</style>
