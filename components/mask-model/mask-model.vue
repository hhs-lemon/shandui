<template>
	<view class="mask-model" v-show="showMask">
		<view class="mask" @click="hide"></view>
		<view class="model-count">
			<view class="amen-tit" v-if="showTip">{{$t('Hint')}}</view>
			<view class="count" :style="{'color':titleColoe}">{{maskTitle}}</view>
			<view class="btm-box">
				<view v-show="btnType==1" class="btn cancel" @click="hide" :style="{'color':cancelColor}">
					{{$t('cancel')}}</view>
				<view class="btn confirm" @click="confirm" :style="{'color':confirmColor}">{{$t('determine')}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			maskTitle: { //提示内容
				type: String,
				default: '提示消息'
			},
			showTip: { //提示内容
				type: [String, Boolean],
				default: true
			},
			titleColoe: { //提示信息字体颜色
				type: String,
				default: '#666666'
			},
			confirmColor: { //确定按钮字体颜色
				type: String,
				default: '#007AFF'
			},
			cancelColor: { //取消按钮字体颜色
				type: String,
				default: '#666666'
			},
			btnType: { //1显示取消按钮
				type: String,
				default: '1'
			}
		},
		data() {
			return {
				showMask: false,
			};
		},
		mounted() {

		},
		created() {

		},
		computed: {

		},
		methods: {
			show: function() {
				this.showMask = true;
			},
			hide: function() {
				this.$emit('cancel');
				this.showMask = false;
			},
			confirm: function(e) {
				this.showMask = false;
				this.$emit('confirm');
			},
		}
	}
</script>

<style scoped>
	.mask-model {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.mask-model .mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.65);
	}

	.model-count {
		width: 90%;
		border-radius: 20rpx;
		background: #FFFFFF;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 9;
		min-height: 360rpx;
		padding: 10rpx 0 96rpx 0;
		overflow: hidden;
	}

	.amen-tit {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		background: #FFFFFF;
		line-height: 80rpx;
	}

	.count {
		text-align: center;
		padding: 30rpx;
		font-size: 30rpx;
		color: #666666;
		max-height: 300rpx;
		overflow-y: scroll;
	}

	.btm-box {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 9;
		display: flex;
		border-top: 1px solid #F5F5F5;
	}

	.btm-box .btn {
		flex: 1;
		box-sizing: border-box;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.btm-box .btn.confirm {
		color: #007AFF;
	}

	.btm-box .btn.cancel {
		color: #666666;
		border-right: 1px solid #F5F5F5;
	}
</style>
