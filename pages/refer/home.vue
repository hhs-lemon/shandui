<template>
	<view class="flex-view">
		<commonHead background="url('/static/images/deep_nav_bg.png') no-repeat center!important" :backIcon="true"
			:title="this.$t('my_team')"></commonHead>
		<view class="team-data">
			<view class="data-item">
				<view class="title">{{$t('Directly_subordinate')}}</view>
				<view class="ammount">{{refer_size}}{{$t('people')}}</view>
			</view>
			<view class="data-item">
				<view class="title">{{$t('Number_of_Teams')}}</view>
				<view class="ammount">{{refers_size}}{{$t('people')}}</view>
			</view>
			<view class="data-item">
				<view class="title">{{$t('Accumulated_Commission')}}</view>
				<view class="ammount">{{(money/1)|moneyFormat}}{{this.$t('yuan')}}</view>
			</view>
		</view>
		<view class="cell" @click="goToProxy">
			<image class="cell-icon" src="/static/images/my/proxy.png"></image>
			<view class="cell-text">{{$t('proxy_rule')}}</view>
			<view class="iconfont iconmore1" style="color: #CE4949; margin-right: 28rpx; margin-top: 0rpx;"></view>
		</view>


		<view class="data-list">
			<view class="titles">
				<view class="title">{{$t('account_number')}}</view>
				<view class="title">{{$t('Registration_time')}}</view>
			</view>
			<view class="item" v-for="(it,i) in list" :key="it.id" :class="i%2!==0?'color-bg':''">
				<view class="item-account">{{it.username}}</view>
				<view class="item-time">{{it.create_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiTabs from '@/components/tui-tabs/tui-tabs';
	import commonHead from '@/components/common/common_header.vue';
	export default {
		components: {
			commonHead,
			tuiTabs
		},
		data() {
			return {
				username: '-',
				userId: '-',
				money: 0,
				refer_size: 0,
				refers_size: 0,
				is_withdraw: false,
				list: [],
				userData: {},
				showModal: false,
				date: 'incomeMonth',
				currentTab: 0,
				tabs: [{
					name: this.$t('Team_List')
				}]
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('My_team_center')
			})
			this.$api.loading(true);
			this.loadData();
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
		},
		methods: {
			async loadData() {
				this.userId = this.$queue.getData('id');
				this.username = this.$queue.getData('username');
				this.$Request
					.post('/app/userrefer/info', {})
					.then(res => {
						if (res.code == 0) {
							this.refer_size = res.data.refer_size;
							this.refers_size = res.data.refers_size;
							this.money = res.data.refer_bonus;
							this.list = res.data.refers;
						} else if (res.code = 401) {
							this.$queue.showToast(res.message);
							uni.reLaunch({
								url: '../login/login',
							});
						}
					})
					.catch(res => {});
			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			goToProxy()
			{
				uni.navigateTo({
					url: "/pages/refer/proxy"
				});
			}
		},
		onPullDownRefresh() {
			this.loadData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		}
	};
</script>

<style lang="scss" scoped>
	.flex-view {
		background: #EEEEEE;
		min-height: 100vh;

		.team-data {
			display: flex;
			justify-content: space-between;
			padding: 16rpx 30rpx;

			.data-item {
				width: 210rpx;
				height: 120rpx;
				font-size: 30rpx;
				border-radius: 20rpx;
				background: #fff;
				overflow: hidden;

				.title {
					height: 50rpx;
					line-height: 50rpx;
					color: #fff;
					background-image: linear-gradient(0, #A967F2, #87A4F6);
					text-align: center;
				}

				.ammount {
					color: #666;
					text-align: center;
					line-height: 70rpx;
				}
			}
		}

		.data-list {
			font-size: 30rpx;
			margin: 0 30rpx;
			margin-top: 20rpx;
			border-radius: 27rpx 27rpx 0rpx 0rpx;
			background: #fff;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			box-shadow: 0 0 10rpx 0 #999;

			>view {
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
			}

			.titles {
				color: #fff;
				background-image: linear-gradient(0, #87A5F7, #A967F2);
				display: flex;
				justify-content: space-between;

				.title {
					margin: auto;
				}
			}

			.item {
				color: #999;
				display: flex;

				.item-account {
					flex: 2;
				}

				.item-time {
					flex: 3;
				}
			}

			.color-bg {
				background: #F2E9FD;
			}
		}
	}

	.cell {
		height: 80rpx;
		display: flex;
		margin: auto;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		position: relative;
		width: 690rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.11);
		border-radius: 18px;
		.cell-icon {
			width: 42rpx;
			height: 42rpx;
			margin-top: 19rpx;
			margin-bottom: 19rpx;
			margin-left: 40rpx;
		}

		.cell-text {
			color: #666666;
			font-size: 30rpx;
			text-align: center;
			align-items: center;
		}
	}
</style>
