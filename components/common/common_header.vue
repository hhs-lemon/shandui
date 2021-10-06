<template>
	<view class="com-nav" :style="barHeight">
		<uni-nav-bar :background="background?background:''" :left-icon="backIcon?'back':''" :color="backColor"
			backgroundColor="transparent" @clickLeft="clickLeft" @clickRight="doService()">
			<view v-if="search" class="search">
				<u-search :focus="true"
					:inputStyle="{'color':'#000','font-size':'26rpx','font-weight':'111','line-height':'100rpx'}"
					bg-color="#fff" :placeholder="this.$t('Search_events')" shape="round" :show-action="false"
					height="50" v-model="keyword"></u-search>
			</view>
			<view v-if="title" class="nav-title" :style="titleStyle">
				<view class="title">{{title}}</view>
			</view>
			<view slot="left" class="left-icon">
				<img v-if="!backIcon" src="/static/images/home/nav_more.png" alt="">
			</view>
			<view v-if="rightBalance" slot="right" class="nav-right">
				<view class="nav-balance">
					<view class="text">{{$t('Total_assets')}}</view>
					<view class="amount">{{(money/1)|moneyFormat}}{{$t('Money_symbol')}}</view>
				</view>
			</view>
			<view v-if="rightService" slot="right" class="nav-right">
				<img class="nav-service" width="24rpx" src="/static/images/service.png" alt="">
			</view>
		</uni-nav-bar>
		<!-- 左侧栏 -->
		<navigationPage :navigation_show="navigation_show" @navigationShow="navigationShow" />
	</view>
</template>


<script>
	import navigationPage from '@/components/common/navigation-page.vue';

	export default {
		components: {
			navigationPage,
		},
		data() {
			return {
				navigation_show: false,
				username: '-',
				money: 0,
				keyword: '',
				barHeight: '',
			}
		},
		props: {
			rightBalance: {
				type: [Boolean, String],
				default: false
			},
			rightService: {
				type: [Boolean, String],
				default: false
			},
			backIcon: {
				type: [Boolean, String],
				default: false
			},
			backColor: {
				type: [String],
				default: '#FEFEFE'
			},
			search: {
				type: [Boolean, String],
				default: false
			},
			searchValue: {
				type: [String],
				default: ''
			},
			title: {
				type: [String],
				default: ''
			},
			titleStyle: {
				type: [Object],
				default: () => {
					return {
						color: "#fff"
					}
				}
			},
			background: {
				type: [String],
				default: "url('/static/images/home/nav_bg.png') no-repeat center center"
			},
		},
		watch: {
			keyword(nVal) {
				// 双向绑定值，让v-model绑定的值双向变化
				// this.$emit('input', nVal);
				// 触发change事件，事件效果和v-model双向绑定的效果一样，让用户多一个选择
				this.$emit('change', nVal);
			},
			searchValue(nVal) {
				this.keyword = nVal
			},
			'$route.path': function(to, from) {
				if (to !== from) {
					this.username = this.$queue.getData('user').username;
					this.money = this.$queue.getData('wallet').money;
				}
			}
		},
		mounted() {
			this.username = this.$queue.getData('user').username;
			this.money = this.$queue.getData('wallet').money;
			this.fixBarPos();
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			serviceAuto() {
				this.$queue.showToast(this.$t('Customer_Service'));
			},
			clickLeft() {
				if (this.backIcon) {
					history.back()
				} else {
					this.navigationShow(true)
				}
			},
			navigationShow(val) {
				console.log(val);
				this.navigation_show = val;
			},
			fixBarPos() {
				var screenHeight = uni.getSystemInfoSync().screenHeight;
				var platform = uni.getSystemInfoSync().platform;
				var isHasLiuHai = (screenHeight >= 812) && (platform == 'ios')
				if (isHasLiuHai) {
					this.barHeight = 'padding-top:' + 60 + 'rpx';
				}
			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			doService() {
				if (this.rightService) {
					this.$queue.showToast(this.$t('Access_Customer_Service'));
				}

			}
		}
	};
</script>

<style lang="scss" scoped>
	// /deep/.uni-navbar__content {
	// 	justify-content: space-between;
	// 	// background: url('/static/images/home/nav_bg.png') no-repeat center center;
	// 	background-size: cover;
	// 	border: none;
	// }
	.left-icon {
		line-height: 30rpx;
		padding-left: 20rpx;

		img {
			width: 40rpx;
		}
	}

	.nav-right {
		.nav-balance {
			width: 286rpx;
			height: 55rpx;
			line-height: 58rpx;
			background: url('/static/images/home/balance_bg.png') no-repeat center center;
			background-size: cover;
			margin-right: 220rpx;
			padding-left: 18rpx;
			color: #999;
			font-size: 14rpx;
			display: flex;
			justify-content: space-between;

			.text {
				font-size: 18rpx;
				display: inline-block;
				line-height: 60rpx;
			}

			.amount {
				color: black;
				margin-right: 13rpx;
				display: inline-block;
				line-height: 60rpx;
			}
		}

		.nav-service {
			padding-top: 24rpx;
		}
	}

	.search {
		width: 80%;
		margin-left: 32rpx;
	}

	.nav-title {
		width: 100%;

		.title {
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
