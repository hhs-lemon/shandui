<template>
	<view class="event-card" @click="toPage(eventInfo)">
		<!--<view class="event-card-content">
			<view class="event-card-content-date">
				<view>{{$t('Start_time')}}：{{eventInfo.beginTime}}</view>
				
				<view>
					<image src="/static/images/home/naozhong.png"/>
					<view>已开赛{{eventInfo.diffTime}}</view>
				</view>
				
			</view>
			<view class="event-card-content-title">{{eventInfo.leagueName}}</view>
			<view class="event-card-content-team">
				<view class="event-card-content-team-left">{{eventInfo.homeName}}</view>
				<view class="event-card-content-team-mid">vs</view>
				<view class="event-card-content-team-right">{{eventInfo.awayName}}</view>
			</view>
			<view class="event-card-content-result">
				<view class="event-card-content-result-left">波胆 {{eventInfo.homeScore}}:{{eventInfo.awayScore}}</view>
				<view class="event-card-content-result-right">上半场波胆
					{{eventInfo.halfHomescore}}:{{eventInfo.halfAwayscore}}</view>
			</view>
		</view>-->
		<view class="event-item">
			<view class="left">
				<view>{{eventInfo.beginTime}}</view>
				<view>
					<view class="statu-box">
						<view class="statu"
							:class="eventInfo.homeScore>eventInfo.awayScore?'statu-active':eventInfo.homeScore===eventInfo.awayScore?'draw':''">
						</view>
					</view>
					<view class="team">{{eventInfo.homeName}}</view>
					<view class="score">{{eventInfo.homeScore}}</view>
				</view>
				<view>
					<view class="statu-box">
						<view class="statu"
							:class="eventInfo.awayScore>eventInfo.homeScore?'statu-active':eventInfo.homeScore===eventInfo.awayScore?'draw':''">
						</view>
					</view>
					<view class="team">{{eventInfo.awayName}}</view>
					<view class="score">{{eventInfo.awayScore}}</view>
				</view>
			</view>
			<view class="right-more"></view>
		</view>
		<!-- 详情 -->
		<u-popup v-model="show" border-radius="20" mode="center">
			<view class="p-content">
				<view class="p-header">{{this.$t('Event_Results')}}</view>
				<view class="vs-message">
					<view class="teams">
						<view>{{itemData.homeName}}</view>
						<img src="/static/images/events/vs.png" alt="">
						<view>{{itemData.awayName}}</view>
					</view>
					<view class="begin-time">{{itemData.beginTime}}</view>
				</view>
				<view class="detaile-list">
					<view class="data1">
						<view>{{$t('Full_time_score')}}</view><span class="line">|</span>
						<view>{{itemData.homeScore}}-{{itemData.awayScore}}</view>
					</view>
					<view class="data2">
						<view>{{$t('Halftime_score')}}</view><span class="line">|</span>
						<view>{{itemData.halfHomescore}}-{{itemData.halfAwayscore}}</view>
					</view>
					<view class="data1">
						<view>{{$t('Total_goals')}}</view><span class="line">|</span>
						<view><span
								style="opacity: 0;margin-right: 6rpx;">.</span>{{itemData.homeScore+itemData.awayScore}}
						</view>
					</view>
				</view>
				<u-button class="close-btn" @click="show = false">{{$t('closure_')}}</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import friendlyDate from '@/common/util.js';
	export default {
		props: {
			eventInfo: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
				show: false,
				itemData: {}
			}
		},
		methods: {
			toPage(item) {
				this.itemData = item
				this.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.event-card {
		margin: 28rpx 50rpx;
		padding: 14rpx 21rpx;
		background: #fff;
		border-radius: 20rpx;

		&-count {
			width: 160rpx;
			height: 160rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 12rpx solid #1e1e1e;
			border-radius: 50%;

			uni-view {
				text-align: center;
				font-size: 24rpx;
				margin-bottom: 10rpx;
			}
		}

		&-content {
			flex: 1;
			margin-left: 30rpx;

			&-date {
				display: flex;
				justify-content: space-between;
				align-items: center;

				uni-view:nth-child(1) {
					font-size: 24rpx;
				}

				uni-view:nth-child(2) {
					display: flex;
					align-items: center;
					font-size: 30rpx;
					font-weight: bold;
					color: red;

					uni-image {
						width: 26rpx;
						height: 26rpx;
					}
				}
			}

			&-title {
				padding-top: 20rpx;
				padding-bottom: 10rpx;
				font-size: 30rpx;
				text-align: center;
				font-weight: bold;
				border-bottom: 5rpx solid #28a69b;
			}

			&-result {
				display: flex;
				padding-top: 20rpx;
				text-align: center;
				color: red;
				font-weight: bold;

				&-left {
					width: 50%;
				}

				&-right {
					width: 50%;
				}
			}

			&-team {
				display: flex;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				align-items: center;
				border-bottom: 5rpx solid #28a69b;

				&-left {
					font-size: 25rpx;
					font-weight: bold;
					text-align: left;
					width: 43%;
				}

				&-mid {
					width: 14%;
					text-align: center;
					font-weight: bold;
					font-size: 35rpx;
				}

				&-right {
					font-size: 25rpx;
					font-weight: bold;
					width: 43%;
					text-align: right;
				}
			}

			&-volume {
				display: flex;
				align-items: center;
				justify-content: space-between;

				>uni-view:nth-child(1) {
					display: flex;
					font-size: 24rpx;
				}

				>uni-view:nth-child(2) {
					display: flex;
					font-size: 30rpx;
				}
			}
		}

		.event-item {
			border-radius: 20rpx;
			font-size: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				color: #333333;
				font-size: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 90%;
				height: 120rpx;

				>view {
					display: flex;

					.statu-box {
						flex: 1;
						display: flex;
						align-items: center;

						.statu {
							width: 20rpx;
							height: 20rpx;
							border-radius: 50%;
							background: #AAB8F1;
						}

						.statu-active {
							background: #5F76FB;
						}

						.draw {
							background: #da74fe;
						}
					}

					.team {
						flex: 10;
					}

					.score {
						flex: 1;
						color: #F51C21;
						font-size: 26rpx;
						font-weight: 666;
					}
				}

			}

			.right-more {
				width: 15rpx;
				height: 15rpx;
				border: 15rpx solid transparent;
				border-left: 15rpx solid #bbb;
			}
		}

		.p-content {
			width: 550rpx;
			overflow: hidden;

			.p-header {
				height: 76rpx;
				font-size: 30rpx;
				color: #fff;
				background-color: #A6BDFE;
				width: 100%;
				text-align: center;
				line-height: 80rpx;
			}

			.vs-message {
				color: #fff;
				margin: 8rpx 8rpx 0;
				height: 240rpx;
				background: url('/static/images/events/780.png') no-repeat center center;
				background-size: contain;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: space-between;
				padding: 28rpx 0 12rpx 0;

				.teams {
					display: flex;
					flex-direction: column;
					align-items: center;

					img {
						width: 49rpx;
						margin: 15rpx;
					}
				}

				.begin-time {
					font-size: 24rpx;
				}
			}

			.detaile-list {
				display: flex;
				flex-direction: column;
				font-size: 30rpx;
				color: #666666;
				margin-top: 20rpx;

				.data1 {
					display: flex;
					background: #E4E9FE;
					height: 40rpx;

					view {
						flex: 1;
						padding: 0 30rpx 0 40rpx;
					}

					view:first-child {
						flex: 3;
						text-align: center;
					}

					.line {
						color: #999;
					}
				}

				.data2 {
					display: flex;

					view {
						flex: 1;
						padding: 0 30rpx 0 40rpx;
					}

					view:first-child {
						flex: 3;
						text-align: center;
					}

					.line {
						color: #999;
					}
				}
			}

			.close-btn {
				width: 308rpx;
				height: 78rpx;
				color: #fff;
				font-size: 30rpx;
				border-radius: 20rpx;
				background-image: linear-gradient(90deg, #ED6FFF, #83A9F8);
				margin: 40rpx auto 50rpx;
				overflow: hidden;
			}
		}
	}
</style>
