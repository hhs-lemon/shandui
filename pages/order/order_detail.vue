<template>
	<view class="user">
		<!-- <uni-nav-bar color="#FEFEFE" left-icon="back" backgroundColor="transparent" @clickLeft="goBack()"
			:title="this.$t('Betting_details')"></uni-nav-bar> -->
		<commonHead :backIcon="true" :title="this.$t('Betting_details')"></commonHead>
		<mask-model ref="withdraw" btnType="1" @confirm="confirm" @cancel="cancel" titleColoe="#ff6666"
			cancelColor="#666666" confirmColor="#007AFF" :maskTitle="maskTitle"></mask-model>
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell" @click="matchSearch(item.homeName)">
					<view @click="copy(item.homeName)" class="cell-left">

						<view class="cell-text">{{$t('Home_Team')}}:</view>
						<view class="cell-text-right">{{item.homeName}}</view>
					</view>
					<view style="color: red;" @click="matchSearch(item.homeName)" class="iconfont iconmore1"></view>
				</view>
				<view class="cell" @click="matchSearch(item.awayName)">
					<view @click="copy(item.awayName)" class="cell-left">

						<view class="cell-text">{{$t('Away_Team')}}
							:</view>
						<view class="cell-text-right">{{item.awayName}}</view>
					</view>
					<view style="color: red;" @click="matchSearch(item.awayName)" class="iconfont iconmore1">
					</view>
				</view>
				<view class="cell" @click="matchSearch(item.leagueName)">
					<view @click="copy(item.leagueName)" class="cell-left">

						<view class="cell-text">{{$t('alliance')}}:</view>
						<view class="cell-text-right">{{item.leagueName}}</view>
					</view>
					<view style="color: red;" @click="matchSearch(item.leagueName)" class="iconfont iconmore1"></view>
				</view>
			</view>
		</view>
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('Anticorruption')}}
							：</view>
						<view class="cell-text-right">{{item.cutLine}}</view>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('half')}}
							/{{$t('Full_audience')}}
							：</view>
						<view class="cell-text-right" v-if="item.isHalf==1">{{$t('Half_Time')}}
						</view>
						<view class="cell-text-right" v-else>{{$t('Full_audience')}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="com-item">
			<view class="com-wrap">
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('Bet_Amount')}}
							：</view>
						<view class="cell-text-right">{{(item.money).toFixed(0)}}{{this.$t('yuan')}}</view>
					</view>
					<view v-if="this.status==0" @click="matchContentSearch(item.matchId)"
						class="iconfont iconicon_im_more" style="position: absolute;right: 5%;"></view>
				</view>
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('rate_of_return')}}
							：</view>
						<view class="cell-text-right">{{item.oddPercent}}%</view>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('Handling_Fee')}}：</view>
						<view class="cell-text-right">{{(tax).toFixed(0)}}{{this.$t('yuan')}}</view>
					</view>
				</view>
				<view class="cell">
					<view @click="earnNotice()" class="cell-left">

						<view class="cell-text">{{$t('Estimated_Earnings')}}
							：</view>
						<view class="cell-text-right">{{(earn).toFixed(0)}}{{this.$t('yuan')}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="com-item">
			<view class="com-wrap">
				<view @click="copy(item.serialId)" class="cell">
					<view class="cell-left">

						<view class="cell-text">{{this.$t('order_number')}}:</view>
						<view class="cell-text-right">{{item.serialId}}</view>
					</view>
					<view style="color: red;" class="iconfont iconmore1"></view>
				</view>
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('Start_time')}}
							:</view>
						<view class="cell-text-right">{{item.beginTime}}</view>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('Betting_Time')}}
							:</view>
						<view class="cell-text-right">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="com-item">
			<view class="com-wrap">
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('Event_Results')}}
							:</view>
						<view class="cell-text-right">{{score}}</view>
					</view>
				</view>
				<view class="cell">
					<view class="cell-left">

						<view class="cell-text">{{$t('Earn')}}/{{$t('deficit')}}
							:</view>
						<view v-if="item.earn===1" class="cell-text-red">{{result}}</view>
						<view v-else class="cell-text-green">{{result}}</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="item.status==0" class="com-item">
			<view class="com-wrap">
				<view class="cell" @click="withdrawConfirm">
					<view class="cell-left">

						<view class="cell-text">{{$t('Cancel_this_bet')}}
						</view>
					</view>
					<view class="iconfont"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import maskModel from '../../components/mask-model/mask-model.vue'
	import commonHead from '@/components/common/common_header.vue';
	export default {
		components: {
			commonHead,
			maskModel
		},
		data() {
			return {
				maskTitle: this.$t('Whether_to_cancel_this_bet'),
				token: '',
				id: '-',
				item: {
					'money': 0
				},
				tax: 0,
				score: this.$t('Unstarted'), //最终比分
				result: 0, //{{this.$t('Profit_and_Loss')}}
				earn: 0, //{{$t('Estimated_Earnings')}}
				status: 1, //0是可以加注 1 是已经结算

			};
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: this.$t('Betting_details')
			})
			this.id = option.id;
			console.log(option.id);
			this.$Request
				.post('/app/sports/orderItemInfo', {
					id: option.id
				})
				.then(res => {
					if (res.code == 0) {
						this.item = res.data;
						this.tax = res.data.money * res.data.oddPercent / 100 * res.data.ratio / 100;
						var earn = res.data.money * res.data.oddPercent / 100 * (100 - res.data.ratio) / 100;
						this.earn = earn;
						this.status = res.data.status;
						if (res.data.status == 1) {
							var score = '' + res.data.homeScore + '-' + res.data.awayScore;
							this.score = score;
							if (res.data.cutLine == score) {
								this.result = '-' + (res.data.money).toFixed(0) + this.$t('yuan');
							} else {
								this.result = '+' + (earn).toFixed(0) + this.$t('yuan');
							}
						}
					} else {
						this.$queue.showToast(res.message);
					}
				})
				.catch(res => {});
		},
		methods: {

			copy(value) {
				console.log(333, uni.setClipboardData())
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: this.$t('Copy_content'),
					success: () => { //点击复制内容的后调函数
						//uni.setClipboardData方法就是讲内容复制到粘贴板
						// API `setClipboardData` is not yet implemented
						//意思是H5端没有这个接口！！！
						if (document.execCommand) {
							let oInput = document.createElement('input');
							oInput.value = value;
							document.body.appendChild(oInput);
							oInput.select(); // 选择对象;
							document.execCommand("Copy"); // 执行浏览器复制命令
							// 复制成功提示;
							uni.showToast({
								title: this.$t('Copy_successful'),
								icon: 'none',
								duration: 2000
							});
							oInput.remove()
						} else {
							uni.setClipboardData({
								data: value, //要被复制的内容
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
					}
				});
			},
			earnNotice() {
				uni.showToast({
					title: this.$t('Handling_Fee_formula'),
					duration: 2000,
					icon: 'none'
				});

			},
			matchSearch(searchValue) {
				uni.reLaunch({
					url: '../match/match_list?searchValue=' + searchValue,
				});
			},
			matchContentSearch(searchValue) {
				uni.navigateTo({
					url: '../match/match_content?id=' + searchValue,
				});
			},

			confirm() { //确定按钮
				this.orderWithdraw();
			},
			cancel() { //取消按钮
			},
			withdrawConfirm() { //打开询问弹窗
				this.$refs.withdraw.show();
			},
			goBack() {
				uni.reLaunch({
					url: '../list/order_list',
				});
			},
			init() {
				var token = this.$queue.getData('token');
				//没有token就去登录页面
				if (!token) {
					uni.reLaunch({
						url: '../login/login',
					});

				}
			},
			orderWithdraw() {
				this.$Request
					.post('/app/sports/withdraw', {
						id: this.id
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Revocation_successful'));
						} else {
							this.$queue.showToast(res.message);
						}
					}).catch(res => {});
			},
			goBankCard() {
				console.log('bankcard');
				uni.navigateTo({
					url: '../user/bankcard'
				});
			}
		}
	};
