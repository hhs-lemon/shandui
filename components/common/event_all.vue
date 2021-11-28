<template>
	<view class="event">
		<view class="event-card" :style="{'background': background}" @click="toPage(eventInfo)">
			<view class="event-card-title">
				<view class="competition">
					<view class="competition-league">{{eventInfo.leagueName}} /</view>
					<view class="competition-time">{{eventInfo.beginTime.substring(5,10)}}
						{{eventInfo.beginTime.substring(11,16)}}</view>
				</view>
				<view class="start">
					<image src="/static/images/time.png" mode=""></image>
					<!-- <text  v-if='eventInfo.status==1'>已开赛</text> -->
					<text v-if="eventInfo.status==0">{{eventInfo.diffTime}}</text>
				</view>
			</view>
			<view class="info">
				<view class="info-homeName">
					{{eventInfo.homeName}}
				</view>
				<view class="info-vs">
				<image src="/static/images/Vs.png" mode=""></image>
				</view>
				<view class="info-awayName">
					{{eventInfo.awayName}}
				</view>
			</view>
			<!-- 	<view class="event-card-content"
				:style="[!eventInfo.guaranteed?{'margin-left':'17rpx'}:{'margin-left':'17rpx'}]">
				<img v-if="eventInfo.guaranteed" src="/static/images/baoben.png" alt="" class="baoben">
				<div v-if="eventInfo.guaranteed" class="bao-ben-text">{{$t('Guaranteed')}}</div>
				<view class="event-card-content-date">
					<view>{{$t('Start_time')}}：{{eventInfo.beginTime}}</view>
					<view>
						<image src="/static/images/home/time_icon.png" />
						<view v-if='eventInfo.status==1'>已开赛</view>
						<view v-if='eventInfo.status==0'>{{eventInfo.diffTime}}</view>
					</view>
				</view>
				<view class="event-card-content-title">{{eventInfo.leagueName}}</view>
				<view class="event-card-content-team">
					<view class="event-card-content-team-left">{{eventInfo.homeName}}</view>
					<view class="event-card-content-team-mid">vs</view>
					<view class="event-card-content-team-right">{{eventInfo.awayName}}</view>
				</view>
			</view> -->
		</view>
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
			background: {
				type: String,
				default: '#1D2638',
			},
		},
		data() {
			return {

			}
		},
		methods: {
			toPage(item) {
				if (item.status != 0) {
					this.$queue.showToast('赛事已结束...');
					return;
				}
				uni.navigateTo({
					url: `../../pages/match/match_content?id=${item.id}`
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.event {
		height: 230rpx;
		border-radius: 20rpx;
		margin: 6rpx 0 30rpx 0;
		padding: 2rpx;
		background-image: linear-gradient(90deg, #1EFFFA -0.96%, #34CDFF 100%);
	}

	.event-card {
		display: flex;
		padding: 26rpx 48rpx;
		border-radius: 20rpx;
		width: 100%;
		height: 100%;
		flex-direction: column;

		.info {
			color: #FFFFFF;
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 160rpx;

			.info-homeName{
				width: 180rpx;
			}

			.info-awayName{
				width: 180rpx;
			}

			.info-vs {
				width: 68rpx;
				height: 68rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

		}

		.event-card-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40rpx;
			width: 100%;

			.start {
				display: flex;
				align-items: center;

				image {
					height: 40rpx;
					width: 40rpx;
				}

				text {
					margin-left: 12rpx;
					color: #1FFDFA;
					font-size: 24rpx;
				}
			}

			.competition {
				display: flex;
				align-items: center;

				.competition-league {
					color: #BACEF1;
					font-size: 28rpx;
				}

				.competition-time {
					color: #758BB5;
					font-size: 24rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
