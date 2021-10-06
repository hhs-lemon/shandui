<template>
	<view class="event-card" :style="{'background': background}" @click="toPage(eventInfo)">
		<view class="event-card-content">
			<view class="event-card-content-date">
				<view>{{$t('Start_time')}}：{{eventInfo.beginTime}}</view>
				<view>
					<image src="/static/images/home/time_icon.png"/>
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
				default: `url('/static/images/home/event_bg.png') no-repeat center center`,
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			toPage(item) {
				if(item.status!=0){
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
	.event-card {
		display: flex;
		margin: 6rpx 0 30rpx 0;
		padding: 40rpx 25rpx;
		background-size: cover!important;
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
			color: #333;
			font-size: 30rpx;
			flex: 1;
			margin-left: 17rpx;
			&-date {
				display: flex;
				justify-content: space-between;
				align-items: center;
				view:nth-child(1) {
					font-size: 18rpx;
				}
				view:nth-child(2) {
					display: flex;
					align-items: center;
					font-size: 18rpx;
					line-height: 24rpx;
					image {
						width: 24rpx;
						height: 24rpx;
						margin-right: 10rpx;
					}
				}
			}
			&-title {
				color: #333;
				padding-top: 20rpx;
				padding-bottom: 25rpx;
				font-size: 30rpx;
				text-align: center;
				border-bottom: 3rpx solid #888;
			}
			&-team {
				display: flex;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				align-items: center;
				&-left {
					font-size: 24rpx;
					text-align: left;
					width: 43%;
				}
				&-mid {
					width: 14%;
					text-align: center;
					font-size: 36rpx;
				}
				&-right{
					font-size: 24rpx;
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
	}
</style>
