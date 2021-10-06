<template>
	<view class="user">
        <mask-model ref="logoutPop" btnType="1" @confirm="logout" @cancel="cancel" titleColoe="#ff6666" cancelColor="#666666" confirmColor="#007AFF" :maskTitle="maskTitle"></mask-model>
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" @click="copy(idStr)">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">ID:</view>
						<view class="cell-text">{{user.userId}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell" @click="copy(user.username)">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{this.$t('username')}}:</view>
						<view class="cell-text">{{user.username}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell" @click="navTo('../user/user_level')">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('membership_level')}}:</view>
						<view class="cell-text">{{user.levelName}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell" @click="navTo('../list/login_log')">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('recent')}}</view>
						<view class="cell-text">{{ip}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('phone_number')}}:</view>
						<view class="cell-text">134****0987</view>
					</view>
				</view>
				<view class="cell" @click="navTo('../user/bankcard_list')">
					<view class="cell-left" >
						<image class="cell-icon" src="/static/images/icon/bank_.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('Bank_card')}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell" @click="navTo('../user/forget_pwd')">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('login_password')}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell" @click="navTo('../user/forget_pwd2')">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('Security_Code')}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>

		<view class="com-item">
			<view class="com-wrap">
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('Registration_time')}}:</view>
						<view class="cell-text">{{user.createTime}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
				<view class="cell">
					<view class="cell-left" @click="copy(user.activeCode)">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('Invitation_code')}}
:</view>
						<view class="cell-text">{{user.activeCode}}</view>
					</view>
					<view @click="navTo('../refer/share')" class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>

		<view class="com-item">
			<view class="com-wrap">
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('Time_zone')}}:</view>
						<view class="cell-text">{{user.zone}}</view>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('Country')}}</view>
						<view class="cell-text">{{user.country}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" @click="logoutConfirm">
					<view class="cell-left">
						<image class="cell-icon" src="/static/images/user/icon-address.png" mode="aspectFill"></image>
						<view class="cell-text">{{$t('sign_out')}}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import comNav from './components/com-nav.vue'
export default {
	components: {
		comNav
	},
	data() {
		return {
			maskTitle:this.$t('Whether_to_log_out'),
			token:'',
			ip:'',
			idStr:'-', //这里是id转化成str的，用于copy
			user:{},
		};
	},
    mounted() {
		this.init();
    },
	methods: {
		init(){
			this.user = this.$queue.getData('user');
			this.ip = this.$queue.getData('ip');
			this.idStr = '' + this.user.userId;
			this.create_time= this.$queue.getData('createTime');
			var token = this.$queue.getData('token');
			this.activeCode= this.$queue.getData('activeCode');
			//没有token就去登录页面
			if(!token){
				uni.reLaunch({
					url: '../login/login',
				});

			}
		},
		cancel(){

		},
		copy(value) {
			console.log(333,uni.setClipboardData() )
			uni.showModal({
				content: value, //模板中提示的内容
				confirmText: this.$t('Copy_content')
,
				success: () => { //点击复制内容的后调函数
					//uni.setClipboardData方法就是讲内容复制到粘贴板
					// API `setClipboardData` is not yet implemented
					//意思是H5端没有这个接口！！！
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
									console.log(44,err)
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
		navTo(url) {
			uni.navigateTo({
				url
			});
		},
		resetEmail(){
			console.log('email');
		},
		logoutConfirm(){
			this.$refs.logoutPop.show();
		},
		logout(){
			console.log('logout');
			var token = this.$queue.getData('token');
			//没有token就去登录页面
			if(!token){
				uni.reLaunch({
					url: '../login/login',
				});

			}
			this.$Request
				.get('/app/user/logout', { })
				.then(res => {
					if (res.code==0) {
					} else {
						this.$queue.showToast(res.message);
					}
					uni.reLaunch({
						url: '../login/login',
					});
				})
				.catch(res => {
				});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f2f2f2;
}
.user {
	.com-item {
		padding-left: 25rpx;
		padding-right: 25rpx;
		margin-top: 30rpx;
		.com-wrap {
			border-radius: 30rpx;
			overflow: hidden;
		}
	}
	.cell {
		height: 90rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #e6e9cb;
		border-bottom: 1px solid #188066;
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
				width: 60rpx;
				height: 60rpx;
			}
			.cell-text {
				color: #666;
				font-size: 30rpx;
				padding-left: 10rpx;
				font-weight: bold;
			}
		}
		.pngfont {
			font-size: 40rpx;
			color: #999;
		}
	}
}
</style>
