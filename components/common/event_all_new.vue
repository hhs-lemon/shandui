<template>
	<view class="event-card" :style="{'background': background}" @click="toPage(eventInfo)">
		<view class="event-card-content">
			<img v-if="eventInfo.guaranteed" src="/static/images/baoben.png" alt="" class="baoben">
			<div v-if="eventInfo.guaranteed" class="bao-ben-text">{{$t('Guaranteed')}}</div>
			<view class="event-card-content-date">
				<view>
					<image src="/static/images/home/time_icon_left.png" />
					<view>{{eventInfo.beginTime}}</view>
				</view>
				<view>
					<image src="/static/images/home/time_icon.png" />
					<view v-if='eventInfo.status==1'>已开赛</view>
					<view v-if='eventInfo.status==0'>{{eventInfo.diffTime}}</view>
				</view>
			</view>
			<view class="event-card-content-title">{{eventInfo.leagueName}}</view>
			<view class="event-card-content-team">
				<view class="event-card-content-team-left">
					<view>{{eventInfo.homeName}}</view>
					<view>{{eventInfo.awayName}}</view>
				</view>
				<view class="event-card-content-team-right">
					<image src="/static/images/home/Vector.png" />
				</view>
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
				default: ``,
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
	.event-card {
		position: relative;
		display: flex;
		width: 100%;
		height: 200rpx;
		// margin: 6rpx 0 30rpx 0;
		margin-top: 32rpx;
		// padding: 15rpx 25rpx;
		// background-size: cover !important;
		border: 1px solid #1FFDFA;
		background: #0A1E46;
		border-radius: 20rpx;
		padding: 0rpx 20rpx;

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

			&-date {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 22rpx;
				view{
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #5F7099;
					image {
						width: 34rpx;
						height: 34rpx;
						margin-right: 6rpx;
					}
				}
			}

			&-title {
				font-family: Roboto;
				color: #1FFDFA;
				padding: 14rpx 0;
				font-size: 24rpx;
				text-align: center;
				text-align: left;
			}

			&-team {
				display: flex;
				align-items: center;
				justify-content: space-between;
				&-left {
					color: #BACEF1;
					font-family: Roboto;
					font-size: 28rpx;
					font-weight: 700;
					text-align: left;
					view{
						position: relative;
						padding-left: 32rpx;
						width: auto;
						line-height: 36rpx;
						&::before{
							position: absolute;
							content: '';
							width: 16rpx;
							height: 16rpx;
							border-radius: 50%;
							background: #BACEF1;
							left: 0;
							top: 50%;
							margin-top: -8rpx;
						}
					}
				}
				&-right {
					margin-right: 32rpx;
					image{
						width: 54rpx;
						height: 54rpx;
					}
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

		.baoben {
			position: absolute;
			width: 130rpx;
			left: 0;
			top: 0;
		}

		.bao-ben-text {
			text-align: center;
			width: 100rpx;
			position: absolute;
			left: -2rpx;
			top: 20rpx;
			transform: rotate(-1.1turn);
			color: #fff;
			font-size: 24rpx;
		}
	}
</style>
