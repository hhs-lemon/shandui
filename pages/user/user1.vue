<template>
	<view class="user">
        <mask-model ref="logoutPop" btnType="1" @confirm="confirm" @cancel="cancel" titleColoe="#ff6666" cancelColor="#666666" confirmColor="#007AFF" :maskTitle="maskTitle"></mask-model>
		<!-- 头部操作 -->
		<view class="header">
			<view class="wrap">
				<!--
				<image class="service" mode="scaleToFill" :src="servicePicUrl" @click="goService"></image>
				-->
				<image class="service" mode="scaleToFill" :src="servicePicUrl" @tap="modalTap"></image>
				<image class="cancel" mode="scaleToFill" :src="cancelPicUrl" @click="logoutConfirm"></image>
			</view>

			
			<!-- 用户信息 -->
			<view class="user-info">
				<image class="user-info-avatar" @click="goInfo" mode="aspectFill" :src="headPicUrl"></image>
				<view class="user-info-name" @click="copy(user.username)">{{$t('Hello_there')}}{{user.username}}</view>
				<view class="user-info-money">
					<view @click="goWallet">
						<view class="user-info-money-dollar">{{(money/1)|moneyFormat}} {{$t('Money_symbol')}}</view>
						<view>{{this.$t('My_Balance')}}</view>
					</view>
					<view @click="goUserLevel">
						<!-- todo://点击就是会员等级介绍 -->
						<view class="user-info-money-gold">{{user.levelName}}</view>
						<view>{{$t('My_Level')}}</view>
					</view>
				</view>
			</view>
			<!-- 订单状态 -->
			<view class="order-status">
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
			</view>
		</view>

		<!-- 用户功能 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in order2" :key="index" @tap="toPage2(index)">
					<view class="cell-left">
						<image class="cell-icon" :src="item.icon" mode="aspectFill"></image>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>

		<!-- 用户服务 -->
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" v-for="(item, index) in order3" :key="index" @tap="toPage3(index)">
					<view class="cell-left">
						<image class="cell-icon" :src="item.icon" mode="aspectFill"></image>
						<view class="cell-text">{{ item.title }}</view>
					</view>
					<view class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import maskModel from '../../components/mask-model/mask-model.vue'
