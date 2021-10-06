<template>
	<view class="item" @click="showContent(eventInfo.noticeContent)">
			<image src="/static/images/icon/sound.png" style="width:50rpx;height: 50rpx; position: absolute; left:10rpx"/>
			<view class="cell-title">[{{eventInfo.noticeTitle}}]</view>
			<view class='cell-text-right'>{{eventInfo.createTime}}</view>
			<view class="cell-content">{{eventInfo.noticeContent}}</view>
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
			}
		},
		methods: {
			showContent(content) {
				this.$queue.setData('eventInfo', this.eventInfo);
				console.log('eventInfo ', this.eventInfo);
				uni.navigateTo({
					url: '../notice/notice_detail',
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item
	{
		height: 114rpx;
		width: 100%;
		display: flex;
		border-bottom: 1rpx solid #E7E7E7;
	}
	.cell-text-right {
		position: absolute;
		right: 10rpx;
		font-size: 18rpx;
		font-weight: bold;
		color: #999999;
	}
	.cell-title {
		padding: 10rpx 0;
		position: absolute;
		left: 70rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #232323;
		line-height: 27rpx;
	}
	.cell-content{
		font-size: 24rpx;
		padding: 60rpx 0rpx 0rpx 80rpx;
		font-weight: bold;
		color: #A5A5A5;
		line-height: 27rpx;
		overflow: hidden;  //溢出隐藏
		text-overflow: ellipsis; //省略号
		white-space: nowrap;  //不换行
	}
</style>
