<template>
	<view class="recharge">
		<view class="recharge-top">
			<view v-for="(v, i) in data" @click="payTab(i)"
				:style="pay_tab === i ? { color: '#ff00ff', background: '#e9f5f8', }:{}" :key="i">
				{{v.title}}
			</view>
		</view>
		<view class="recharge-info">
			<view v-if="type==-1">
				<view>{{$t('No_recharge_channels_available')}}
				</view>
			</view>
			<view v-if="type==-1">
				<view>{{$t('No_recharge_channels_available')}}
				</view>
			</view>
			<view v-if="type==0">
				<view @click="copy(content.cardNo)">{{$t('Bank_card_number')}}
					:{{content.cardNo}}({{$t('Click_to_copy')}}
					) </view>
				<view @click="copy(content.bankName)">{{$t('Bank_Name')}}
					:{{content.bankName}}({{$t('Click_to_copy')}}
					)</view>
				<view @click="copy(content.cardHolder)">{{$t('Cardholder_Name')}}
					:{{content.cardHolder}}({{$t('Click_to_copy')}}
					)</view>
				<view @click="copy(content.branchName)">{{$t('Branch_Name')}}
					:{{content.branchName}}({{$t('Click_to_copy')}}
					)</view>
			</view>
			<view v-if="type==1">
				<view @click="copy(content.account)">{{$t('Alipay_account')}}
					:{{content.account}}({{$t('Click_to_copy')}}
					)</view>
				<view @click="copy(content.realName)">{{$t('Name')}}
					:{{content.realName}}({{$t('Click_to_copy')}}
					) </view>
			</view>
			<view @click="copy(content.receiptAddress)" v-if="type==3">
				<view>USDT{{$t('address')}}
					: {{content.receiptAddress}}({{$t('Click_to_copy')}}
					)</view>
				<view>{{$t('Chain_name')}}
					: {{content.usdtType}}</view>
			</view>
		</view>

		<view class="recharge-input">
			<view>{{$t('Recharge_amount')}}
				{{$t('Money_symbol')}}({{$t('least')}}
				{{minAmount/100}})
			</view>
			<input type='number' v-model="recharge" :placeholder="this.$t('please_enter')" />
			<view @click="rechargeClear">X</view>
		</view>
		<view>{{$t('Rechargeable_unit')}}
			：{{minAmount/100}}～{{maxAmount/100}}</view>
		<view>
			<view @click="rechargeChange(100)">+100</view>
			<view @click="rechargeChange(500)">+500</view>
			<view @click="rechargeChange(1000)">+1K</view>
			<view @click="rechargeChange(5000)">+5K</view>
		</view>
		<view>
			<view @click="rechargeChange(10000)">+10000</view>
			<view @click="rechargeChange(20000)">+20000</view>
			<view @click="rechargeMin()">{{$t('least')}}
			</view>
			<view @click="rechargeMax()">{{$t('most')}}
			</view>
		</view>
		<view class="recharge-footer">
			<view>{{$t('pay_attention')}}
				：</view>
			<view>
				<view>0.</view>
				<view>{{$t('Please_note_the_user_name_for_recharge')}}</view>
			</view>
			<view>
				<view>1.</view>
				<view>
					{{$t('Every_time_you_recharge_please_log_in_to_the_platform_to_check_the_latest_recharge_information')}}
				</view>
			</view>
			<view>
				<view>2.</view>
				<view>{{$t('If_submitted')}}</view>
			</view>
			<view>
				<view>3.</view>
				<view>
					{{$t('Pay_according_to_the_single_minimum_recharge_amount_and_the_single_maximum_recharge_amount_provided_on_the_platform')}}
				</view>
			</view>
			<view>
				<view>4.</view>
				<view>{{$t('If_any_money_laundering_fraud_is_discovered_using_this_platform')}}</view>
			</view>
			<view @click="rechargeSubmit">{{$t('Recharge_Submit')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pay_tab: 0,
				content: {},
				button_enable: true,
				type: -1,
				recharge: 0,
				extract: '',
				lowest: 100,
				minAmount: 0,
				maxAmount: 0,
				data: []
			};
		},
		watch: {
			// extract(oldVal, newVal) {}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('Recharge')
			})
			this.init();
		},
		methods: {
			payTab(val) {
				this.pay_tab = val;
				this.content = JSON.parse(this.data[this.pay_tab].content);
				this.type = this.data[this.pay_tab].type;
				this.recharge = 0;
				this.minAmount = this.data[this.pay_tab].minAmount;
				this.maxAmount = this.data[this.pay_tab].maxAmount;
			},
			init() {
				this.$Request
					.get('/app/recharge/setting', {})
					.then(res => {
						if (res.code == 0) {
							console.log('--0-');
							for (var i = 0; i < res.data.length; i++) {
								var method_recharge = {
									id: res.data[i].id,
									title: res.data[i].title,
									orderNum: res.data[i].orderNum,
									content: res.data[i].content,
									type: res.data[i].type,
									minAmount: res.data[i].minAmount,
									maxAmount: res.data[i].maxAmount,
								};
								this.data.push(method_recharge);
							}
							if (res.data.length == 0) {
								this.type = -1;
							} else {
								//todo: 有可能没有充值渠道
								this.data.sort(this.cmp);
								this.payTab(0);
							}
						} else if (res.code == 401) {
							this.$queue.showToast(res.message);
							uni.reLaunch({
								url: '../login/login',
							});
						} else if (res.code == 500) {
							this.$queue.showToast(res.message);
							setTimeout(() => {
								uni.reLaunch({
									url: '../user/user'
								});
							}, 3000);
							return;
						}
					})
					.catch(res => {});
			},
			cmp(a, b) {
				//按orderNum排序的
				return a.orderNum - b.orderNum;
			},
			rechargeChange(val) {
				this.recharge += val;
			},
			rechargeMin() {
				this.recharge = this.minAmount;
			},
			rechargeMax() {
				this.recharge = this.maxAmount / 100;
			},
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
			rechargeSubmit() {
				if (this.type == 3) {
					if (this.recharge > this.maxAmount || this.recharge < this.minAmount) {
						this.$queue.showToast(this.$t('The_recharge_unit_range_is') + this.minAmount + '~' + this
							.maxAmount + this.$t('Please_fill_in_again')
						);
						return;
					}
				} else {
					if (this.recharge > this.maxAmount / 100 || this.recharge < this.minAmount / 100) {
						this.$queue.showToast(this.$t('The_recharge_unit_range_is') +
							this.minAmount / 100 + '~' + this.maxAmount / 100 + this.$t('Please_fill_in_again')
						);
						return;
					}
				}
				if (this.button_enable) {
					this.button_enable = false;
				} else {
					return;
				}
				this.$Request
					.post('/app/recharge/submit', {
						amount: this.recharge,
						method_id: this.data[this.pay_tab].id
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Successful_application'));
							setTimeout(() => {
								uni.navigateBack();
							}, 2000);
							return;
						} else if (res.code = 401) {
							this.$queue.showToast(res.message);
							setTimeout(() => {
								uni.reLaunch({
									url: '../user/user'
								});
							}, 3000);
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			rechargeClear() {
				this.recharge = 0;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.recharge { 
		padding: 40rpx 20rpx 20rpx;
		background: #fff;

		&-top {
			display: flex;
			align-items: center;

			view {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 50rpx;
				background: #e0e0e0;
				padding: 0 20rpx;
				border-radius: 25rpx;
				margin-right: 20rpx;
				font-size: 24rpx;
			}
		}

		&-info {
			padding: 20rpx;
			margin-top: 40rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 8rpx solid #00a5a5;
			border-radius: 20rpx;
			font-size: 30rpx;
		}

		&-input {
			padding: 20rpx;
			margin-top: 40rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 8rpx solid #00a5a5;
			border-radius: 20rpx;
			font-size: 50rpx;

			view:first-child {
				position: absolute;
				top: -26%;
				left: 20rpx;
				background: #fff;
				font-size: 30rpx;
				color: #ff8252;
			}
		}

		>view:nth-child(3) {
			padding-left: 20rpx;
			margin-bottom: 20rpx;
			font-size: 30rpx;
			color: #828282;
		}

		>view:nth-child(4) {
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				flex: 1;
				padding: 16rpx 0;
				margin-right: 16rpx;
				background: #f6f6f6;
				text-align: center;
				border-radius: 8rpx;
				font-weight: 500;
				box-shadow: 2rpx 2rpx 2rpx #a5a5a5;
			}

			view:last-child {
				margin-right: 0;
			}
		}

		>view:nth-child(5) {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 10rpx;
			border-bottom: 1rpx solid #e8e8e8;

			view {
				flex: 1;
				padding: 16rpx 0;
				margin-right: 16rpx;
				margin-top: 20rpx;
				background: #f6f6f6;
				text-align: center;
				border-radius: 8rpx;
				font-weight: 400;
				box-shadow: 2rpx 2rpx 2rpx #a5a5a5;
			}

			view:last-child {
				margin-right: 0;
			}
		}

		>view:nth-child(6) {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 10rpx;
			border-bottom: 1rpx solid #e8e8e8;

			view {
				flex: 1;
				padding: 16rpx 0;
				margin-right: 16rpx;
				margin-top: 20rpx;
				background: #f6f6f6;
				text-align: center;
				border-radius: 8rpx;
				font-weight: 400;
				box-shadow: 2rpx 2rpx 2rpx #a5a5a5;
			}

			view:last-child {
				margin-right: 0;
			}
		}

		&-balance {
			padding: 10rpx;
			border-bottom: 2rpx dotted #a5a5a5;

			view:first-child {
				font-size: 24rpx;
				color: #979996;
			}

			view:last-child {
				font-size: 32rpx;
				color: #9c9c9c;
				margin-top: 10rpx;
			}
		}

		&-footer {
			padding: 30rpx 20rpx 20rpx;
			margin-top: 20rpx;
			border-radius: 8rpx;
			box-shadow: 0 0 4rpx #a5a5a5;

			>view:first-child {
				font-size: 24rpx;
				font-weight: 500;
			}

			>view:nth-child(n + 2) {
				display: flex;
				color: #f66;
				margin: 5rpx;

				>view:first-child {
					width: 35rpx;
				}

				>view:last-child {
					flex: 1;
				}
			}

			>view:last-child {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 20rpx;
				margin-top: 30rpx;
				border-radius: 8rpx;
				background: #51a39e;
				color: #fff;
				font-weight: block;
			}
		}
	}
</style>
