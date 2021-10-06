<template>
	<view>
		<commonHead :backIcon="true" :title="this.$t('personal_information')"></commonHead>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-15 u-p-t-15 list-item">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="104"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="uname u-font-18 u-p-b-20">{{user.username}} <img src="static/images/my/vip_icon.png"
						alt=""></view>
				<view class="uid u-font-14 u-tips-color">ID:{{idStr}}</view>
			</view>
			<!--
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
            -->
		</view>

<!-- 		<view class="u-m-t-30 list-item">
			<u-cell-group>
				<u-cell-item @click="navTo('../user/user_level')" :title="this.$t('membership_level')"
					:value="level_name">
					<img class="icons" src="static/images/gerenziliao/v.png" alt="" slot="icon">
				</u-cell-item>
				<u-cell-item @click="navTo('../list/login_log')" iconSize="42rpx" :title="ip" :value="country">
					<img class="icons" src="static/images/gerenziliao/ip.png" alt="" slot="icon">
				</u-cell-item>
			</u-cell-group>
		</view> -->

		<view class="u-m-t-20 list-item">
			<u-cell-group>
				<u-cell-item @click="navTo('../user/bankcard_list')" :title="this.$t('Bank_card')" :value="bankcard">
					<img class="icons" src="static/images/gerenziliao/bankcard.png" alt="" slot="icon">
				</u-cell-item>
				<u-cell-item @click="navTo('../user/forget_pwd')" :title="this.$t('login_password')">
					<img class="icons" src="static/images/gerenziliao/password.png" alt="" slot="icon">
				</u-cell-item>
				<u-cell-item @click="navTo('../user/forget_pwd2')" :title="this.$t('Security_Code')">
					<img class="icons" src="static/images/gerenziliao/safe.png" alt="" slot="icon">
				</u-cell-item>
				<u-cell-item :arrow="false" :title="this.$t('Registration_time')" :value="createTime">
					<img class="icons" src="static/images/gerenziliao/singin.png" alt="" slot="icon">
				</u-cell-item>
				<u-cell-item @click="navTo('../refer/share')" :title="activeCode">
					<img class="icons" src="static/images/gerenziliao/invi.png" alt="" slot="icon">
				</u-cell-item>
				<!-- <u-cell-item icon="calendar" :arrow="false" :title="zone"></u-cell-item>
				<u-cell-item icon="chat" :arrow="false" :title="lang"></u-cell-item> -->
			</u-cell-group>
		</view>

		<!-- <view class="u-m-t-20 list-item">
			<u-cell-group>
				<u-cell-item @click="logout" :title="this.$t('sign_out')">
					<img class="icons" src="static/images/gerenziliao/exit.png" alt="" slot="icon">
				</u-cell-item>
			</u-cell-group>
		</view> -->
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';

	export default {
		data() {
			return {
				pic: '/static/images/user/avatar.jpg',
				show: true,
				user: '',
				ip: '',
				createTime: '',
				activeCode: '',
				zone: '',
				lang: '',
				idStr: '',
				money: '',
				level: '-',
				bankcard: '',
				country: '',
				level_name: ''

			}
		},
		mounted() {
			this.init();
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('personal_information')
			})
		},
		components: {
			commonHead,
		},
		methods: {
			init() {
				this.user = this.$queue.getData('user');
				this.ip = this.$t('recent') + this.$queue.getData('ip');
				this.idStr = '' + this.user.userId;
				this.create_time = this.$queue.getData('createTime');
				var token = this.$queue.getData('token');
				this.createTime = this.user.createTime;
				this.activeCode = this.$t('Invitation_code') + ':' + this.user.activeCode;
				this.zone = this.$t('Time_zone') + ':' + this.user.zone;
				this.lang = this.$t('Language')
				//没有token就去登录页面
				if (!token) {
					uni.reLaunch({
						url: '../login/login',
					});

				}
				this.reqUserInfo()
			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			logout() {
				console.log('logout');
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
						if (res.code == 0) {} else {
							this.$queue.showToast(res.message);
						}
						uni.reLaunch({
							url: '../login/login',
						});
					})
					.catch(res => {});
			},
			reqUserInfo() {
				this.$Request
					.post('/app/user/info', {})
					.then(res => {
						if (res.code == 0) {
							this.level_name = res.data.user.levelName;
							//this.getUserInfo();
						} else if (res.code = 401) {
							this.$queue.showToast(res.message);
							uni.reLaunch({
								url: '../login/login',
							});
						}
					})
					.catch(res => {});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;

		.uname {
			color: red;

			img {
				width: 30rpx;
				margin-left: 20rpx;
			}
		}

		.uid {
			color: #999;
		}
	}

	.list-item {
		border-bottom: 1rpx solid #999;

		.icons {
			margin-right: 20rpx;
			width: 35rpx;
			height: 31rpx
		}
	}
</style>
