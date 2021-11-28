<template>
	<view class="recharge">
		<!-- <commonHead backIcon="true" background="url('/static/images/deep_nav_bg.png') no-repeat center"
			rightService="true" :title="$t('Recharge_transaction')"></commonHead> -->
		<view class="content">
			<view class="balance">
				<view class="balance-title">{{this.$t('Account_Balance')}}:</view>
				<view class="ammout">
					<span>{{user.balance}}{{$t('Money_symbol')}}</span>
					<!-- <u-icon name="reload" @click="reqPayTypeList" size="32" color="black" style=""></u-icon> -->
				</view>
			</view>
			<view class="recharge-type">
				<view class="title">{{$t('payment_method_')}}</view>
				<view class="type-list">
					<view class="type-item" :class="[(i+1)%3===0?'no-right':'',pay_tab === i ?'active':'']"
						v-for="(v, i) in types" @click="payTab(i)" :key="i">
						<!-- <img :src="v.img" alt=""> -->
						<view>{{v.payType}}</view>
						<view class="active-icon" v-if="pay_tab === i"></view>
						<view class="active-icon-right" v-if="pay_tab === i"></view>
					</view>
				</view>
			</view>
			<!-- <view class="recharge-sub">
				<view class="type-list">
					<view class="type-item">
						<view class="item">
							<view>货币换算比例:{{types[pay_tab].dbhsbl}}</view>
							<image :src="`data:image/png;base64,${types[pay_tab].qrCodeImg}`"></image>
						</view>
					</view>
				</view>
			</view> -->
			<u-popup v-model="show" mode="center">
				<view class="rechange-mode">
					<view class="title">
						支付<span style="color: ;">{{callbackReCharge}}</span>{{types[pay_tab].payType}}
					</view>
					<image :src="`data:image/png;base64,${types[pay_tab].qrCodeImg}`" />
					<view class="link">支付地址：{{types[pay_tab].url}}</view>
					<button class="copy" type="primary" @click="copy(types[pay_tab].url)">点击复制完整链接地址</button>
					<view class="tip">付款成功2-3分钟到账，如有充值问题请联系客服，充值最低充100!</view>
				</view>
			</u-popup>
			<view class="recharge-input">
				<view class="title">{{this.$t('Recharge_amount')}}</view>
				<view class="input">
					<view class="money-type">{{$t('Money_symbol')}}</view>
					<input class="input-num" type='number' v-model="recharge" :placeholder="this.$t('please_enter')" />
					<view class="clear-icon" v-if="recharge" @click="rechargeClear">X</view>
				</view>
				<view class="select-number">
					<view class="item" v-for="(item,i) in rechargeArr" @click="rechargeChange(item.num)">{{item.name}}
					</view>
				</view>
			</view>
			<u-button class="recharge-btn" type="primary" @click="rechargeSubmit" :disabled="!recharge">
				{{this.$t('Recharge')}}
			</u-button>
			<!-- <view class="recharge-top">
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
		</view> -->
		</view>
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';

	export default {
		data() {
			return {
				pay_tab: 0,
				content: {},
				button_enable: true,
				type: '',
				recharge: '',
				extract: '',
				lowest: 100,
				minAmount: 0,
				maxAmount: 0,
				data: [],
				user: {},
				callbackReCharge: '',
				rechargeList: [],
				payId: '',
				subActive: 0,
				types: [{
					dbhsbl: ''
				}],
				show: false,
				rechargeArr: [{
						name: '100',
						num: 100
					},
					{
						name: '200',
						num: 200
					},
					{
						name: '500',
						num: 500
					},
					{
						name: '1000',
						num: 1000
					},
					{
						name: '2000',
						num: 2000
					},
					{
						name: '5000',
						num: 5000
					},
					{
						name: '10000',
						num: 10000
					},
					{
						name: '20000',
						num: 20000
					}
				]
			};
		},
		components: {
			commonHead,
		},
		watch: {
			// extract(oldVal, newVal) {}
		},
		onLoad() {
			this.user = uni.getStorageSync("user");
			console.log('user', this.user);
			this.init();
		},
		methods: {
			payTab(val) {
				this.initData()
				this.pay_tab = val;
				// this.reqRechargeList()
				// this.content = JSON.parse(this.data[this.pay_tab].content);
				// this.type = this.data[this.pay_tab].type;
				// this.recharge = '';
				// this.minAmount = this.data[this.pay_tab].minAmount;
				// this.maxAmount = this.data[this.pay_tab].maxAmount;
			},
			changeSubId(item, id, i) {
				this.payId = id;
				this.subActive = i;
				// this.content = JSON.parse(this.data[this.pay_tab].content);
				// this.type = this.data[this.pay_tab].type;
				this.recharge = '';
				this.minAmount = item.min;
				this.maxAmount = item.max;
			},
			reqPayTypeList() {
				// 取支付方式
				this.$Request
					.post('/config/getPayTypeList', {
						mobile: this.user.mobile,
						token: uni.getStorageSync("token")
					})
					.then(res => {
						console.log("支付方式", res);
						if (res.code == 200) {
							this.types = res.data
						} else {
							this.$queue.showToast(res.message);
						}
						// uni.hideLoading();
					})
					.catch(res => {
						// uni.hideLoading();
					});
			},
			init() {
				this.reqPayTypeList()
				// this.reqRechargeList()
			},
			reqRechargeList() {
				this.$Request
					.get('/app/recharge/setting', {
						clientType: this.pay_tab + 1
					})
					.then(res => {
						if (res.code == 0) {
							this.rechargeList = res.data
							if (res.data.length == 0) {
								this.type = -1;
							} else {
								//todo: 有可能没有充值渠道
								// this.payTab(0);
								this.type = '';
								this.minAmount = this.rechargeList[0].min
								this.maxAmount = this.rechargeList[0].max
								this.payId = this.rechargeList[0].id
							}
						} else if (res.code == 401) {
							this.$queue.showToast(res.message);
							uni.reLaunch({
								url: '../login/login',
							});
						} else if (res.code == 500) {
							this.$queue.showToast(res.message);
							this.type = -1;
							this.initData()
							// setTimeout(() => {
							// uni.reLaunch({
							// 	url: '../user/user'
							// });
							// }, 3000);
							return;
						}
					})
					.catch(res => {});
			},
			initData() {
				this.rechargeList = []
				this.payId = ''
				this.subActive = 0
			},
			cmp(a, b) {
				//按orderNum排序的
				return a.orderNum - b.orderNum;
			},
			rechargeChange(val) {
				this.recharge = Number(this.recharge)
				this.recharge += Number(val);
			},
			rechargeMin() {
				this.recharge = this.minAmount;
			},
			rechargeMax() {
				this.recharge = this.maxAmount / 100;
			},
			copy(value) {
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
			},
			rechargeSubmit() {
				if (!this.types[this.pay_tab].payType) {
					this.$queue.showToast('请刷新');
					return
				}
				// 请求后端拿到支付金额数值
				this.$Request
					.post('/business/pay', {
						mobile: this.user.mobile,
						payAmount: this.recharge,
						payType: this.types[this.pay_tab].payType,
						token: uni.getStorageSync("token")
					})
					.then(res => {
						if (res.code == 200) {
							this.callbackReCharge = res.data
							this.show = true
						} else {
							this.$queue.showToast(res.message);
						}
						// uni.hideLoading();
					})
					.catch(res => {
						// uni.hideLoading();
					});
			},
			rechargeClear() {
				this.recharge = '';
			},
		},
	};
