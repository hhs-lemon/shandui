<template>
	<view class="share">
		<!-- <commonHead background="url('/static/images/deep_nav_bg.png') no-repeat center!important" :backIcon="true"
			:title="this.$t('My_Share')"></commonHead> -->

		<!-- <image class="share-qr" :src="qr_url" mode=""></image> -->

		<!-- <canvas canvas-id="qrcode" style="width: 354px;height: 354px;" /> -->
		<view class="share-invitation">
			<view class="Share-code">
				<view class="code-title">-{{$t('Invitation_code')}}-</view>
				<view class="code" @click="copy(activeCode)">{{activeCode}}</view>
				<view class="tip">{{$t('Your_friends_can_also_fill_in_the_invitation_code_when_registering')}}</view>
			</view>
			<view class="uqrcode">
				<uqrcode ref="uqrcode"></uqrcode>
			</view>
			<view class="share-link">{{invitation_url}}</view>
			<view class="link-copy" @click="copy(invitation_url)">{{$t('copy')}}</view>
			<!-- <uni-link :href="" :text="this.$t('Invitation_Link')+':'+this.invitation_url"
				showUnderLine="false" color="#fff" copyTips="" :showUnderLine="true"></uni-link>
			<view  class="share-invitation-copy">{{$t('copy')}}</view> -->
		</view>
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';

	export default {
		data() {
			return {
				qr_url: '/static/images/home/WechatIMG22.png',
				activeCode: '',
				invitation_url: 'http://8.129.134.121/#/pages/login/register?code='
			};
		},
		components: {
			commonHead,
		},
		onLoad() {

			uni.setNavigationBarTitle({
				title: this.$t('My_Share')
			})
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
		},
		onReady() {
			this.loadData();
		},
		methods: {
			openBrowser(url) {
				// #ifdef H5
				plus.runtime.openURL(url)
				// #endif
			},
			copy(value) {
				console.log(333, uni.setClipboardData())
				//点击{{$t('copy')}}内容的后调函数
				//uni.setClipboardData方法就是讲内容{{$t('copy')}}到粘贴板
				// API `setClipboardData` is not yet implemented
				//意思是H5端没有这个接口！！！
				if (document.execCommand) {
					let oInput = document.createElement('input');
					oInput.value = value;
					document.body.appendChild(oInput);
					oInput.select(); // 选择对象;
					document.execCommand("Copy"); // 执行浏览器{{$t('copy')}}命令
					// {{$t('copy')}}成功提示;
					uni.showToast({
						title: this.$t('Copy_successful'),
						icon: 'none',
						duration: 2000
					});
					oInput.remove()
				} else {
					uni.setClipboardData({
						data: value, //要被{{$t('copy')}}的内容
						success: function() {
							//在success中加入uni.hideToast()可以解决
							uni.hideToast({
								title: this.$t('Copy_successful'),
								duration: 2000,
								icon: 'none'
							});
							//以下就可自定义操作了~
						},
						fail: function(err) {
							console.log(44, err)
							uni.showToast({
								title: this.$t('Copy_failed'),
								duration: 2000,
								icon: 'none'
							});
						}
					});
				}
			},
			loadData() {
				var code = this.$queue.getData('user').inviteCode;
				var inviteUrl = this.$queue.getData('user').inviteUrl;
				this.activeCode = code;
				this.invitation_url = 'http://8.129.134.121/#/pages/login/register?code=' + code;
				this.$refs
					.uqrcode
					.make({
						size: 110,
						text: this.invitation_url
					})
					.then(res => {
						// 返回的res与uni.canvasToTempFilePath返回一致
						// console.log(res)
					})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.share {
		// &-qr {
		// 	width: 160rpx;
		// 	height: 160rpx;
		// 	position: absolute;
		// 	top: 50%;
		// 	left: calc(50% - 80rpx);
		// }

		&-invitation {
			margin: 37rpx 30rpx;
			font-weight: 500;
			width: 690rpx;
			height: 800rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 5rpx 0rpx rgba(0, 0, 0, 0.3);
			border-radius: 20rpx;

			.Share-code {
				text-align: center;
				margin: 30rpx auto 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #111113;
				font-size: 30rpx;

				.code-title {
					margin-top: 46rpx;
				}

				.code {
					margin-top: 40rpx;
					font-size: 60rpx;
					color: #111113;
					letter-spacing: 20rpx;
					margin-left: 20rpx;
				}

				.tip {
					font-size: 20rpx;
					color: #717171;
				}

				.share-invitation-copy {
					height: 50rpx;
					line-height: 50rpx;
					display: inline-block;
					border-radius: 30rpx;
					color: #6A32DA;
					width: 100rpx;
					font-size: 24rpx;
					border: 1rpx solid #ddd;
					text-align: center;
					background-image: linear-gradient(0, #FCFCAB, #fff);
				}
			}

			.uqrcode {
				width: 220rpx;
				margin: 50rpx auto 50rpx;
			}

			.share-link {
				margin: 40rpx auto;
				width: 502rpx;
				font-size: 24rpx;
				color: #717171;
				line-height: 44rpx;
				text-decoration: underline;
				text-align: center;
				word-break: break-all;
			}

			.link-copy {
				margin: auto;
				text-align: center;
				width: 160rpx;
				height: 50rpx;
				border: 1rpx solid #000000;
				border-radius: 25rpx;
				font-size: 24rpx;
				color: #686868;
				line-height: 50rpx;
			}
		}
	}
</style>
