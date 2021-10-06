<!--
 * @Author: your name
 * @Date: 2021-01-01 16:29:32
 * @LastEditTime: 2021-02-25 16:18:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\pages\list\wallet_list.vue
-->

<template>
	<view class="card-list-page">
		<commonHead background="url('/static/images/deep_nav_bg.png') no-repeat center!important" :backIcon="true"
			:title="this.$t('Bank_card_list')"></commonHead>
		<mask-model ref="delPop" btnType="1" @confirm="del" @cancel="cancel" titleColoe="#ff6666" cancelColor="#666666"
			confirmColor="#007AFF" :maskTitle="maskTitle"></mask-model>
		<view class="flexView">
			<view class="scrollView">
				<view class="list-view">
					<view class="list-item" v-for="(item, index) in list" :key="index" hover-class="hover"
						:hover-stay-time="150" bindtap="detail">
						<view class="content-box">
							<view class="des-box">
								<view @click="copy(item.bankName)" class="tit">{{item.bankName}}
								</view>
								<view @click="copy(item.cardHolder)" class="tit1">{{$t('Name')}}
									：{{ item.cardHolder}}</view>
								<!-- <view class="time">{{$t('Update_time')}}:{{ item.createTime}}</view> -->
							</view>
						</view>
						<view class="source">
							<view @click="copy(item.cardNo)">
								<span class="card-no">{{item.cardNo.slice(0,4)}}</span>
								<span class="card-no">{{item.cardNo.slice(4,8)}}</span>
								<span class="card-no">{{item.cardNo.slice(8,12)}}</span>
								<span class="card-no">{{item.cardNo.slice(12,16)}}</span>
							</view>
						</view>
						<view class="money" @click="delConfirm(item.id)">{{$t('delete')}}</view>
					</view>
					<view class="add-card" @click="fabClick">
						<u-icon name="plus" size="30"></u-icon>
						<view class="text">{{$t('Add_Bank_Card')}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="uni-fab-box">
			<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="trigger" @fabClick="fabClick" />
		</view> -->
		<!-- 添加银行卡 -->
		<u-popup v-model="showAdd" mode="center" width="100%" height="100%" :closeable="true" close-icon-pos="top-left">
			<view class="pop-add">
				<view class="add-title">{{$t('Add_Bank_Card')}}</view>
				<view class="add-tip">{{$t('Please_bind_the_cardholders_own_bank_card')}}</view>
				<view class="add-tip">{{$t('The_real_name_of_the_bank_card_cannot_be_changed_once_it_is_set')}}</view>
				<view class="items">
					<view class="item">
						{{$t('username')}}
						<u-input class="uname" :disabled="!cardInput" v-model="cardHolder" placeholder=""></u-input>
					</view>
					<view class="select-card" @tap="selectBankCardList">
						<view class="left-name">
							<view class="card-title">{{$t('Owned_Bank')}}</view>
							<view class="card-name-type">
								<view class="way-text">
									<view class="card-name">
										{{bankCard}}
										<span style="display: inline-block;width: 30rpx;"></span>
										<!-- {{bankCard.type}} -->
									</view>
								</view>
							</view>
						</view>
						<u-icon class="arrow-right" name="arrow-right" color="#969799" size="28"></u-icon>
					</view>
					<view class="item">
						{{$t('Bank_Account')}}
						<u-input class="uCard" height="78" input-align="center" v-model="cardNo"
							:placeholder="$t('Card_holders_bank_card_number')">
						</u-input>
					</view>
					<view class="item">
						{{$t('Bank_Branch')}}
						<u-input class="uCard" height="78" v-model="branchName" input-align="center"
							:placeholder="$t('Please_enter_the_name_of_the_bank_branch')"></u-input>
					</view>
				</view>
				<button :disabled="!cardNo" class="next" :class="cardNo?'btn-active':''"
					@click="onConfirmAdd">{{$t('determine')}}</button>
			</view>
			<!-- 选择银行 -->
			<u-popup class="" height="850" v-model="showCardList" mode="bottom" border-radius="14">
				<view class="cards-pop cards">
					<scroll-view :scroll-y="true" class="card-list cards-list">
						<view class="card" v-for="(item,i) in bankCardList" :key="i" @click="selectBandCard(i)">
							<view class="left">
								<img src="/static/images/money.png" alt="" class="card-icon">
								<view class="card-name">
									{{item}}
									<span style="display: inline-block;width: 30rpx;"></span>
									<!-- {{item.type}} -->
								</view>
							</view>
							<u-icon v-if="i===selectingBankCard" color="#8D9DFE" class="checkmark" name="checkmark"
								size="34">
							</u-icon>
						</view>
					</scroll-view>
					<button class="confirm-btn select-card-btn" type="primary"
						@click="onConfirm1">{{ $t('determine') }}</button>
				</view>
			</u-popup>
		</u-popup>
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';
	
	export default {
		components: {
			commonHead
		},
		data() {
			return {
				showAdd: false,
				maskTitle: this.$t('Whether_to_delete_this_bank_card'),
				directionStr: this.$t('vertical'),
				horizontal: 'left',
				del_id: -1000,
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
				},
				content: [],
				list: [],
				username: '-',
				money: 0,
				id: '-',
				showModal: false,
				withdraw_num: 0,
				withdraw_going: 0,
				withdraw_amount: 0,
				date: 'incomeMonth',
				currentTab: 0,
				cardInput: true,
				cardHolder: '',
				branchName: '',
				cardInput: true,
				cardNo: '',
				showSelect: false,
				showCardList: false,
				bankCard: '-',
				bankCardList: [
					this.$t('Vietinbank'),
					this.$t('ACB'),
					this.$t('Agribank'),
					this.$t('An_Binh_Bank'),
					this.$t('Bao_Viet_Bank'),
					this.$t('BIDV'),
					this.$t('CBBank'),
					this.$t('CIMB_Bank'),
					this.$t('DongA_Bank'),
					this.$t('Eximbank'),
					this.$t('GPBank'),
					this.$t('HDBank'),
					this.$t('Hong_Leong_Bank'),
					this.$t('HSBC_Bank'),
					this.$t('Indovina_Bank'),
					this.$t('KienLongBank'),
					this.$t('LienVietPostBank'),
					this.$t('Military_Bank'),
					this.$t('MSB'),
					this.$t('Nam_A_Bank'),
					this.$t('NCB_National_Bank'),
					this.$t('ANZ_Bank_Vietnam'),
					this.$t('Vietnamese_Bank'),
					this.$t('Vietnam_Development_Bank'),
					this.$t('VIB_International_Bank'),
					this.$t('Pioneer_Bank'),
					this.$t('UOB_Bank'),
					this.$t('Orient_Commercial_Bank'),
					this.$t('Petrolimex_Group_Bank'),
					this.$t('PVcombank'),
					this.$t('Sacombank'),
					this.$t('Saigon_Commercial_Joint_Stock_Bank'),
					this.$t('Saigonbank'),
					this.$t('SeABank'),
					this.$t('SHBank'),
					this.$t('Shinhan_Bank'),
					this.$t('Techcombank'),
					this.$t('Viet_A_Bank'),
					this.$t('Vietnam_Prosperity'),
					this.$t('VietBank_Vietnam_Thuong_Tin_Commercial_Joint_Stock_Bank'),
					this.$t('Vietcombank'),
					this.$t('Woori_Bank'),
				],
				selectingBankCard: 0,
			};
		},
		watch: {
			cardNo(cardNo) {
				if (cardNo) {
					this.showSelect = true
				} else {
					this.showSelect = false
				}
			},
		},
		onBackPress() {
			if (this.$refs.fab && this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('Bank_card_list')
			});
			var realName = this.$queue.getData('realname')
			if (realName) {
				this.cardHolder = realName;
				this.cardInput = false;
			}
			this.bankCard = this.bankCardList[0]
		},
		onShow() {
			this.$api.loading(true);
			this.getRecord();
			setTimeout(() => {
				this.$api.loading(false);
			}, 500)
		},
		methods: {
			delConfirm(id) {
				console.log(id);
				this.del_id = id;
				this.$refs.delPop.show();
			},
			cancel() {},
			del() {
				this.$Request
					.post('/app/bankcard/del', {
						id: this.del_id
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('successfully_deleted'));
							this.list = [];
							this.getRecord();
						} else {
							this.$queue.showToast(this.$t('failed_to_delete'));
						}
					})
					.catch(res => {});
			},
			copy(value) {
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
			trigger(e) {},
			fabClick() {
				if (this.list.length >= 5) {
					uni.showToast({
						title: this.$t('You_can_only_add_at_most'),
						icon: 'none'
					})
					return;
				}
				// uni.navigateTo({
				// url: './bankcard_add',
				// });
				this.showAdd = true
			},
			getRecord() {
				this.$Request
					.post('/app/bankcard/list', {
						"pageNum": 0,
						"pageSize": 20,
						isAsc: 'desc',
						orderByColumn: 'createTime',
					})
					.then(res => {
						console.log(55, res);
						if (res.code == 0) {
							this.list = res.rows;
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			onConfirmAdd() {
				this.$queue.showLoading(this.$t('saving'));
				this.$Request
					.post('/app/bankcard/add', {
						cardNo: this.cardNo,
						cardHolder: this.cardHolder,
						// pwd: this.pwd,
						bankName: this.bankCard,
						branchName: this.branchName,
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Added_successfully'));
							this.$queue.setData('realname', this.cardHolder);
							// uni.navigateBack({
							// 	delta: 1
							// });
							this.cardNo = ''
							this.branchName = ''
							this.showCardList = false
							this.showAdd = false
							this.getRecord()
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			selectBankCardList() {
				this.showCardList = true
			},
			onConfirm1() {
				this.bankCard = this.bankCardList[this.selectingBankCard];
				this.showCardList = false
			},
			selectBandCard(i) {
				this.selectingBankCard = i
			},
		}
	};
</script>

<style lang="scss" scoped>
	.card-list-page {
		background-color: #eee;
		height: 100vh;
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
				background: linear-gradient(to right, #ff8440, #ff1e0f);
				background-color: #ff8440;
				padding-bottom: 100rpx;

				.flex {
					display: flex;
					align-items: center;
					padding: 50rpx;
					position: relative;

					.read-img {
						width: 120rpx;
						height: 120rpx;
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
				width: 94%;
				background: white;
				border-radius: 10rpx;
				margin: -120rpx auto 20rpx;
				box-shadow: 0 6rpx 20rpx #e7e7e7;

				.tx {
					padding-top: 26rpx;
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					align-content: center;

					&-grid {
						box-sizing: border-box;

						&:first-child {
							margin-left: 40rpx;
						}

						&-comm-sign {
							display: block;
							border-radius: 40rpx 0 0 40rpx;
							font-size: 26rpx;
							padding: 16rpx 44rpx;
							background: linear-gradient(to right, #fef082, #ffc551);
							background-color: #fef082;
							color: #cf4400;
						}

						&-text {
							display: block;
							color: #333;
							font-size: 26rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;

							.title {
								font-size: 26rpx;
								font-weight: normal;
								color: #ff6423;
							}

							.money {
								font-size: 60rpx;
								color: #ff6423;
								letter-spacing: 2rpx;
								margin-bottom: 10rpx;

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
		position: relative;
		width: 100%;
		padding: 0 30rpx 30rpx;
		overflow: hidden;
		color: #fff;
	}

	.list-item {
		font-size: 30rpx;
		border-radius: 10px;
		width: 100%;
		height: 245rpx;
		padding: 24rpx 60rpx 24rpx 112rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
		background: #376CB4;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
	}

	.item-last::after {
		left: 0 !important;
	}

	.content-box {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.des-box {
		min-height: 80rpx;
		box-sizing: border-box;
		vertical-align: top;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tit {
		font-size: 30rpx;
		max-width: 420rpx;
	}

	.tit1 {
		font-size: 24rpx;
		color: #BCD6F9;
		margin: 5rpx 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.source {
		position: absolute;
		width: 564rpx;
		top: 162rpx;

		.card-no {
			font-size: 32rpx;
			margin-right: 32rpx;
		}
	}

	.time {}

	.money {
		font-size: 30rpx;
		font-weight: 500;
		color: #fff;
		white-space: nowrap;
		padding-left: 20rpx;
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

	.add-card {
		background: #fff;
		font-size: 30rpx;
		margin-top: 30rpx;
		color: black;
		border-radius: 20rpx;
		padding: 30rpx;
		height: 160rpx;
		display: flex;
		align-items: center;
	}

	.pop-add {
		color: #333;
		font-size: 30rpx;
		padding: 110rpx 10rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		.add-title {
			font-size: 36rpx;
		}

		.add-tip {
			color: #999;
			font-size: 30rpx;
		}

		.items {
			margin-top: -32rpx;

			.item {
				margin-top: 70rpx;
			}

			.uname {
				border-bottom: 1rpx solid #ccc;
				width: 560rpx;
			}

			.uCard {
				background: #F7F7F9;
				margin-top: 16rpx;
				border-radius: 15rpx;
			}
		}

		.next {
			margin-top: 130rpx;
			background: #EEEEEE;
			width: 300rpx;
			color: #B9B9B9;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 8rpx;
		}

		.btn-active {
			background: #5785EC;
			color: #fff;
		}
	}

	.select-card {
		position: relative;
		display: flex;
		align-items: center;
		height: 150rpx;
		line-height: 150rpx;
		border-bottom: 1rpx solid #eee;

		.left-name {
			display: flex;

			.card-title {}

			.card-name-type {
				margin-left: 46rpx;
			}

		}

		.arrow-right {
			position: absolute;
			right: 0;
		}
	}

	.cards-pop {
		padding: 36rpx 30rpx 0;

		.pop-title {
			display: flex;
			justify-content: space-between;
			padding-bottom: 50rpx;
			border-bottom: 1rpx solid #eee;

			.close-circle {}

			.title {
				margin: auto;
				text-align: center;

				.title-up {
					font-size: 30rpx;
					color: #000000;
				}

				.title-tip {
					font-size: 24rpx;
					color: #999999;
				}
			}
		}

		.card-list {
			font-size: 30rpx;
			color: #000000;

			.card {
				display: flex;
				justify-content: space-between;
				padding: 30rpx 0 30rpx 30rpx;
				border-bottom: 1rpx solid #eee;

				.left {
					display: flex;
					justify-content: space-between;

					.card-icon {
						width: 35rpx;
						height: 35rpx;
						margin-right: 30rpx;
					}

					.card-name {}
				}
			}
		}

		.add-card {
			margin-top: 20rpx;
			font-size: 30rpx;
			color: #000000;
			display: flex;
			justify-content: space-between;
			padding: 30rpx 0 30rpx 30rpx;

			.left {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.add-icon {
					margin-right: 30rpx;
					width: 36rpx;
					height: 28rpx;
				}

				.add-title {}
			}

			.arrow-right {}
		}

		.confirm-btn {
			width: 50%;
			margin: 174rpx auto 128rpx;
			color: #fff;
			font-size: 30rpx;
		}
	}

	.cards {
		height: 800rpx;

		.cards-list {
			height: 700rpx;
			overflow: auto;
		}

		.select-card-btn {
			width: 50%;
			margin: 20rpx auto 20rpx;
			color: #fff;
			font-size: 30rpx;
		}
	}
</style>
