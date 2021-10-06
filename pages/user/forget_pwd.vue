<template>
	<view>
		<!-- 主体表单 -->
		<view class="main">
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type"><input v-model="pwd" class="main-input-code" maxlength="20" type="password"
						:placeholder="this.$t('Please_enter_the_original_password')" /></view>
			</view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type"><input v-model="pwd1" class="main-input-code" maxlength="20" type="password"
						:placeholder="this.$t('Please_set_a_new_password')" /></view>
			</view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type"><input v-model="pwd2" class="main-input-code" maxlength="20" type="password"
						:placeholder="this.$t('Please_repeat_the_new_password')" /></view>
			</view>
		</view>
		<view class="btn_login" @click="updatePwd">{{$t('Update')}}</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				pwd: '',
				pwd1: '',
				pwd2: '',
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('Modify_login_password')
			})
		},
		mounted() {
			_this = this;
		},
		destroyed() {
			uni.hideKeyboard();
		},
		methods: {
			updatePwd() {
				if (this.pwd.length < 1) {
					this.$queue.showToast(this.$t('Please_enter_the_original_password'));
					return;
				}
				if (this.pwd1.length < 1) {
					this.$queue.showToast(this.$t('Please_set_a_login_password'));
					return;
				}
				if (this.pwd===this.pwd1) {
					this.$queue.showToast(this.$t('The_original_password_is_the_same_as_the_new_password'));
					return;
				}
				if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(this.pwd1))) {
					this.$queue.showToast(this.$t('Password_must_contain_English_letters_and_numbers'))
					return;
				}
				if (this.pwd1 != this.pwd2) {
					this.$queue.showToast(this.$t('The_two_passwords_are_inconsistent'))
					return;
				}
				this.updatePost();
			},
			updatePost() {
				this.$Request
					.post('/app/user/password', {
						old_pwd: this.pwd,
						new_pwd: this.pwd1,
						re_pwd: this.pwd2
					}).then(res => {
						console.log(res);
						if (res.code == 0) {
							console.log(res);
							uni.navigateTo({
								url: '/pages/user/info',
							});
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});

			}
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
