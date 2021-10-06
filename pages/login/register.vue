<template>
	<view>
		<view class="main">
			<view class="title_des">{{$t('Personal_Registration')}}</view>
			<view class="item">
				<image class="login_image" src="../../static/login/userName.png"></image>
				<input class="main-input" v-model="phoneData" placeholder="请输入手机号" maxlength="11" />
			</view>
			<view style="margin-top: 10px"></view>
			<!-- <view class="item">
				<image class="login_image" src="../../static/login/code.png"></image>
				<view class="type">
					<input v-model="code" class="main-input-code" maxlength="6" type="number" :placeholder="this.$t('please_enter_verification_code')" />
					<getCode :codeText="this.$t('get_verification_code')" setTime="60" ref="runCodes" @setCode="sendMsg()"></getCode>
				</view>
			</view> -->
			<view style="margin-top: 10px"></view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type">
					<input v-model="password" class="main-input-code" maxlength="20" type="password"
						:placeholder="this.$t('Please_set_your_password')" />
				</view>
			</view>
			<view style="margin-top: 10px"></view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type">
					<input v-model="password1" class="main-input-code" maxlength="20" type="password"
						:placeholder="this.$t('Please_enter_the_password_again')" />
				</view>
			</view>
			<view style="margin-top: 10px"></view>
			<!-- <view class="item" v-if="!verCode"> -->
			<view class="item">
				<image class="login_image" src="../../static/images/yanzhengma.jpg"></image>
				<view class="type">
					<input v-model="verCode" class="main-input-code" maxlength="20" type="text" placeholder="请输入验证码" />
					<image class="vercode_image" :src="verKeyData.verImage" @click="getVerKey" />
				</view>
			</view>
			<view style="margin-top: 10px"></view>
			<view class="item" v-if="inviteCode">
				<image class="login_image" src="../../static/images/invit.jpg"></image>
				<view class="type">
					<input v-model="register_code" class="main-input-code" maxlength="20" type="text"
						:placeholder="this.$t('Please_enter_the_invitation_code')" />
				</view>
			</view>
			<!-- 密码正则 -->
			<!-- <view class="tips">{{this.$t('Password_must_contain_English_letters_and_numbers')}}!</view> -->
			<view style="margin-top: 10px"></view>

			<!--
			<view class="item">
				<view class="picker-left">
				时区	
				</view>
				<view class="picker-zone">
					<picker @change="zonePickerChange" :value="zoneIndex" :range="zoneArray" range-key="name">
						<view class="uni-input">{{zoneArray[zoneIndex].name}}</view>
					</picker>
				</view>
			</view>
			<view style="margin-top: 10px"></view>
			<view class="item">
				<view class="picker-left">
					国别/地区
				</view>
				<view class="picker-zone">
					<picker @change="countryPickerChange" :value="countryIndex" :range="countryArray" range-key="name">
						<view class="uni-input">{{countryArray[countryIndex].name}}</view>
					</picker>
				</view>
			</view>
			-->
		</view>
		<view class="btn_login" @click="startRegister">{{$t('registered')}}</view>
		<view class="footer" style="margin-top: 16px">
			<view>
				<navigator url="/pages/login/login" open-type="navigate">{{$t('User_login')}}</navigator>
			</view>
		</view>
		<!-- 底部信息 -->
		<!--
		<view class="register_footer">
			<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'">同意
			</text>
			<navigator url="/pages/my/xieyi/xieyi" open-type="navigate">《用户服务协议》</navigator>和
			<navigator url="/pages/my/yingsi/yingsi" open-type="navigate">《用户隐私协议》</navigator>
		</view>
		-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//logo图片 base64
				zoneArray: [{
						name: 'GMT+00'
					}, {
						name: 'GMT+01'
					}, {
						name: 'GMT+02'
					}, {
						name: 'GMT+03'
					}, {
						name: 'GMT+04'
					}, {
						name: 'GMT+05'
					},
					{
						name: 'GMT+06'
					}, {
						name: 'GMT+07'
					}, {
						name: 'GMT+08'
					}, {
						name: 'GMT+09'
					}, {
						name: 'GMT+10'
					}, {
						name: 'GMT+11'
					}, {
						name: 'GMT+12'
					}, {
						name: 'GMT+13'
					},
					{
						name: 'GMT-01'
					}, {
						name: 'GMT-02'
					}, {
						name: 'GMT-03'
					}, {
						name: 'GMT-04'
					}, {
						name: 'GMT-05'
					}, {
						name: 'GMT-06'
					}, {
						name: 'GMT-07'
					}, {
						name: 'GMT-08'
					},
					{
						name: 'GMT-09'
					}, {
						name: 'GMT-10'
					}, {
						name: 'GMT-11'
					}
				],
				zoneIndex: 0,
				verKeyData: {},
				countryArray: [],
				countryIndex: 0,
				phoneData: '', //用户/电话
				password: '', //密码
				password1: '', //密码
				showAgree: false,
				code: '', //验证码
				register_code: '', //{{$t('Invitation_code')}}
				inviteCode: false,
				verCode: '',
			};
		},

		mounted() {},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: this.$t('registered')
			})
			var code = option.code;
			if (code == null) {
				console.log('null');
				this.inviteCode = true; // 选填

			} else {
				console.log(code);
				this.register_code = code;
				this.inviteCode = true;
			}
			// this.$Request.get("/app/user/register_info", {}).then(res => {
			// 	if (res.code == 0) {
			// 		this.countryArray = res.data;
			// 	} else {
			// 		this.$queue.showToast(res.message)
			// 	}
			// }).catch(res => {});
			this.getVerKey()
		},
		destroyed() {
			uni.hideKeyboard()
		},
		methods: {
			getVerKey() {
				this.$Request
					.get('/user/getCaptcha', {})
					.then(res => {
						//console.log(res.resultCode);
						console.log("验证码", res);
						if (res.code == 200) {
							this.verKeyData = res.data
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			zonePickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.zoneIndex = e.detail.value
			},
			countryPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.countryIndex = e.detail.value
			},
			sendMsg() {
				if (!(/^1[3456789]\d{9}$/.test(this.phoneData))) {
					this.$queue.showToast(this.$t('please_enter_a_valid_phone_number'));
					return;
				}
				this.$queue.showLoading(this.$t('get_verification_code'));
				this.$Request.post("/app/user/code?phone=" + this.phoneData + "&isRegister=1").then(res => {
					if (res.code == 0) {
						this.$queue.showToast("验证码发送成功请注意查收");
						this.$refs.runCodes.$emit('runCodes'); //触发倒计时（一般用于请求成功验证码后调用）
					} else {
						this.$queue.showToast(res.message)
					}
					uni.hideLoading();
				}).catch(res => {
					uni.hideLoading();
				});

			},

			toRegister() {
				this.$queue.showLoading(this.$t('Registering'));
				this.$Request.post("/user/register", {
					mobile: this.phoneData,
					// zone: this.zoneIndex,
					// country: this.countryArray[this.countryIndex].name,
					password: this.password,
					registerChannel: 123456,
					inviteCode: this.register_code,
					registerSite: 'cn',
					verKey: this.verKeyData.verKey,
					verCode: this.verCode,
					registerIp: '192.168 .20 .16'
				}).then(res => {
					if (res.code == 200) {
						this.$queue.showToast(this.$t('registration_success'));
						// 登录
						this.$queue.setData('token', res.message);
						this.$Request
							.post('/user/login', {
								mobile: this.phoneData,
								password: this.password
							})
							.then(res => {
								if (res.code == 200) {
									this.$queue.setData('token', res.data.token);

									// 获取用户信息
									this.$Request
										.post('/user/getUserInfo', {
											mobile: this.phoneData,
											token: res.data.token
										})
										.then(res => {
											if (res.code == 200) {
												this.$queue.setData('user', res.data);
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
								} else {
									this.$queue.showToast(res.message);
								}
								uni.hideLoading();
							})
							.catch(res => {
								uni.hideLoading();
							});
					} else {
						this.$queue.showToast(res.message)
					}
					uni.hideLoading();

				}).catch(res => {
					uni.hideLoading();
				});
			},

			startRegister() {
				if (!this.phoneData) { // 用户名
					this.$queue.showToast(this.$t('please_enter_user_name'));
					return;
				}
				if (this.phoneData) { // 用户名格式
					let reg = /^1[3-9]\d{9}$/;
					if (!reg.test(this.phoneData)) {
						this.$queue.showToast("用户请输入11位手机号！");
						return;
					}
				}
				if (this.password.length < 1) { // 密码
					this.$queue.showToast(this.$t('Please_set_a_login_password'));
					return;
				}
				// if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(this.password))) {
				// 	this.$queue.showToast(this.$t('Password_must_contain_English_letters_and_numbers'))
				// 	return;
				// }
				// 两次输入密码不一致
				if (this.password !== this.password1) {
					this.$queue.showToast(this.$t('The_two_passwords_are_inconsistent'));
					return;
				}
				// if (!this.register_code) { // 邀请码
				// 	this.$queue.showToast(this.$t('Please_enter_the_invitation_code'));
				// 	return;
				// }
				// if (!this.$u.test.mobile(this.phoneData)) {
				// 	this.$queue.showToast(this.$t('please_enter_a_valid_phone_number'));
				// 	return;
				// }
				// if (this.code.length == 0) {
				// 	this.$queue.showToast(this.$t('please_enter_verification_code'));
				// 	return;
				// }
				// if (this.register_code.length != 6) { // 邀请码6位
				// 	this.$queue.showToast(this.$t('The_format_of_the_invitation_code_is_incorrect'));
				// 	return;
				// }


				/*
				if (!this.showAgree) {
					this.$queue.showToast("请同意用户服务协议及隐私政策");
					return;
				}
				*/
				this.toRegister();
			},
		}
	}
</script>

<style>
	@import url('../../static/css/icon.css');
	@import url('../../static/css/main.css');

	.title_des {
		color: #0055b8;
		font-size: 22px;
		margin-bottom: 32px;
	}

	.login_icon_wx {
		color: #999999;
		border: none;
	}

	.type {
		display: flex;
		margin-left: 16px;
		border-bottom: 1px solid #EEEEEE;
		width: 100%;
	}

	.picker-left {
		display: flex;
		text-align: left;
		width: 30%;
	}

	.picker-zone {
		margin-left: 36px;
		text-align: center;
		background: #88aa8f;
		width: 100%;
	}

	.footer_des {
		color: #666666;
		text-align: center;
		font-size: 14px;
		margin-top: 40px;
	}

	.getCode {
		font-size: 14px;
		margin-left: 40px;
		color: #0055b8
	}

	.item {
		line-height: 40px;
		display: flex;
	}

	.login_image {
		margin-top: 8px;
		width: 40rpx;
		height: 50rpx;
	}

	.vercode_image {
		width: 200rpx;
		height: 66rpx;
	}

	.main-input {
		font-size: 14px;
		margin-left: 16px;
		border-bottom: 1px solid #EEEEEE;
		height: 40px;
		line-height: 40px;
	}

	.main-input-code {
		width: 70%;
		font-size: 14px;
		height: 40px;
		line-height: 40px;
	}

	.btn_login {
		color: #FFFFFF;
		font-size: 16px;
		width: 250px;
		height: 40px;
		background: #0055b8;
		border-radius: 8px;
		line-height: 40px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 45px;
	}

	.main-input {
		flex: 1;
		text-align: left;
		font-size: 28 upx;
		padding-right: 10 upx;
		margin-left: 20 upx;
	}
</style>
