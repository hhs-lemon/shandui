<template>
	<view class="help">
		<commonHead background="url('/static/images/deep_nav_bg.png') no-repeat center!important" :backIcon="true"
			:title="this.$t('Help_Center')" :rightService = "true"></commonHead>
		<view class="logo">
			<img src="static/images/bangzhuzx/58ball-shadow.png" alt="">
		</view>
		<view class="que-list">
			<view class="que-icon">
				<img src="static/images/bangzhuzx/liebiao.png" alt="">
			</view>
			<view class="items">
				<view class="que-item" v-for="(item,i) in queList" :key="i" @click="gotoDetail(0,i)">{{item.title}}
				</view>
			</view>
		</view>
		<view class="que-list description-List">
			<view class="que-icon desc-icon">
				<img src="static/images/bangzhuzx/mingxi.png" alt="">
			</view>
			<view class="items desc-items">
				<view class="que-item desc-item" v-for="(item,i) in descList" :key="i" @click="gotoDetail(1,i)">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';

	export default {
		data() {
			return {
				queList: [{
						title: this.$t('Deposit_and_withdrawal'),
					},
					{
						title: this.$t('Anticorruption_rules'),
					},
					{
						title: this.$t('Order_process'),
					},
					{
						title: this.$t('registration_process'),
					},
				],
				descList: [{
						title: this.$t('Overview'),
					},
					{
						title: this.$t('Rules_and_terms'),
					},
				],
			};
		},
		components: {
			commonHead,
		},
		onLoad() {},
		methods: {
			gotoDetail(listId, listIndex) {
				uni.navigateTo({
					url: `help_detail/help_detail?listId=${listId}&listIndex=${listIndex}`
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	.help {
		background: #F3F4F9;
		height: 100vh;
	}

	.logo {
		width: 100%;
		height: 290rpx;
		display: flex;
		align-items: flex-end;
		justify-content: center;

		img {
			width: 200rpx;
		}
	}

	.que-list {
		color: #333333;
		font-size: 30rpx;
		background: #fff;
		display: flex;
		align-items: center;

		.que-icon {
			width: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 56rpx;
			}
		}

		.items {
			flex: 1;

			.que-item {
				display: inline-block;
				text-align: center;
				width: 50%;
				min-height: 98rpx;
				line-height: 98rpx;
				border-bottom: 1rpx solid #F3F4F8;
				border-right: 1rpx solid #F3F4F8;
			}
		}
	}

	.description-List {
		margin-top: 26rpx;
	}
</style>
