<template>
	<view>
		<uni-nav-bar color="#FEFEFE" left-icon="back" backgroundColor="transparent" :title="this.$t('Message_detail')"
			@clickLeft="goBack()"></uni-nav-bar>
		<view>
			<view class="item">
				<image src="/static/images/icon/sound.png"
					style="width:50rpx;height: 50rpx; position: absolute; left:10rpx top:20rpx" />
				<view class="cell-title">[{{eventInfo.noticeTitle}}]</view>
				<view class="cell-text-right">{{eventInfo.createTime}}</view>
			</view>
			<view class="cell-content">{{eventInfo.noticeContent}}</view>
		</view>
	</view>
</template>

<script>
	import friendlyDate from '@/common/util.js';
	export default {
		data() {
			return {
				eventInfo: this.$queue.getData('eventInfo')
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		margin-top: 20rpx;
		height: 90rpx;
		width: 100%;
		display: flex;
		border-bottom: 1rpx solid #E7E7E7;
	}

	.cell-text-right {
		padding: 50rpx 70rpx;
		font-size: 18rpx;
		font-weight: bold;
		color: #999999;
	}

	.cell-title {
		padding: 5rpx 0rpx;
		position: absolute;
		left: 70rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #232323;
		line-height: 27rpx;
	}

	.cell-content {
		font-size: 24rpx;
		padding: 10rpx 0rpx 20rpx 20rpx;
		font-weight: bold;
		color: #666666;
		line-height: 36px;
	}
</style>
