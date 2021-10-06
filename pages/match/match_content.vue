<template>
	<view>
		<uni-nav-bar color="#FEFEFE" backgroundColor="transparent" left-icon="back" right-icon="reload"
			:title="this.$t('Event_Details')" @clickRight="refresh()" @clickLeft="goBack()"></uni-nav-bar>
		<view class='topArea'>
			<view class="details-date">
				<view>{{$t('Start_time')}}
					：{{begin_time}}</view>
				<view>
					<image src="/static/images/eventdetails/naozhong.png" />
					<view>{{detailsInfo.time_range}}</view>
					<u-count-down ref="uCountDown" @change="change" :timestamp="time" :show-days="false"
						:show-minutes="false" :show-hours="false" separator="colon" separator-size="28"
						separator-color="#606266"></u-count-down>
					s
				</view>
			</view>
			<view class="details-title">{{league_name}}</view>
			<view class="">
				<view style="font-size: 24rpx;">{{home_name}}</view>
				<view class="teamVS">vs</view>
				<view style="font-size: 24rpx;position: absolute;right: 0rpx;">{{away_name}}</view>
			</view>
			<view class="details-tab">
				<view @click="tabs(0)" :class="tab ? '': 'active'">{{$t('Correctness')}}
				</view>
				<view @click="tabs(1)" :class="tab ? 'active': ''">{{$t('Correct_in_the_first_half')}}
				</view>
			</view>
		</view>
		<view class="details">
			<view style="margin: auto; text-align: center;color: #5F88FF; font-size: 36rpx;">
				{{detailsInfo[`list${tab}`].volume}}
			</view>
			<view style="margin: auto; text-align: center;color: #5F88FF; font-size: 24rpx;">{{$t('Volume')}}</view>
			<view class="details-list list-head">
				<view>{{$t('Against_the_result')}}</view>
				<view>{{$t('Investable_income')}}</view>
				<view>{{$t('trading_status')}}</view>
			</view>
			<view class="details-list  list-body" v-for="(item, index) in detailsInfo[`list${tab}`].items"
				@click="detailShow(item,true)" :key="index">
				<view>{{item.cutLine}}</view>
				<view>{{item.earnings}}</view>
				<view class="list-body-time">{{item.status}}
					<image mode="scaleToFill" src="/static/images/eventdetails/shijian2.png" />
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		created() {},
		watch: {},
		data() {
			return {
				click_lock: false,
				home_name: '',
				away_name: '',
				begin_time: '',
				league_name: '',
				popup_show: false,
				tab: 0,
				matchId: 0,
				orderId: 0,

				sports_min: 0,
				sports_fee: 0, //{{$t('Handling_Fee')}}
				sports_raio: 0,

				detailsInfo: {
					time_range: '', //这里应该改下
					list0: {
						volume: 14763051,
						items: [
							// {earnings: 123, id: 1}
						]
					},
					list1: {
						volume: 14763052,
						items: []
					}
				},
				cut_line: '0-2',
				earn_rate: 4.5, //{{$t('Rate_of_Return')}}

				earn: 0, //获利
				balance: 0,
				trading: 100,
				trading_list: [100, 200, 500, 1000, 5000, 10000, 50000, 60000],
				matchInfo: {},
				time: 60
			}
		},
		filters: {
			tradHandle(val) {
				if (val >= 1000) {
					return val / 1000 + 'K';
				}
				if (val >= 1000) {
					return val
				}
				return val;
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$t('Event_Details')
			})
			this.matchId = option.id;
			this.init();
		},

		methods: {
			init() {
				this.detailsInfo = {
					time_range: '', //这里应该改下
					list0: {
						volume: 14763051,
						items: [
							// {earnings: 123, id: 1}
						]
					},
					list1: {
						volume: 14763052,
						items: []
					}
				}
				this.$Request
					.post('/app/sports/sports_order', {
						matchId: this.matchId
					})
					.then(res => {
						if (res.code == 0) {
							var item = res.data.item;
							this.sports_min = res.data.sports_min / 1;
							this.sports_ratio = res.data.sports_ratio;
							this.sports_fee = res.data.sports_fee / 100;
							this.balance = res.data.money / 1;
							this.home_name = item.homeName;
							this.away_name = item.awayName;
							this.begin_time = item.beginTime;
							this.league_name = item.leagueName;
							var rawData = res.data.sports;
							rawData.sort(function(a, b) {
								if (a['cutLine'] > b['cutLine']) {
									return 1;
								}
								return -1;
							});
							for (var i = 0; i < rawData.length; i++) {
								//{{$t('Full_audience')}}

								var row = {
									id: rawData[i].id,
									earnings: rawData[i].oddPercent + "%",
									oddPercent: rawData[i].oddPercent,
									cutLine: rawData[i].cutLine,
									status: this.$t('Order_can_be_placed'),
								};
								if (rawData[i].isHalf == 0) {
									this.detailsInfo.list0.items.push(row);
								} else {
									this.detailsInfo.list1.items.push(row);
								}
							}
						} else if (res.code = 401) {
							this.$queue.showToast(res.message);
							uni.reLaunch({
								url: '../login/login',
							});
						}
					})
					.catch(res => {});
			},
			goBack() {
				uni.reLaunch({
					url: '../home/index'
				});
			},
			refresh() {
				this.init();
				this.$api.loading(true);
				this.time = 60
				this.$refs.uCountDown.start();
				setTimeout(() => {
					this.$api.loading(false);
				}, 500);
			},
			tabs(index) {
				this.tab = index;
			},
			toPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			detailShow(item, val) {
				this.cut_line = item.cutLine;
				this.orderId = item.id;
				// this.popup_show = val;
				this.earn_rate = item.oddPercent;

				this.matchInfo.cut_line = this.cut_line;
				this.matchInfo.league_name = this.league_name;
				this.matchInfo.home_name = this.home_name;
				this.matchInfo.away_name = this.away_name;
				this.matchInfo.balance = this.balance;
				this.matchInfo.trading_list = this.trading_list;
				this.matchInfo.balance = this.balance;
				this.matchInfo.trading = this.trading;
				this.matchInfo.earn_rate = this.earn_rate;
				this.matchInfo.sports_min = this.sports_min;
				this.matchInfo.sports_fee = this.sports_fee;
				this.matchInfo.sports_ratio = this.sports_ratio;
				this.matchInfo.orderId = this.orderId;
				this.$queue.setData('matchInfo', this.matchInfo);

				uni.navigateTo({
					url: '/pages/match/match_order'
				});

			},
			onCancel() {
				this.popup_show = false;
				this.resetTouch()
			},
			goRecharge() {
				uni.navigateTo({
					url: '../../pages/recharge/index',
				});
			},
			transaction(val, idx) {
				console.log(val);
				console.log(idx);
				if (idx == 7) {
					this.trading = this.balance;
					return;
				}
				this.trading = val;
			},
			onOk() {
				if (this.trading > this.balance || this.trading < 100) {
					return;
				}
				if (this.click_lock) {
					setTimeout(() => {
						this.click_lock = false;
					}, 1000)
					return;
				} else {
					this.click_lock = true;
				}

				this.popup_show = false;
				this.resetTouch()
				this.$Request
					.post('/app/sports/submit', {
						orderId: this.orderId,
						money: this.trading
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Successful_bet'));
							this.popup_show = false;
							this.resetTouch()
							this.init();
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {
						uni.hideLoading();
					});

			},
			// 事件触发，每秒一次
			change(timestamp) {
				if (timestamp === 0) {
					this.refresh()
					this.$refs.uCountDown.start();
				}
			},
			resetTouch() { // 弹框消失，恢复滑动
			}
		}
	};
