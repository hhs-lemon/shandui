<template>
	<view class="withdraw">
		<view class="withdraw-head" @tap="bankList">
			<view class="withdraw-head-to">{{$t('Account_Channel')}}</view>
			<view class="withdraw-head-way">
				<view class="withdraw-head-way-1">
					<image class="way-icon" src="/static/images/money.png"></image>
					<text class="way-text">{{bankNo}}</text>
				</view>
				<view class="withdraw-head-way-2">{{$t('Only_supports_integers')}}</view>
			</view>
			<u-icon class="arrow-right" name="arrow-right" color="#969799" size="28"></u-icon>
		</view>
		<view class="withdraw-body">
			<text>{{$t('Withdrawal_Amount')}}</text>
			<view class="input-money">
				<text class="rmb">{{$t('Money_symbol')}}</text>
				<input id='textInput' v-model.number="extract" type="tel" class="t-input"
					:placeholder="this.$t('please_enter')" />
			</view>
			<view class="info-money">
				<view v-if="is_code">
					<text class="info-money-num" style="color: #ff1e0f;">
						{{$t('Current_remaining_coding_amount')}}{{ (this.code).toFixed(0) }}{{this.$t('yuan')}}，{{$t('Unwithdrawable')}}</text>
				</view>
				<view v-else-if="is_out">
					<text class="info-money-num"
						style="color: #ff1e0f;">{{$t('The_amount_entered_exceeds_the_withdrawal_balance')}}，{{this.$t('Account_Balance')}}{{ pool }}{{this.$t('yuan')}}</text>
				</view>
				<view v-else-if="is_lowest">
					<text class="info-money-num"
						style="color: #ff1e0f;">{{$t('lowest')}}{{ lowest }}{{$t('Yuanqi_Withdrawal')}}，{{this.$t('Account_Balance')}}{{ pool }}{{this.$t('yuan')}}</text>
				</view>
				<view v-else>
					<text
						class="info-money-num">{{$t('Current_withdrawal_balance')}}{{ pool }}{{this.$t('yuan')}}，</text>
					<text class="info-money-all" @click="getAll">{{$t('Withdraw_all')}}</text>
				</view>
			</view>
			<view :class="'tx' + (is_post ? '-active' : '')"><button
					@click="handleShowModel">{{this.$t('withdraw')}}</button></view>
		</view>

		<view :class="['keyboard', keyboradShow ? '' : 'active', isIphoneX ? 'isIphone' : '']">
			<block v-for="(item, index) in 9" :key="index">
				<view class="keyboard-item" @tap="keyboradKey(index + 1)">{{ index + 1 }}</view>
			</block>
			<view class="keyboard-item hide"></view>
			<view class="keyboard-item" @tap="keyboradKey(0)"><text>0</text></view>
			<view class="keyboard-item delte" @tap="keyboradDel()">
				<image class="img" src="/static/images/del.png" mode="aspectFill" :lazy-load="true"></image>
			</view>
		</view>

		<view class="cu-modal" :class="showModal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<u-icon @tap="showModal = false" name="close" class="close-icon" color="#999" size="48"></u-icon>
					<view class="content">{{$t('withdraw')}}</view>
					<!-- <view class="content">{{$t('Please_enter_the_security_pass<u-icon name="photo" color="#2979ff" size="28"></u-icon>word')}}</view> -->
				</view>
				<view class="padding-xl" style="">

					<view class="ammout">
						<span>{{this.$t('Money_symbol')}}</span>
						<text class="">
							{{ money }}
						</text>
					</view>
					<view class="margin-top-sm service-item">
						<text>{{$t('Actual_arrival')}}</text>
						<text class="text-red fee">
							{{ real_money }}
							<em>{{this.$t('yuan')}}</em>
						</text>
					</view>
					<view class="margin-top-sm service-item">
						<text>{{$t('Withdrawal_fee')}}：</text>
						<text class="text-red fee">
							{{ service_fee }}
							<em>{{this.$t('yuan')}}</em>
						</text>
					</view>
					<view class="margin-top-sm service-item">
						<text>{{$t('Withdrawal_Fee_Rate')}}：</text>
						<text class="text-red">{{ ratio}}%</text>
					</view>
					<view class="margin-top-sm">
						<text class="text-red">{{$t('Number_of_hands_free_remaining')}}：</text>
						<text class="text-red">{{ sys_free_num_left}}次</text>
					</view>

				</view>
				<tui-keyboard :mask="false" :radius="radius" :show="show" @close="closeKeyboard" @click="keyboardClick">
					<view class="tui-digital-box">
						<view class="tui-keyboard-tips">{{this.$t('Please_enter_the_security_password') }}</view>
						<tui-keyboard-input :inputvalue="pwdArr"></tui-keyboard-input>
					</view>
				</tui-keyboard>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<!-- <button class="cu-btn margin-left" @tap="showModal = false">{{$t('cancel')}}
						</button> -->
						<!--
						<button class="cu-btn bg-green margin-left" @tap="getMoney">{{$t('Confirm_withdrawal')}}</button>
						-->
						<!-- <tui-button class="cu-btn bg-green margin-left" @tap='switchKeyboard(6)'>
							{{$t('Confirm_withdrawal')}}
						</tui-button> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 选择银行卡 -->
		<u-popup class="" v-model="showCard" mode="bottom" border-radius="14">
			<view class="cards-pop">
				<view class="pop-title">
					<u-icon name="close-circle" size="46" @tap="showCard=false"></u-icon>
					<view class="title">
						<view class="title-up">{{$t('Choose_a_recharge_method')}}</view>
						<view class="title-tip">{{$t('Please_pay_attention_to_the_bank_arrival_time')}}</view>
					</view>
					<view style="width: 46rpx;"></view>
				</view>
				<view class="card-list">
					<view class="card" v-for="(item,i) in itemList" :key="i" @click="selectCard(i)">
						<view class="left">
							<img src="/static/images/money.png" alt="" class="card-icon">
							<view class="card-name">{{item}}</view>
						</view>
						<u-icon v-if="i===currentId" color="#8D9DFE" class="checkmark" name="checkmark" size="34">
						</u-icon>
					</view>
				</view>
				<view class="add-card" @click="showAdd=true">
					<view class="left">
						<img src="/static/images/card.png" alt="" class="add-icon">
						<view class="add-title">{{$t('Use_the_new_card_to_withdraw')}}</view>
					</view>
					<u-icon name="arrow-right" size="24"></u-icon>
				</view>
				<button class="confirm-btn" type="primary" @click="onConfirm">{{ $t('determine') }}</button>
			</view>
		</u-popup>
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
	export default {
		data() {
			return {
				show: false,
				cardInput: true,
				showCard: false,
				showSelect: false,
				showCardList: false,
				showAdd: false,
				selectingBankCard: 0,
				numberArr: [],
				pwdArr: ["", "", "", "", "", ""],
				temp: ["", "", "", "", "", ""],
				radius: false,
				pwd: '',

				buttonRect: {},
				pool: 0,
				extract: '',
				service_fee: 0.0,
				high: 0,
				code: 0,
				bankNo: '-',
				branchName: '',
				bankCard: '-',
				currentId: 0,
				currentBankCard: 0,
				banks: [],
				itemList: [],
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
				showModal: false,
				//是否超过总额
				is_out: false,
				is_lowest: false,
				//是否还需要打码
				is_code: true,
				//是否显示
				is_post: false,
				lowest: 100,
				sys_free_num: 0,
				sys_free_num_left: 0,
				ratio: 0,
				money: '',
				real_money: '',
				keyboradShow: false,
				isIphoneX: false,
				cardHolder: '',
				cardNo: '',
				isRefuse: false
			};
		},
		watch: {
			extract(oldVal, newVal) {
				// console.log("oldVal is ",oldVal);
				// console.log("newVal is ",newVal);
				this.checkMoney();
			},
			cardNo(cardNo) {
				if (cardNo) {
					this.showSelect = true
				} else {
					this.showSelect = false
				}
			},
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('withdraw')
			})
			this.$api.loading(true);
			this.loadData();
			this.init();
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
			this.bankCard = this.bankCardList[0]
		},
		mounted() {},
		methods: {
			init() {
				var token = this.$queue.getData('token');
				//没有token就去登录页面
				if (!token) {
					uni.reLaunch({
						url: '../login/login',
					});

				}
				var realName = this.$queue.getData('realname')
				if (realName) {
					this.cardHolder = realName;
					this.cardInput = false;
				}
				this.itemList = []
				this.$Request
					.get('/app/withdraw/info', {})
					.then(res => {
						if (res.code == 0) {
							if (res.data.bank == 0) {
								// uni.navigateTo({
								// 	url: '../user/bankcard_add'
								// });
								this.showAdd = true
								return;
							}
							if (res.data.withdraw == 1) {
								this.$queue.showToast(this.$t('Withdrawals_are_being_processed'));
								setTimeout(() => {
									// uni.reLaunch({
									// 		url: '../user/user'
									// 	});
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
								return;
							}
							console.log('res.data.fee  ', res.data.fee);
							this.pool = res.data.wallet.money;
							// this.service_fee = res.data.fee / 100;
							this.ratio = res.data.ratio;
							this.lowest = res.data.lowest;
							this.high = res.data.high;
							this.sys_free_num = res.data.sys_free_num;
							this.sys_free_num_left = res.data.sys_free_num_left;
							this.code = res.data.wallet.code;
							this.banks = res.data.banks;
							this.sumbmit_card_id = res.data.banks[0].id;
							this.bankNo = this.banks[0].bankName + '/****' + this.banks[0].cardNo.substring(this.banks[
								0].cardNo.length - 4);
							for (var i = 0; i < res.data.banks.length; i++) {
								var cardNoTail = res.data.banks[i].cardNo;
								this.itemList.push(res.data.banks[i].bankName + '/****' + cardNoTail.substring(
									cardNoTail.length - 4));
							}
							//是否需要打码
							if (this.code <= 0) {
								this.is_code = false;
							}
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			async loadData() {
				this.$nextTick(() => {
					this.keyboradShow = true;
				});
			},
			stopKeyborad() {
				uni.hideKeyboard();
			},
			keyboradKey(key) {
				this.insertInputTxt('textInput', key);
			},
			keyboradDel() {
				if (this.extract && this.extract > 0) {
					let val = parseInt(this.extract / 10);
					if (val == 0) val = '';
					this.extract = val;
				}
			},
			getAll() {
				this.extract = parseInt(this.pool);
			},
			insertInputTxt(id, insertTxt) {
				console.log(1111222);
				var textInput = document.getElementById(id);
				console.log('textInput is ', textInput);

				var elInput = textInput.getElementsByTagName('input')[0];
				console.log('elInput is ', elInput);

				var startPos = elInput.selectionStart;
				var endPos = elInput.selectionEnd;
				if (startPos === undefined || endPos === undefined) return
				var txt = elInput.value;
				var result = txt.substring(0, startPos) + insertTxt + txt.substring(endPos)
				elInput.value = result;
				this.extract = result;
				elInput.focus();
				elInput.selectionStart = startPos + insertTxt.length;
				elInput.selectionEnd = startPos + insertTxt.length;
			},
			checkMoney() {
				if (this.is_code) {

				} else if (!this.extract || this.extract < this.lowest) {
					this.is_lowest = true;
					this.is_post = false;
				} else if (this.extract > this.pool) {
					this.is_out = true;
					this.is_lowest = false;
					this.is_post = false;
				} else {
					this.is_out = false;
					this.is_lowest = false;
					this.is_post = true;
				}
				if (parseFloat(this.extract).toString() == 'NaN') {
					this.is_post = false;
					this.$api.msg(this.$t('The_amount_entered_is_illegal'));
				}
			},
			handleShowModel() {
				if (this.isRefuse) return;
				if (!this.is_post) return;
				this.money = this.extract;
				//this.service_fee = Number((this.extract * (this.fee / 100)).toString().match(/^\d+(?:\.\d{0,2})?/));
				this.real_money = Number((this.extract - this.ratio * this.extract / 100).toString().match(
					/^\d+(?:\.\d{0,2})?/));
				this.service_fee = Number((this.ratio * this.extract / 100).toString().match(/^\d+(?:\.\d{0,2})?/));
				this.showModal = true;
				this.switchKeyboard()
			},
			bankList() {
				// const that = this
				// uni.showActionSheet({
				// 	title: this.$t('Withdraw_to'),
				// 	itemList: this.itemList,
				// 	popover: {
				// 		top: that.buttonRect.top * 2 + that.buttonRect.height,
				// 		left: that.buttonRect.left + that.buttonRect.width / 2
				// 	},
				// 	success: (e) => {
				// 		//this.bankNo = this.banks[e.tapIndex].bankName + '/' + this.banks[e.tapIndex].cardNo;
				// 		this.bankNo = this.banks[e.tapIndex].bankName + '/****' + this.banks[e.tapIndex].cardNo
				// 			.substring(this.banks[e.tapIndex].cardNo.length - 4);
				// 		this.sumbmit_card_id = this.banks[e.tapIndex].id;
				// 	}
				// })
				this.showCard = true
			},
			selectBankCardList() {
				this.showCardList = true
			},

			//提现提交
			getMoney() {
				this.showModal = false;
				if (this.isRefuse) return;
				this.isRefuse = true;
				this.$Request
					.post('/app/withdraw/submit', {
						amount: this.money,
						pwd: this.pwd,
						id: this.sumbmit_card_id
					})
					.then(res => {
						console.log(res);
						if (res.code == 0) {
							setTimeout(() => {
								this.$api.msg(this.$t('Withdrawal_application_has_been_submitted'));
							}, 1000);
							uni.reLaunch({
								url: '../user/user'
							});
						} else {
							this.closeKeyboard();
							setTimeout(() => {
								this.$api.msg(res.message);
							}, 1000);
						}
						this.isRefuse = false;
					})
					.catch(res => {});
			},
			switchKeyboard(index) {
				let length = index; //e.currentTarget.dataset.length;
				let arr = ["", "", "", "", "", ""]
				let radius = false
				this.pwdArr = arr;
				this.temp = arr;
				this.numberArr = [];
				this.radius = radius;
				this.show = true
			},
			closeKeyboard: function() {
				this.show = false;
				this.numberArr = [];
				this.pwdArr = this.temp
			},
			getPwd: function() {
				//判断并取出密码
				if (this.numberArr.length === this.pwdArr.length) {
					let pwd = this.numberArr.join('')
					this.pwd = pwd;
					console.log(pwd)
					this.closeKeyboard();
					this.showModal = false;
					this.getMoney();
				}
			},
			keyboardClick: function(e) {
				let numberArr = this.numberArr;
				let pwdArr = this.pwdArr;
				let index = e.index;
				if (numberArr.length === pwdArr.length || index == undefined) {
					return;
				}
				if (index == 9) { //取消键
					this.closeKeyboard();
					return;
				} else if (index == 11) {
					//退格键
					let len = numberArr.length;
					if (len) {
						pwdArr.splice(len - 1, 1, "");
					} else {
						pwdArr = this.temp;
					}
					numberArr.pop()
				} else if (index == 10) {
					numberArr.push(0);
					pwdArr.splice(numberArr.length - 1, 1, "●");
				} else {
					numberArr.push(index + 1);
					pwdArr.splice(numberArr.length - 1, 1, "●");
				}
				console.log('111 提现');
				this.numberArr = numberArr;
				this.pwdArr = pwdArr;
				this.getPwd();
			},
			selectCard(i) {
				this.currentId = i
			},
			selectBandCard(i) {
				this.selectingBankCard = i
			},
			onConfirm() {
				this.bankNo = this.banks[this.currentId].bankName + '/****' + this.banks[this.currentId].cardNo
					.substring(this.banks[this.currentId].cardNo.length - 4);
				this.sumbmit_card_id = this.banks[this.currentId].id;
				this.showCard = false
			},
			onConfirm1() {
				this.bankCard = this.bankCardList[this.selectingBankCard];
				this.showCardList = false
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
							// this.showCard = false;
							this.init()
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {
						uni.hideLoading();
					});

			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #ededed;
	}

	.withdraw {
		height: 100vh;

		&-head {
			padding: 20px;
			display: flex;
			align-content: center;
			padding: 20px 30px;
			font-size: 15px;
			position: relative;

			&-way {
				display: flex;
				flex-direction: column;
				align-content: center;
				margin-left: 20px;

				&-1 {
					color: #576b95;
					margin-bottom: 10px;

					.way-icon {
						width: 16px;
						height: 16px;
						margin-right: 5px;
						top: 2px;
					}
				}

				&-2 {
					color: #acacac;
					font-size: 12px;
				}
			}

			.arrow-right {
				position: absolute;
				right: 30rpx;
			}
		}

		&-body {
			height: 600rpx;
			background-color: #fff;
			padding: 60rpx 50rpx;
			font-size: 14px;
			border-radius: 27rpx 27rpx 0px 0px;

			.input-money {
				display: flex;
				align-content: center;
				// font-weight: 600;
				border-bottom: 0.5px solid #eaeef1;

				.rmb {
					font-size: 60rpx;
					top: 10px;
					position: relative;
				}

				.t-input {
					height: 1.9em;
					font-size: 2.5em;
					border: none;
					position: relative;
					left: 3.5%;
					outline: none;
				}
			}

			.info-money {
				margin-top: 10px;
				font-size: 12px;
				margin-bottom: 20px;

				&-num {
					color: #b2b2b2;
				}

				&-all {
					color: #576b95;
				}
			}

			.tx {
				button {
					color: #fff;
					margin-top: 140rpx;
					width: 300rpx;
					background: #AFBEE2;
				}
			}

			.tx-active {
				button {
					color: #fff;
					margin-top: 140rpx;
					background: #5785EC;
					width: 300rpx;
				}
			}
		}

		.keyboard {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #ebebeb;
			display: flex;
			justify-content: center;
			z-index: 2;
			flex-wrap: wrap;
			transition: all 0.2s ease-in 0.2s;
		}

		.active {
			bottom: -400rpx;
		}

		.keyboard-item {
			box-sizing: border-box;
			width: 250rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: #fff;
			font-size: 40rpx;
			color: #333;
			height: 99rpx;
			border: 1rpx solid #ebebeb;
			border-top: none;
			border-left: none;
		}

		.hide {
			opacity: 0;
		}

		.delte {
			background: none;
			box-shadow: none;
		}

		.delte image {
			width: 60rpx;
			height: 60rpx;
		}

		.isIphone {
			padding-bottom: 68rpx !important;
		}

		.fee {
			em {
				font-size: 0.5rem;
				font-style: normal;
			}
		}
	}

	.cu-modal {
		.cu-dialog {
			background: #fff;
			border-radius: 20rpx;
			top: -250rpx;
			width: 550rpx;
			height: 550rpx;

			.content {
				font-size: 30rpx;
				color: #000;
			}

			.close-icon {
				position: absolute;
				left: 30rpx;
				padding: 10rpx;
			}

			.padding-xl {
				padding-top: 0;
				font-size: 30rpx;

				.ammout {
					color: #000000;
					font-size: 48rpx;
					border-bottom: 1rpx solid #F1F1F1;
					padding: 28rpx 25rpx 35rpx;
				}

				.service-item {
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;

					text:first-child {
						color: #999;
					}

					text:last-child {
						color: #000;
					}
				}
			}
		}

		.tui-keyboard-tips {
			margin-top: 20rpx;
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
</style>
