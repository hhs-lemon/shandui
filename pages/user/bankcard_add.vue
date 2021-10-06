<template>
	<view class="main1">
		<view class="item">
			<text class="item-text">{{notice}}</text>
		</view>
		<view v-if="cardInput" class="item">
			<image class="login_image" src="../../static/login/userName.png"></image>
			<input v-model="cardHolder" type="text" class="main-input"
				:placeholder="this.$t('Please_enter_your_real_name')" />
		</view>
		<view v-else class="item">
			<image class="login_image" src="../../static/login/userName.png"></image>
			<text class="item-text">{{cardHolder}}</text>
		</view>
		<view class="item">
			<image class="login_image" src="../../static/login/userName.png"></image>
			<input v-model="cardNo" type="number" class="main-input"
				:placeholder="this.$t('Please_enter_the_card_number')" />
		</view>
		<view class="item" @click='bankList'>
			<image class="login_image" src="../../static/login/userName.png"></image>
			<text class="item-text">{{bankName}}</text>
		</view>
		<view class="item">
			<image class="login_image" src="../../static/login/userName.png"></image>
			<input v-model="branchName" class="main-input" :placeholder="this.$t('Please_enter_the_branch_name')" />
		</view>

		<tui-button margin="36rpx 0 0" type="blue" shape="circle" @click='switchKeyboard(6)'>{{$t('Add_Bank_Card')}}
		</tui-button>
		<view class="footer" style="margin-top: 16px">
			<view>
				<navigator url="/pages/user/forget_pwd2" open-type="navigate">{{$t('Set_a_secure_password')}}
				</navigator>
			</view>
		</view>
		<tui-keyboard :radius="radius" :show="show" @close="closeKeyboard" @click="keyboardClick">
			<view class="tui-digital-box">
				<view class="tui-keyboard-tips">{{this.$t('Please_enter_the_security_password') }}</view>
				<tui-keyboard-input :inputvalue="pwdArr"></tui-keyboard-input>
			</view>
		</tui-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardInput: true,
				cardHolder: '',
				notice: this.$t('The_real_name_of_the_bank_card_cannot_be_changed_once_it_is_set'),
				buttonRect: {},
				cardNo: '',
				bankName: this.$t('ICBC'),
				itemList: [
					this.$t('Vietinbank'), ,
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
				branchName: '',

				show: false,
				numberArr: [],
				pwdArr: ["", "", "", "", "", ""],
				temp: ["", "", "", "", "", ""],
				radius: false,
				pwd: ''
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('Add_Bank_Card')
			})
		},
		mounted() {
			this.init();
		},
		methods: {
			addPost() {
				this.$queue.showLoading(this.$t('saving'));
				this.$Request
					.post('/app/bankcard/add', {
						cardNo: this.cardNo,
						cardHolder: this.cardHolder,
						// pwd: this.pwd,
						bankName: this.bankName,
						// branchName: this.branchName,
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Added_successfully'));
							this.$queue.setData('realname', this.cardHolder);
							uni.navigateBack({
								delta: 1
							});
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			init() {
				var realName = this.$queue.getData('realname')
				if (realName) {
					this.cardHolder = realName;
					this.cardInput = false;
				}
			},
			bankList() {
				const that = this
				uni.showActionSheet({
					title: this.$t('Bank_Selection'),
					itemList: this.itemList,
					popover: {
						top: that.buttonRect.top * 2 + that.buttonRect.height,
						left: that.buttonRect.left + that.buttonRect.width / 2
					},
					success: (e) => {
						this.bankName = this.itemList[e.tapIndex];
						console.log(this.bankName);
					}
				})
			},
			add() {
				if (this.cardHolder.length == 0) {
					this.$queue.showToast(this.$t('Please_enter_your_real_name'));
					return;
				}
				if (this.cardNo.length < 1) {
					this.$queue.showToast(this.$t('Please_enter_the_card_number'));
					return;
				}
				if (this.bankName.length < 1) {
					this.$queue.showToast(this.$t('Please_enter_the_bank_name'));
					return;
				}
				this.addPost();
			},

			//密码效果
			switchKeyboard(index) {
				if (this.cardHolder.length == 0) {
					this.$queue.showToast(this.$t('Please_enter_your_real_name'));
					return;
				}
				if (this.cardNo.length < 1) {
					this.$queue.showToast(this.$t('Please_enter_the_card_number'));
					return;
				}
				if (this.bankName.length < 1) {
					this.$queue.showToast(this.$t('Please_enter_the_bank_name'));
					return;
				}
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
					this.addPost();
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
				this.numberArr = numberArr;
				this.pwdArr = pwdArr;
				this.getPwd();
			},
		}
	};
</script>

<style>
	@import url('../../static/css/main.css');
	@import url('../../static/css/icon.css');

	.type {
		display: flex;
		margin-left: 16px;
		border-bottom: 1px solid #eeeeee;
		width: 100%;
	}

	.item-text {
		margin-left: 20px;
		font-weight: bold;
	}

	.title_des {
		font-weight: bold;
		color: #0055b8;
		font-size: 22px;
		margin-bottom: 32px;
	}

	.login_icon_wx {
		color: #999999;
		border: none;
	}

	.weixinLogin {
		color: #999999;
		text-align: center;
		font-size: 12px;
		margin-top: 60px;
		left: auto;
		right: auto;
	}

	.footer_des {
		color: #666666;
		text-align: center;
		font-size: 14px;
		margin-top: 40px;
	}

	.getCode {
		font-size: 14px;
		margin-left: 40px;
		color: #0055b8;
	}

	.item {
		line-height: 40px;
		display: flex;
	}

	.login_image {
		margin-top: 8px;
		width: 20px;
		height: 25px;
	}

	.main-input {
		font-size: 14px;
		margin-left: 16px;
		border-bottom: 1px solid #eeeeee;
		height: 40px;
		line-height: 40px;
	}

	.main-input-code {
		width: 70%;
		font-size: 14px;
		height: 40px;
		line-height: 40px;
	}

	.btn_login {
		color: #ffffff;
		font-size: 16px;
		width: 260px;
		height: 40px;
		background: #0055b8;
		border-radius: 8px;
		line-height: 40px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 45px;
	}

	.main-input {
		flex: 1;
		text-align: left;
		font-size: 28 upx;
		padding-right: 10 upx;
		margin-left: 20 upx;
	}

	.tui-keyboard-tips {
		width: 100%;
		height: 120rpx;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-weight: bold;
		background: #fff;
		position: relative;
		color: #333;
		border: 0;
	}
</style>