</script>

<style lang="scss" scoped>
	/deep/.uni-navbar__content {
		justify-content: space-between;
		background: url('/static/images/home/nav_bg.png') no-repeat center center;
		background-size: cover;
		border: none;
	}

	/deep/.uni-nav-bar-text {
		font-size: 30rpx;
	}

	.topArea {
		width: 100%;
		height: 288rpx;
		background: linear-gradient(0deg, #FFFFFF, #EFF1FE, #FFFFFF);
	}

	.teamVS {
		margin: auto;
		width: 80rpx;
		height: 40rpx;
		text-align: center;
		background: linear-gradient(0deg, #366FFF, #C0C3FE);
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 40rpx;
	}

	.details {
		background: #fff;
		font-size: 28rpx;

		&-refresh {
			padding: 16rpx 30rpx;
			text-align: right;
			background: #28a69b;

			uni-image {
				width: 32rpx;
				height: 32rpx;
			}
		}

		&-date {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 20rpx 30rpx;

			uni-view:nth-child(2) {
				display: flex;
				align-items: center;

				uni-image {
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}
			}
		}

		&-title {
			text-align: center;
			font-size: 24rpx;
			font-weight: normal;
			color: #333333;
		}

		&-team {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx 0;
			padding-bottom: 20rpx;
			font-size: 30rpx;
			font-weight: 500;
			border-bottom: 1rpx solid #e2e2e2;

			uni-image {
				margin-right: 10rpx;
				width: 30rpx;
				height: 30rpx;
			}

			uni-view:nth-child(3) {
				margin: 0 60rpx;
			}
		}

		&-tab {
			margin: 30rpx 0rpx;
			display: flex;
			justify-content: space-between;
			color: #666666;
			background-color: #d0d9ff;

			uni-view {
				flex: 1;
				text-align: center;
				box-sizing: border-box;
				font-size: 30rpx;
				font-weight: 400;
				line-height: 50rpx;
			}

			uni-view:first-child {
				border-right: 1rpx solid white;
			}

			.active {
				border-bottom: 4rpx solid #325bff;
				color: #325bff;
			}
		}

		&-volume {
			text-align: center;
			font-size: 28rpx;
		}

		&-list {
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			uni-view {
				flex: 1;
				text-align: center;
			}
		}

		.list-head {
			border-bottom: 4rpx solid #d0d7da;
			background: #CEDBFE;
			border-radius: 40rpx 40rpx 0rpx 0rpx;
			font-size: 30rpx;
			font-weight: normal;
			color: #333333;
			height: 80rpx;
		}

		.list-body {
			padding: 20rpx;
			font-size: 24rpx;
			color: #333333;

			uni-view:nth-child(2) {
				color: #28a69b;
			}

			&-time {
				display: flex;
				align-items: center;
				justify-content: center;

				uni-image {
					width: 28rpx;
					height: 28rpx;
					margin-left: 10rpx;
				}
			}
		}

		.list-body:nth-child(2n + 1) {
			background: #E8EEFD;
		}

		&-goback {
			position: fixed;
			bottom: 0;
			width: 100%;
			padding: 0 20rpx;

			uni-view {
				padding: 20rpx 0;
				background: #f6f6f6;
				font-weight: 500;
				text-align: center;
				border-radius: 6rpx;
				box-shadow: 0 0 12rpx #C8C7CC;
			}
		}
	}
</style>