export default {
	components: {
		maskModel
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title:this.$t('mine')
		})
		uni.setTabBarItem({
			index: 0
		})
		uni.setTabBarItem({
			index: 1,
			text: this.$t('Match')
		})
		// uni.setTabBarItem({
		// 	index: 2,
		// 	text: this.$t('News')
		// })
		uni.setTabBarItem({
			index: 2,
			text: this.$t('Bet')
		})
		uni.setTabBarItem({
			index: 3,
			text: this.$t('mine')
		})
	},
	data() {
		return {
			maskTitle:this.$t('Whether_to_log_out'),
			token:'',
			user:{},
			headPicUrl: '/static/images/user/avatar.jpg',
			servicePicUrl: '/static/images/user/kefu.png',
			cancelPicUrl: '/static/images/user/guanji.png',
			money:'-',
			level:1,
			level_name:'-',
			order1: [
				// { name: this.$t('Recharge'), icon: 'iconfont icon31daifahuo', status: 35, path: '../recharge/index', background: 'linear-gradient(to right, #fa6a41, #fd3c49)' },
				{ name: this.$t('trade_'), icon: 'iconfont icon31daifahuo', status: 35, path: '../transaction/index', background: 'linear-gradient(to right, #fa6a41, #fd3c49)' },
				// { name: this.$t('withdraw'), icon: 'iconfont icon31daifukuan', status: 15, path:'../withdraw/index', background: 'linear-gradient(to right, #f9b708, #f18d09)' },
			],
			currentIndex: 0,
			order2: [
				{
					title: this.$t('Recharge_record'),
					icon: '/static/images/user/icon-address.png',
					path: '../list/recharge_list'
				},
				{
					title: this.$t('Withdrawals_record'),
					icon: '/static/images/user/icon-collect.png',
					path: '../list/withdraw_list'
				}, {
					title: this.$t('Account_Change_Details'),
					icon: '/static/images/user/wallet_list.png',
					path: '../list/wallet_list'
				}
			],
			order3: [
				 {
					title: this.$t('My_Share'),
					icon: '/static/images/user/icon-kefu.png',
					path: '../refer/share'
				}, {
					title: this.$t('my_team'),
					icon: '/static/images/user/icon-about.png',
					path: '../refer/home'
				}, {
					title: this.$t('personal_information'),
					icon: '/static/images/user/icon-foot.png',
					path: '../user/info'
				}, {
					title: this.$t('Help_Center'),
					icon: '/static/images/user/icon-help.png',
					path: ''
				}
			]
		};
	},
    watch: {
        '$route.path': function (to, from) {
            if(to=='\/'){
                this.init();
            }
        }
    },
    mounted() {
		this.init();
    },
	methods: {
		modalTap(){
				uni.showModal({
					title: this.$t('online_service'),
					content: this.$t('Customer_service_link_is_not_connected'),
					showCancel: false,
					confirmText: this.$t('determine')
				})
			},
		confirm(){//确定按钮
			this.logout();
        },
		cancel(){//取消按钮
		},
		logoutConfirm(){//打开询问弹窗
			this.$refs.logoutPop.show();
		},
		copy(value) {
			console.log(333,uni.setClipboardData() )
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
		init(){
			var token = this.$queue.getData('token');
			//没有token就去登录页面
			if(!token){
				uni.reLaunch({
					url: '../login/login',
				});

			}
			this.$Request
				.post('/app/user/info', {
				})
				.then(res => {
					if (res.code==0) {
						this.$queue.setData('id', res.data.user.userId);
						this.user = res.data.user;
						this.level_name = res.data.user.levelName;
						this.$queue.setData('user', res.data.user);
						this.$queue.setData('ip', res.data.ip);
						this.$queue.setData('realname', res.data.user.realname);
						this.$queue.setData('wallet', res.data.wallet);
						this.money = res.data.wallet.money;
						console.log('res.data.wallet.money is ',res.data.wallet.money);
						this.level = res.data.user.level;
						//this.getUserInfo();
					} else if(res.code=401){
						this.$queue.showToast(res.message);
						uni.reLaunch({
							url: '../login/login',
						});
					}
				})
				.catch(res => {
				});

		},
		toPage1(index) {
			uni.navigateTo({
				url:this.order1[index].path
			});
		},
		goWallet() {
			//钱包明细
			uni.navigateTo({
				url:'../list/wallet_list'
			});
		},
		goUserLevel() {
			//会员等级
			uni.navigateTo({
				url:'./user_level'
			});
		},
		toPage2(index) {
			uni.navigateTo({
				url:this.order2[index].path
			});
		},
		toPage3(index) {
			uni.navigateTo({
				url:this.order3[index].path
			});
		},
		goInfo() {
			 uni.navigateTo({
			 	url:'./info'
			 });
		},
		goService() {
			this.$queue.showToast(this.$t('Jump_Customer_Service'));
			// uni.navigateTo({
			// 	url:'../login/login'
			// });
		},
		logout() {
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
			console.log('logout0');
					} else {
			console.log('logout1');
						this.$queue.showToast(res.message);
					}
					uni.reLaunch({
						url: '../login/login',
					});
				})
				.catch(res => {
				});
			uni.navigateTo({
				url:'../login/login'
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
	.header {
		background: #fff;
		.wrap {
			display: flex;
			justify-content: space-between;
			height: 35vw;
			padding: 50rpx;
			//background: url('https://handsel.oss-cn-shenzhen.aliyuncs.com/1588938371592.jpg') no-repeat;
			//背影色
			background: #f86c49;
			background-size: cover;
			.service, .cancel {
				width: 50rpx;
				height: 50rpx;
			}
		}
		.user-info {
			margin: 0 60rpx;
			padding: 0 40px 20rpx;
			margin-top: -18vw;
			background: #fff;
			border-radius: 40rpx;
			text-align: center;
			font-size: 30rpx;
			box-shadow: 0rpx 0rpx 4rpx #e2e2e2;
			&-avatar {
				width: 120rpx;
				height: 120rpx;
				margin-top: -60rpx;
				border-radius: 90%;
			}
			&-name {
				margin: 20rpx 0;
			}
			&-money {
				display: flex;
				justify-content: space-around;
				text-align: left;
				margin-bottom: 15rpx;
				&-dollar {
					margin: 10px 0;
					color: #c47c82;
				}
				&-gold {
					margin: 10px 0;
					color: #e6cd7c;
				}
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
	.com-item {
		padding-left: 30rpx;
		padding-right: 30rpx;
		margin-top: 30rpx;
		.com-wrap {
			border-radius: 25rpx;
			overflow: hidden;
		}
	}
	.cell {
		height: 100rpx;
		padding-left: 25rpx;
		padding-right: 25rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		border-bottom: 1px solid #08fef1;
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
				width: 55rpx;
				height: 55rpx;
			}
			.cell-text {
				color: #666;
				font-size: 30rpx;
				margin-left: 30rpx;
			}
		}
		.iconfont {
			font-size: 50rpx;
			color: #999;
		}
	}
}
</style>