</script>

<style lang="scss">
	/deep/.uni-navbar__content {
		justify-content: space-between;
		background: url('/static/images/home/nav_bg.png') no-repeat center center;
		background-size: cover;
		border: none;
	}

	page {
		background: #f2f2f2;
	}

	.btn-hover {
		background: #f2f2f2 !important;
	}

	.user {
		background: #F0F0F0;

		.user-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50vw;
			padding: 30rpx;
			z-index: 9;
			border-radius: 0 0 20% 20%;
			background-size: cover;

			.setting {
				color: #fff;
				position: absolute;
				top: 60rpx;
				right: 60rpx;
				font-size: 50rpx;
			}

			.info {
				position: absolute;
				left: 60rpx;
				text-align: center;

				.avatar {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}

				.nickname {
					color: #fff;
					font-size: 28rpx;
				}
			}
		}

		.com-item {
			padding-left: 20rpx;
			padding-right: 20rpx;
			margin-top: 20rpx;

			.com-wrap {
				border-radius: 25rpx;
				overflow: hidden;
			}
		}

		.cell {
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #FFFFFF;
			border-bottom: 1px solid #cfbfbf;

			&:active {
				background: #f2f2f2;
			}

			&:last-child {
				border-bottom: none !important;
			}

			.cell-left {
				display: flex;
				align-items: center;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #333333;
					font-size: 24rpx;
					padding-left: 38rpx;
				}

				.cell-text-right {
					color: #a6a6a6;
					font-size: 24rpx;
					position: absolute;
					right: 10%;
					padding-right: 0%;
				}

				.cell-text-red {
					color: red;
					margin-right: 10rpx;
					font-size: 30rpx;
					position: absolute;
					right: 10%;
					padding-right: 0%;
				}

				.cell-text-green {
					color: blue;
					margin-right: 10rpx;
					font-size: 30rpx;
					position: absolute;
					right: 10%;
					padding-right: 0%;
				}
			}

			.pngfont {
				font-size: 30rpx;
				color: red;
			}
		}
	}
</style>