</script>

<style lang="scss" scoped>
	.recharge {
		background: #EEEEEE;
		height: 100vh;

		// border: 1rpx solid red;
		// #839CF8 #486FFD
		// #3370FB #E474FE
		.content {
			padding: 16rpx 30rpx;

			.balance {
				color: #333333;
				font-size: 30rpx;
				border: 1rpx solid #bbb;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 5rpx 30rpx;
				background: #fff;

				.balance-title {}

				.ammout {
					span {
						margin-right: 20rpx;
					}
				}
			}

			.recharge-type {
				color: #333;
				margin-top: 26rpx;

				.title {
					font-size: 34rpx;
				}


				.type-list {
					display: flex;
					flex-wrap: wrap;

					.type-item {
						margin-top: 17rpx;
						margin-right: 30rpx;
						padding: 24rpx 24rpx;
						// width: 100rpx;
						height: 70rpx;
						font-size: 24rpx;
						color: #C93E2D;
						background: #fff;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						position: relative;
						border-radius: 10rpx;
						word-break: break-all;

						img {
							width: 48rpx;
						}


						.active-icon {
							width: 32rpx;
							height: 32rpx;
							position: absolute;
							bottom: 0;
							right: 0;
							background: url('/static/images/charge/active_bg.png') no-repeat center;
						}

						.active-icon-right {
							width: 17rpx;
							height: 13rpx;
							position: absolute;
							bottom: 3rpx;
							right: 3rpx;
							background: url('/static/images/charge/yes.png') no-repeat center;
							background-size: 100% 100%;
						}
					}

					.no-right {
						margin-right: 0;
					}

					.active {
						color: #fff;
						background: #2979ff;
					}

				}
			}

			.recharge-sub {
				margin-top: 25rpx;

				.title {
					font-size: 32rpx;
				}


				.type-list {
					display: flex;
					flex-wrap: wrap;

					.type-item {
						margin-top: 17rpx;
						margin-right: 30rpx;
						font-size: 18rpx;
						color: #C93E2D;
						background: #fff;
						position: relative;
						border-radius: 10rpx;
						display: flex;
						align-items: center;

						.item {
							margin: auto;

							view {
								text-align: center;
							}
						}
					}

					.no-right {
						margin-right: 0;
					}

					.active {
						color: #fff;
						background: #C93E2D;
					}

					.active-icon {
						width: 32rpx;
						height: 32rpx;
						position: absolute;
						bottom: 0;
						right: 0;
						background: url('/static/images/charge/active_bg.png') no-repeat center;
					}

					.active-icon-right {
						width: 17rpx;
						height: 13rpx;
						position: absolute;
						bottom: 3rpx;
						right: 3rpx;
						background: url('/static/images/charge/yes.png') no-repeat center;
						background-size: 100% 100%;
					}

				}
			}

			.recharge-input {
				margin-top: 30rpx;
				background: #FFF;
				border-radius: 15rpx;
				padding: 20rpx;

				.title {
					font-size: 24rpx;
				}

				.input {
					border-bottom: 1rpx solid #ddd;
					display: flex;
					align-items: center;

					.money-type {
						flex: 1;
						font-size: 80rpx;
					}

					.input-num {
						font-size: 60rpx;
						flex: 10;
						margin-bottom: -20rpx;
						margin-left: 20rpx;
					}

					.uni-input-placeholder {
						font-size: 30rpx;
						color: #ccc;
					}

					.clear-icon {
						font-size: 38rpx;
						color: #999;
						font-weight: bold;
						margin-bottom: -20rpx;
						margin-left: 20rpx;
						flex: 1;
					}
				}

				.select-number {
					display: flex;
					flex-wrap: wrap;

					.item {
						color: #4F4F4F;
						font-size: 24rpx;
						margin: 15rpx;
						width: 101rpx;
						padding: 4rpx 0;
						box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.34);
						text-align: center;
						border-radius: 30rpx;
					}
				}
			}

			.recharge-btn {
				font-size: 32rpx;
				color: #fff;
				border-radius: 20rpx;
				margin: 30rpx auto;
			}
		}

		/deep/ .u-mode-center-box {
			border-radius: 20rpx;
		}

		.rechange-mode {
			text-align: center;
			width: 600rpx;
			padding: 30rpx;

			.title {
				font-size: 44rpx;
				text-align: center;

				span {
					color: #514dff;
				}
			}

			image {
				width: 300rpx;
				height: 300rpx;
			}

			.link {
				margin: 20rpx 0 10rpx;
			}

			.copy {
				height: 60rpx;
				font-size: 30rpx;
				line-height: 60rpx;
			}

			.tip {
				margin: 20rpx;
				color: red;
			}

		}
	}
</style>
