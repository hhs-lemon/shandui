<template>
	<view class="page">
		<!-- #ifndef H5 -->
		<view class="ns">{{this.$t('My_Balance')}}</view>
		<!-- #endif -->
		<view class="flexView">
			<view class="scrollView">
				<view class="head-read">
					<view class="flex">
						<image @click="navTo('../user/info')" class="read-img" :src="headimgurl" mode="aspectFill" />
						<view @click="navTo('../user/info')" class="flex-box">
							<view class="flex-box-text Uname">{{this.$t('username')}}：{{ username }}</view>
							<view class="flex-box-text Uid">ID：{{ id }}</view>
						</view>
						<view class="arrow arrow-one" @click="showModal = true"><span>{{this.$t('Precautions')}}</span>
						</view>
					</view>
				</view>
				<view class="white-box">
					<view class="tx">
						<view class="tx-grid">
							<view class="tx-grid-text" @click="navTo('../list/wallet_list')">
								<view class="title">{{this.$t('Withdrawable_balance')}}</view>
								<view class="money">
									<text>{{ (money/1)|moneyFormat }}</text>
									<text class="money-b">{{this.$t('Money_symbol')}}</text>
								</view>
							</view>
						</view>
						<view class="tx-grid" @click="navTo('/pages/withdraw/index')"><span
								class="tx-grid-comm-sign">{{this.$t('withdraw')}}</span></view>
					</view>
					<!--
					<view class="palace palace-one">
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{(withdraw_going/100).toFixed(0)}}</text>
									<text class="palace-grid-text-data-b">{{this.$t('yuan')}}</text>
								</view>
								<view class="palace-grid-text-name">{{this.$t('Coming_soon')}}</view>
							</view>
						</view>
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{ (withdraw_amount/100).toFixed(0) }}</text>
									<text class="palace-grid-text-data-b">{{this.$t('yuan')}}</text>
								</view>
								<view class="palace-grid-text-name">累计金额</view>
							</view>
						</view>
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{withdraw_num}}</text>
									<text class="palace-grid-text-data-b">笔</text>
								</view>
								<view class="palace-grid-text-name">累计笔数</view>
							</view>
						</view>
					</view>
					-->
				</view>
				<view class="list-view" v-if="!isEmpty">
					<view class="list-item" v-for="(item, index) in list" :key="index" hover-class="hover"
						:hover-stay-time="150" bindtap="detail">
						<view class="content-box">
							<view class="des-box">
								<view class="source" v-if="item.status==1" :style="{color:'#4caf50'}">
									{{$t('Withdraw_successfully')}}
								</view>
								<view class="source" v-if="item.status==1" :style="{color:'#4caf50'}">
									{{$t('Actual_arrival')}}:{{(item.realAmount/1).toFixed(0)}}{{$t('yuan')}},
									{{$t('Handling_Fee')}}{{((item.amount-item.realAmount)).toFixed(0)}}{{$t('yuan')}}
								</view>
								<view class="source" v-else-if="item.status==0" :style="{color:'#00b7ff'}">
									{{$t('Withdrawal_in_process')}}，{{$t('It_should_be_in_the_account')}}:{{ (item.realAmount).toFixed(0)}}{{$t('yuan')}}
								</view>
								<view class="source" v-else :style="{color:'#ff1e0f'}">{{$t('Withdrawal_failed')}}
								</view>
								<view @click="copy(item.serialId)" class="tit">{{$t('order_number')}}:{{item.serialId }}
								</view>
								<view class="time">{{ item.createTime }}</view>
							</view>
						</view>
						<view class="money">{{(item.amount).toFixed(0)}}{{$t('Money_symbol')}}</view>
					</view>
				</view>
				<view class="empty" v-if="isEmpty"></view>
				<view class="loading-status">{{loading_status}}</view>
				<view class="tip">{{this.$t('Only_display_the_records_in_the_last_month')}}</view>
			</view>
			<view class="cu-modal" :class="showModal ? 'show' : ''" @tap="showModal = false">
				<view class="cu-dialog" @click.stop="">
					<view>
						<view class="title bg-white">
							<view class="content-title">{{this.$t('Precautions')}}</view>
						</view>
						<view class="u-p-t-10" style="width: 310rpx; margin: auto;">
							<view class="">{{this.$t('All_amounts_are_in_RMB')}}</view>
						</view>
					</view>
					<view @tap="showModal = false" class="confirm-btn">{{this.$t('determine')}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiTabs from '@/components/tui-tabs/tui-tabs';
	export default {
		components: {
			tuiTabs
		},
		data() {
			return {
				page: 1,
				toLoad: true,
				pageSize: 20,
				headimgurl: '/static/images/user/avatar.jpg',
				loading_status: this.$t('Loading'),
				is_withdraw: false,
				list: [],
				username: '-',
				money: 0,
				id: '-',
				showModal: false,
				withdraw_num: 0,
				withdraw_going: 0,
				withdraw_amount: 0,
				isEmpty: false,
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('Withdrawals_record')
			})
			this.page = 1;
			this.$api.loading(true);
			this.loadData();
			this.getRecord();
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
		},
		onReachBottom() {
			if (this.toLoad) {
				this.page += 1;
				this.getRecord();
			}
		},
		methods: {
			copy(value) {
				console.log(333, uni.setClipboardData())
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: this.$t('copy'),
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
			getRecord() {
				this.$Request
					.post('/app/withdraw/record', {
						"pageNum": this.page,
						"pageSize": this.pageSize,
						isAsc: 'desc',
						orderByColumn: 'id',
					})
					.then(res => {
						if (res.code == 0) {
							if (!res.rows.length) {
								this.loading_status = this.$t('download_finished');
								this.toLoad = false;
								if (this.list.length == 0) {
									this.isEmpty = true
								}
								return;
							}
							if (res.rows.length < this.pageSize) {
								this.toLoad = false;
								this.loading_status = this.$t('download_finished');
							}
							this.withdraw_num = res.total;
							this.withdraw_amount = res.sumMoney;
							this.list = this.list.concat(res.rows);
							var item = this.list[0];
							if (item.status == 0) {
								this.withdraw_going = item.amount;
							}
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			async loadData() {
				var user = this.$queue.getData('user');
				this.id = user.userId;
				this.username = user.username;
				this.money = this.$queue.getData('wallet').money;
				console.log('init...');
				//this.getRecord();
			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			}
		},
		onPullDownRefresh() {
			this.loadData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #eee;
	}

	.ns {
		width: 100%;
		height: 60px;
		text-align: center;
		line-height: 200rpx;
		color: white;
		font-size: 34rpx;
		font-weight: bold;
		background: linear-gradient(to right, #ff8440, #ff1e0f);
	}

	.top {
		margin-top: 20rpx;
	}

	.flexView {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		.scrollView {
			width: 100%;
			height: 100%;
			flex: 1;
			overflow-y: auto;
			overflow-x: hidden;
			position: relative;
			padding-bottom: 116rpx;

			.head-read {
				height: 250rpx;
				background: linear-gradient(to right, #81A8F7, #3362D9);
				margin: 0 30rpx 0 30rpx;
				background-color: #ff8440;
				padding-bottom: 100rpx;
				border-radius: 0 0 20rpx 20rpx;


				.flex {
					display: flex;
					align-items: center;
					padding: 50rpx;
					position: relative;

					.read-img {
						width: 90rpx;
						height: 90rpx;
						border-radius: 100%;
						overflow: hidden;
						margin-right: 20rpx;
						border: 4rpx solid rgba(255, 255, 255, 0.3);
					}

					.flex-box {
						flex: 1;
						min-width: 0;
						font-size: 26rpx;
						color: #333;

						&-text {
							margin: 10rpx 0;
							color: #f5f5f5;
							font-weight: normal;
						}

						.Uname {
							font-size: 30rpx;
						}

						.Uid {
							font-size: 24rpx;
						}
					}

					.arrow {
						position: relative;
						padding-right: 30rpx;

						span {
							font-size: 28rpx;
							color: white;
						}

						&:after {
							content: ' ';
							display: inline-block;
							height: 12rpx;
							width: 12rpx;
							border-width: 4rpx 4rpx 0 0;
							border-color: #848484;
							border-style: solid;
							transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
							position: relative;
							top: -4rpx;
							position: absolute;
							top: 50%;
							margin-top: -8rpx;
							right: 4rpx;
							border-radius: 2rpx;
						}
					}

					.arrow-one:after {
						border-color: white;
						margin-top: -6rpx;
					}
				}
			}

			.white-box {
				position: absolute;
				z-index: 100;
				width: 660rpx;
				min-height: 120rpx;
				left: 45rpx;
				margin-top: -64rpx;
				background: white;
				border-radius: 10rpx;
				box-shadow: 0 6rpx 20rpx #e7e7e7;


				.tx {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 14rpx;

					&-grid {
						box-sizing: border-box;

						&:first-child {
							margin-left: 40rpx;
						}

						&-comm-sign {
							display: block;
							border-radius: 40rpx 0 0 40rpx;
							font-size: 24rpx;
							padding: 16rpx 44rpx;
							background: linear-gradient(to right, #EC6DFF, #FFED25);
							color: #fff;
						}

						&-text {
							display: block;
							color: #333;
							font-size: 26rpx;

							.title {
								display: inline-block;
								font-size: 24rpx;
								font-weight: normal;
								color: #333333;
							}

							.money {
								font-size: 36rpx;
								color: #333333;
								margin-top: 18rpx;
								padding-left: 0;
								max-width: 400rpx;
								letter-spacing: 2rpx;
								word-wrap: break-word;

								&-b {
									font-size: 28rpx;
								}
							}
						}
					}
				}

				.palace {
					padding-bottom: 20rpx;
					overflow: hidden;
					display: flex;
					justify-content: center;

					&-grid {
						flex: 1;
						position: relative;
						box-sizing: border-box;

						&:not(:last-child) {
							&:after {
								width: 1rpx;
								height: 80rpx;
								background: #fddece;
								content: ' ';
								display: inline-block;
								position: absolute;
								top: 0;
								right: 0;
							}
						}

						&-text {
							display: block;
							text-align: center;
							color: #333;
							font-size: 32rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;

							&-name {
								font-size: 26rpx;
								font-weight: normal;
								color: #ff8a4a;
							}

							&-data {
								font-size: 32rpx;
								color: #ff8a4a;
								letter-spacing: 2rpx;
								margin-bottom: 5rpx;

								&-b {
									font-size: 20rpx;
								}
							}
						}
					}
				}
			}
		}
	}

	.list-view {
		z-index: 10;
		position: relative;
		overflow: hidden;
		margin: 20rpx 30rpx 0;
		border-radius: 10rpx 10rpx 0 0;
	}

	.list-item {
		width: 100%;
		padding: 30rpx 28rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		border-bottom: 1rpx solid #eaeef1;
	}

	.list-item:first-child {
		padding: 40rpx 22rpx 20rpx;
		height: 280rpx;
	}

	.item-last::after {
		left: 0 !important;
	}

	.content-box {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		max-width: 400rpx;
	}

	.des-box {
		min-height: 80rpx;
		padding-left: 28rpx;
		box-sizing: border-box;
		vertical-align: top;
		color: #333;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tit {
		font-size: 26rpx;
		max-width: 420rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.source {
		margin: 10rpx 0rpx;
	}

	.time {
		color: #888;
	}

	.money {
		font-size: 38rpx;
		font-weight: 500;
		color: #ff1e0f;
		padding-left: 20rpx;
		word-break: break-word;
	}

	.less {
		color: #4caf50 !important;
	}

	.tip {
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
		align-content: center;
		font-size: 24rpx;
		color: #888;
	}

	.loading-status {
		width: 100%;
		padding: 20rpx 0;
		font-size: 28rpx;
		color: #999;
		text-align: center;

	}

	.empty {
		height: 328rpx;
		width: 750rpx;
		margin-top: 150rpx;
		background: url('/static/images/empty-data.png') no-repeat center center;
		background-size: 100% 100%;
	}

	.cu-dialog {
		background: #fff;
		width: 450rpx;
		height: 250rpx;
		border-radius: 20rpx;

		.title {
			margin-top: 20rpx;
		}

		.content-title {
			color: #FF5757;
			font-size: 36rpx;
			margin: auto;
		}

		.confirm-btn {
			color: #6997FF;
			font-size: 36rpx;
			line-height: 58rpx;
			height: 60rpx;
			width: 100%;
			position: absolute;
			bottom: 0;
			border-top: 1rpx solid #ccc;
		}

		.confirm-btn:active {
			background-color: #eee;
		}
	}
</style>
