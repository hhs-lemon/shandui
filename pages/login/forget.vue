<template>
	<view>
		<!-- 主体表单 -->
		<view class="main">
			<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
			<!-- <view class="title_des">个人找回密码</view> -->
			<view class="item">
				<image class="login_image" src="../../static/login/userName.png"></image>
				<input class="main-input" v-model="phoneData" :placeholder="this.$t('Please_enter_phone_number')" />
			</view>
			<view style="margin-top: 8px"></view>
			<view class="item">
				<image class="login_image" src="../../static/login/code.png"></image>
				<view class="type">
					<input v-model="code" class="main-input-code" maxlength="6" type="number" :placeholder="this.$t('please_enter_verification_code')"/>
					<getCode :codeText="this.$t('get_verification_code')" setTime="60" ref="runCodes" @setCode="sendMsg()"></getCode>
				</view>
			</view>
			<view style="margin-top: 8px"></view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type"><input v-model="passData" class="main-input-code" maxlength="20" type="password" :placeholder="this.$t('Please_set_your_password')"/></view>
			</view>
			<view class="tips">{{this.$t('Password_must_contain_English_letters_and_numbers')}}!</view>
		</view>
		<view class="btn_login" @click="startForget">{{$t('Retrieve_Now')}}</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				//logo图片 base64
				phoneData: '', //用户/电话
				passData: '', //密码
				showAgree: true,
				email: '', //企业邮箱
				code: '' //验证码
			};
		},

		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('Forgot_password')
			})
		},
		mounted() {
			_this = this;
		},
		destroyed() {
			uni.hideKeyboard();
		},
		methods: {
			isShowAgree() {
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			navBack() {
				uni.navigateBack();
			},
			sendMsg() {
				if (this.phoneData.length == 0) {
					this.$queue.showToast(this.$t('Please_enter_phone_number'));
					return;
				}
				if (this.phoneData.length == 11 || this.phoneData.split('@') != -1) {
					this.$queue.showLoading(this.$t('get_verification_code')
);
					this.$Request
						.get('/app/user/code?phone=' + this.phoneData + '&isRegister=0')
						.then(res => {
							if (res.resultCode == 1) {
								this.$queue.showToast(this.$t('Please_check_the_verification_code_successfully'));
								this.$refs.runCodes.$emit('runCodes'); //触发倒计时（一般用于请求成功验证码后调用）
							} else {
								this.$queue.showToast(res.message);
							}
							uni.hideLoading();
						})
						.catch(res => {
							uni.hideLoading();
						})
				} else {
					this.$queue.showToast(this.$t('Please_enter_phone_number'));
					return;
				}

			},
			toForget() {
				this.$queue.showLoading(this.$t('Retrieving'));
				this.$Request
					.post('/app/user/reset_pwd', {
						phone: this.phoneData,
						code: this.code,
						pwd: this.passData
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Password_reset_successfully'));
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login/login'
								});
							}, 1000)
						} else {
							this.$queue.showToast(res.message);
						}
						uni.hideLoading();
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			startForget() {
				if (this.phoneData.length == 0) {
					this.$queue.showToast(this.$t('please_enter_account'));
					return;
				}
				if (!(/^1[3456789]\d{9}$/.test(this.phoneData))) {
					this.$queue.showToast(this.$t('please_enter_a_valid_phone_number'));
					return;
				}
				// if (this.phoneData.length != 11 || this.phoneData.split('@') == -1) {
				// 	this.$queue.showToast('请输入手机号或邮箱');
				// 	return;
				// }
				if (this.code.length == 0) {
					this.$queue.showToast(this.$t('please_enter_verification_code')
);
					return;
				}
				if (this.code.length != 6) {
					this.$queue.showToast(this.$t('The_format_of_the_verification_code_is_incorrect'));
					return;
				}
				if (this.passData.length < 1) {
					this.$queue.showToast(this.$t('Please_set_a_login_password'));
					return;
				}
				if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(this.passData))) {
					this.$queue.showToast("密码必须包含英文字母和数字，且至少8位")
					return;
				}
				this.toForget();
			}
		}
	};
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
		border-bottom: 1px solid #eeeeee;
		width: 100%;
	}

	.weixinLogin {
		color: #999999;
		text-align: center;
		font-size: 12px;
		margin-top: 60px;
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
		color: #0055b8;
	}

	.item {
		line-height: 40px;
		display: flex;
	}

	.login_image {
		margin-top: 8px;
		width: 20px;
		height: 25px;
	}

	.main-input {
		font-size: 14px;
		margin-left: 16px;
		border-bottom: 1px solid #eeeeee;
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
		color: #ffffff;
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
