<template>
	<view>
		<!-- 主体表单 -->
		<view class="main">
			<view class="pwd_title">{{$t('Please_enter_the_security_password')}}</view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type"><input v-model="pwd" class="main-input-code" maxlength="6" minlength="6" type="password" :placeholder="this.$t('Please_enter_the_original_password')
" /></view>
			</view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type"><input v-model="pwd1" class="main-input-code" maxlength="6" minlength="6" type="password" :placeholder="this.$t('Please_set_your_password')" /></view>
			</view>
			<view class="item">
				<image class="login_image" src="../../static/login/password.png"></image>
				<view class="type"><input v-model="pwd2" class="main-input-code" maxlength="6" minlength="6" type="password" :placeholder="this.$t('Please_repeat_the_password')" /></view>
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
				pwd:'',
				pwd1:'',
				pwd2:'',
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('Change_security_password')
			})
		},
		methods: {
			updatePwd() {
				console.log(this.pwd);
				console.log(this.pwd1);
				console.log(this.pwd2);
				console.log(this.pwd.length);
				console.log(this.pwd1.length);
				console.log(this.pwd2.length);
				if (this.pwd1==this.pwd){
					this.$queue.showToast("原始密码和新密码一样");
					return;
				}
				if(this.pwd1.length!=6){
					this.$queue.showToast(this.$t('Please_enter_six_digits'));
					return;
				}
				if (!(/\d{6}$/.test(this.pwd1))) {
					this.$queue.showToast(this.$t('Please_enter_six_digits'));
					return;
				}
				if (this.pwd1!=this.pwd2){
					this.$queue.showToast(this.$t('The_two_passwords_are_inconsistent'));
					return;
				}
				this.updatePost();
			},
		updatePost(){
			this.$Request
				.post('/app/user/pwd', {
					old_pwd:this.pwd,
					new_pwd:this.pwd1,
					re_pwd:this.pwd2
				}).then(res => {
					if (res.code==0) {
						console.log('updatePost complete');
						this.$queue.showToast(this.$t('update_completed'));
						uni.navigateBack({
							delta:1
						});
					} else if(res.code==401){
						this.$queue.showToast(res.message);
						uni.reLaunch({
							url: '../login/login',
						});
					}else{
						this.$queue.showToast(res.message);
					}
				})
				.catch(res => {
				});

		}
		}
	};
</script>

<style>
	@import url('../../static/css/icon.css');
	@import url('../../static/css/main.css');


	.type {
		display: flex;
		margin-left: 16px;
		border-bottom: 1px solid #eeeeee;
		width: 100%;
	}



	.pwd_title{
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 10px;
		color: red;
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
