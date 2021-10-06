<template>
	<view class="wallet">
		<view class="header">
			<view class="wallet-nav">
				<view class="nav-title">
					<view>{{this.$t('Bet_today')}}</view>
					<view>{{this.$t('Today_Earnings')}}</view>
					<view>{{this.$t('Bet_this_week')}}</view>
					<view>{{this.$t('This_Week_Earnings')}}</view>
				</view>
				<view class="data">
					<view>{{todayCnt}}</view>
					<view>{{todayEarn}}{{$t('Money_symbol')}}</view>
					<view>{{weekCnt}}</view>
					<view>{{weekEarn}}{{$t('Money_symbol')}}</view>
				</view>
			</view>
			<!-- 	<view class="wallet-list-head">
				<view>
					<view>{{this.$t('time')}}</view>
				</view>
				<view>
					<view>{{this.$t('Bet')}}</view>
				</view>
				<view>
					<view>{{this.$t('Profit_and_Loss')}}</view>
				</view>
				<view>
					<view>{{this.$t('status')}}</view>
				</view>
			</view> -->
		</view>
		<!--
		<view class="wallet-list-title">下注列表</view>
		-->

		<view class="wallet-list">
			<view class="wallet-list-text" v-for="(it, index) in list" :key="index" @click="itemDetail(it)">
				<view class="item-head">
					<view>
						<view class="create-time">{{it.createTime}}</view>
						<view class="team-name">{{it.leagueName}}</view>
					</view>
					<view class="item-statu" :style="{color:'#fff'}" v-if="it.status==0">
						{{$t('Betting')}}
					</view>
					<view class="item-statu item-statu1" :style="{color:'#333333'}" v-if="it.status==1">
						{{$t('Settled')}}
					</view>
					<view class="item-statu item-statu1" :style="{color:'#333333'}" v-if="it.status==2">
						{{$t('Revoked')}}
					</view>
				</view>
				<view class="team">
					<view class="lost-icon"></view>
					<view class="lost-team">{{it.homeName}}</view>
				</view>
				<view class="team">
					<view class="win-icon"></view>
					<view class="win-team">{{it.awayName}}</view>
				</view>
				<view class="bet">
					<view class="bet-title">{{$t('Bet')}}</view>
					<view class="bet-money">{{(it.money)/1}}{{$t('Money_symbol')}}</view>
				</view>
				<view class="win">
					<view class="win-lost">{{$t('Earn')}}</view>
					<view class="win-lost-money">
						<view v-if="it.status==1">
							<view v-if="it.earn==0">0</view>
							<view v-if="it.earn==1" :style="{color:'#C53A3A'}">
								+{{(it.fee).toFixed(0)}}{{$t('Money_symbol')}}</view>
							<view v-if="it.earn==-1" :style="{color:'#008e0d'}">-{{it.money}}{{$t('Money_symbol')}}
							</view>
						</view>
						<view v-else>0</view>
					</view>
				</view>
			</view>
			<img class="empty-data" src="/static/images/empty-data.png" alt="" v-if="resEmpty">
			<view class="loading-status">{{loading_status}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				todayCnt: 0,
				todayEarn: 0,
				weekCnt: 0,
				weekEarn: 0,
				item_id: 0,
				page: 1,
				pageSize: 20,
				toLoad: true,
				eran: 0,
				fee: 0,
				ratio: 0,
				loading_status: this.$t('Loading'),
				popup_show: false,
				oddPercent: 0,
				money: 0,
				resEmpty: false,
				list: []
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('Bet')
			})
			this.$api.loading(true);
			this.getRecord();
			this.getData();
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
		},
		onReachBottom() {
			if (this.toLoad) {
				this.loading_status = this.$t('Loading');
				this.page += 1;
				this.getRecord();
			}
		},
		watch: {
			'$route.path': function(to, from) {
				if (to.indexOf('\/order_list') != -1) {
					this.resEmpty = false
					this.list = [];
					this.page = 0;
					this.getRecord();
				}
			}
		},
		methods: {
			async getRecord() {
				this.$Request
					.post('/app/sports/order_item', {
						pageNum: this.page,
						pageSize: this.pageSize,
						isAsc: 'desc',
						orderByColumn: 'id',
					})
					.then(res => {
						if (res.code == 0) {
							if (!res.rows.length) {
								this.toLoad = false;
								if (this.list.length === 0) {
									this.resEmpty = true
								}
								return;
							}
							if (res.rows.length < this.pageSize) {
								this.toLoad = false;
							}
							this.list = this.list.concat(res.rows)
							if (this.list.length === 0) {
								this.resEmpty = true
							} else {
								this.resEmpty = false
							}
							this.loading_status = this.$t('download_finished');
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			getData() {
				this.$Request
					.post('/app/sports/order_item_data', {})
					.then(res => {
						console.log(res);
						if (res.code == 0) {
							this.todayCnt = res.data.todayCnt;
							this.weekCnt = res.data.weekCnt;
							this.todayEarn = res.data.todayEarn;
							this.weekEarn = res.data.weekEarn;
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			itemDetail(item) {
				this.item_id = item.id;
				console.log('detail');
				console.log(item.id);
				uni.navigateTo({
					url: '/pages/order/order_detail?id=' + item.id
				});
			},
			onCancel() {
				this.popup_show = false;
			},
			onWithdraw() {
				this.$Request
					.post('/app/sports/withdraw', {
						id: item.id
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Revocation_successful'));
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
				this.popup_show = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.wallet {
		height: calc(100vh - 100rpx);
		padding: 0rpx 0;
		overflow-y: auto;
		position: relative;
		background: #eee;

		.header {
			position: fixed;
			width: 100%;
			padding-bottom: 10rpx;
			background: #eee;
		}

		&-nav {
			display: flex;
			flex-direction: column;
			padding: 0rpx 30rpx;
			font-size: 24rpx;
			color: #4D4D4D;

			>view {
				display: flex;
				justify-content: space-between;
				color: #4D4D4D;
				font-size: 30rpx;

				&:first-child {
					padding: 20rpx 0;
				}

				&:last-child {
					background: #fff;
					border-radius: 17rpx;
					line-height: 60rpx;
				}

				>view {
					flex: 1;
					text-align: center;
				}
			}
		}

		&-head {
			width: 100%;
			height: 72rpx;
			background: linear-gradient(-90deg, #CEDEFF, #FFA7A7);
			box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.3);
		}

		&-list-title {
			position: relative;
			font-size: 28rpx;
			font-weight: bold;
			text-align: center;
			color: #a89159;
			padding-bottom: 14rpx;
			margin-bottom: 20rpx;
		}

		&-list-title::after {
			width: 4%;
			height: 6rpx;
			content: '';
			position: absolute;
			bottom: 0;
			left: 48%;
			border-radius: 4rpx;
			background: #a89159;
		}

		&-list {
			color: #333333;
			font-size: 18rpx;
			margin: 220rpx 30rpx 0;

			&-text {
				display: flex;
				flex-direction: column;
				padding: 10rpx 30rpx;
				height: 260rpx;
				border-radius: 17rpx;
				margin-bottom: 10rpx;
				box-shadow: 3rpx 5rpx 5rpx 0 #bbb;
				background: #fff;

				.item-head {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 22rpx;
					color: #4D4D4D;

					>view:first-child {
						display: flex;

						.create-time {
							width: 160rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}

						.team-name {
							margin-left: 20rpx;
							width: 280rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
					}

					.item-statu {
						font-size: 26rpx;
						min-width: 130rpx;
						text-align: center;
						background: #DC3E3E;
						border-radius: 40rpx;
						padding: 5rpx 18rpx;
					}

					.item-statu1 {
						font-size: 26rpx;
						background: #bbb;
					}
				}

				.team {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					color: #111113;
					padding: 6rpx 0;

					.lost-icon {
						width: 25rpx;
						height: 25rpx;
						background-image: linear-gradient(0deg, #B3B3B3, #FFFFFF);
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.win-icon {
						width: 25rpx;
						height: 25rpx;
						background-image: linear-gradient(0deg, #EF3E3E, #FFFFFF);
						border-radius: 50%;
						margin-right: 20rpx;
					}
				}

				.bet {
					display: flex;
					font-size: 34rpx;
					color: #333333;

					.bet-title {
						padding: 0 44rpx;
					}
				}

				.win {
					display: flex;
					font-size: 34rpx;
					color: #C53A3A;

					.win-lost {
						padding: 0 44rpx;
						margin-right: 28rpx;
					}

					.win-lost-money {}
				}
			}

			&-head {
				display: flex;
				color: #333333;
				font-weight: normal;

				>view {
					flex: 2;
					height: 50rpx;
					margin: auto;
					text-align: center;
					background: #c0e2fe;
					font-size: 24rpx;
					color: #333333;
					line-height: 50rpx;
				}
			}
		}
	}

	.detail-popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);

		&-body {
			width: 80%;
			// height: 70%;
			margin-left: 10%;
			margin-top: 30%;
			padding: 40rpx 20rpx;
			background: #fff;
			border-radius: 8rpx;

			&-top {
				display: flex;
				justify-content: center;
				align-items: flex-end;
				border-radius: 8rpx;
				padding: 10rpx 0;
				background: #65a09d;

				view {
					font-size: 32rpx;
					color: #fff;
					padding-bottom: 2rpx;
				}

				view:nth-child(2) {
					font-size: 48rpx;
					padding: 0 10rpx;
					padding-bottom: 0;
					font-weight: bold;
					color: #7f614a;
				}
			}

			&-title {
				padding: 10rpx 0;
				font-size: 28rpx;
				border-bottom: 4rpx solid #65a09d;
				text-align: center;
			}

			&-vs {
				display: flex;
				padding: 0 40rpx;
				justify-content: space-between;

				view {
					font-size: 32rpx;
				}

				view:first-child {
					display: flex;
					align-items: center;
					font-size: 32rpx;
				}

				image {
					width: 34rpx;
					height: 34rpx;
					margin-left: 10rpx;
				}
			}

			&-balance {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				padding-bottom: 10rpx;
				margin: 30rpx 0 20rpx;
				border-bottom: 2rpx dotted #c2c2c2;

				view:first-child {
					view:first-child {
						color: #a3a3a3;
						font-size: 28rpx;
					}

					view:last-child {
						padding-left: 0;
						color: #9d9d9d;
						font-size: 42rpx;
						background: #fff;
					}
				}

				view:last-child {
					display: flex;
					align-items: center;
					height: 52rpx;
					padding: 10rpx 20rpx;
					font-size: 32rpx;
					border-radius: 8rpx;
					background: #292945;

					view:first-child {
						color: #fff;
						font-size: 28rpx;
					}

					image {
						width: 34rpx;
						height: 34rpx;
						margin-left: 10rpx;
					}
				}
			}

			&-trading {
				display: flex;
				flex-wrap: wrap;

				view {
					display: block;
					width: 126rpx;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 6rpx;
					margin: 8rpx;
					font-size: 26rpx;
					font-weight: bold;
					text-align: center;
					background: #f6f6f6;

				}

				view:nth-child(4n + 4) {
					margin-right: 0;
				}
			}

			&-reward {
				display: flex;
				justify-content: space-between;
				margin-top: 40rpx;
				font-size: 32rpx;
				color: #a1a1a1;

				>view {
					display: flex;
					position: relative;
					justify-content: space-between;
					align-items: center;
					width: 46%;
					padding: 18rpx;
					display: flex;
					box-sizing: border-box;
					border: 2rpx solid #a1a1a1;
					// border: 4rpx solid #a04732;
					border-radius: 6rpx;
				}

				image {
					width: 34rpx;
					height: 34rpx;
					margin-left: 10rpx;
				}

				&-top {
					position: absolute;
					top: -20rpx;
					left: 10rpx;
					font-size: 26rpx;
					color: #a1a1a1;
					background: #fff;
				}

				&-active {
					border: 2rpx solid #c24121 !important;

					view:first-child {
						view {
							color: #b3614d;
							font-weight: 500;
						}
					}

					view:last-child {
						color: #b3614d;
					}
				}
			}

			&-toast {
				margin-top: 6rpx;
				padding-left: 20rpx;
				font-size: 26rpx;
				visibility: hidden;
			}

			&-hidden {
				margin-top: 6rpx;
				padding-left: 20rpx;
				color: #b3614d;
				font-size: 26rpx;
				visibility: none;
			}

			&-btn {
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;

				view {
					width: 46%;
					padding: 20rpx 0;
					text-align: center;
					background: #ccc;
					border-radius: 6rpx;
					font-size: 32rpx;
					font-weight: 400;
				}

				&-cannel {
					background: #f5f7f4;
					color: #000;
				}

				&-onok {
					background: #e2e2e2;
					color: #ababab;
				}
			}
		}
	}

	.loading-status {
		width: 100%;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		color: #333;
		text-align: center;

	}


	.empty-data {
		width: 100%;
		margin-top: 10vh;
	}
</style>
