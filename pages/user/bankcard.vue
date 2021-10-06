<template>
				<view class="main1">
			<view v-if="size==0">
					<view>
						{{$t('Once_bound')}}

					</view>
					<view class="item">
						<image class="login_image" src="../../static/login/userName.png"></image>
						<input v-model="cardHolder" class="main-input" :placeholder="this.$t('Please_enter_your_real_name')" />
					</view>
					<view class="item">
						<image class="login_image" src="../../static/login/userName.png"></image>
						<input v-model="cardNo" class="main-input" :placeholder="this.$t('Please_enter_the_card_number')" />
					</view>
					<view class="item">
						<image class="login_image" src="../../static/login/userName.png"></image>
						<input v-model="bankName" class="main-input" :placeholder="this.$t('Please_enter_the_bank_name')" />
					</view>
					<view class="item">
						<image class="login_image" src="../../static/login/userName.png"></image>
						<input v-model="branchName" class="main-input" :placeholder="this.$t('Please_enter_the_branch_name')"/>
					</view>
					<view class="btn_login" @click="save">{{$t('save')}}</view>
				</view>
		<view v-else>
					<view class="item">
						<image class="login_image" src="../../static/login/userName.png"></image>
						<input v-model="cardHolder" class="main-input" :placeholder="this.$t('Please_enter_your_real_name')" />
					</view>
					<view class="item">
						<image class="login_image" src="../../static/login/userName.png"></image>
						<input v-model="cardNo" class="main-input" :placeholder="this.$t('Please_enter_the_card_number')" />
					</view>
					<view class="item">
						<image class="login_image" src="../../static/login/userName.png"></image>
						<input v-model="bankName" class="main-input" :placeholder="this.$t('Please_enter_the_bank_name')" />
					</view>
					<view class="item">
						<image class="login_image" src="../../static/login/userName.png"></image>
						<input v-model="branchName" class="main-input" :placeholder="this.$t('Please_enter_the_branch_name')
" />
					</view>
					<view class="btn_login" @click="update">{{$t('Update')}}</view>

        </view>

        </view>
</template>

<script>
	var _this;


	export default {
		data() {
			return {
				//logo图片 base64
				cardHolder: '', //用户/电话
                cardNo: '', //用户/电话
                bankName:'',
                branchName:'',
                size:0,
				isRotate: false //是否加载旋转
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('Bank_card')
			})
		},
		mounted() {
            _this = this;
            this.init()
		},
		destroyed() {
			uni.hideKeyboard();
		},
		methods: {
			toUpdate() {
				this.$queue.showLoading(this.$t('updating'));
				this.$Request
					.post('/app/bankcard/update', {
						cardNo: this.cardNo,
						bankName: this.bankName,
						branchName: this.branchName,
					})
					.then(res => {
						if (res.code==0) {
							this.$queue.showToast("更新成功...");
							uni.reLaunch({
								url: '../user/user',
							});
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			toSave() {
				this.$queue.showLoading(this.$t('saving')
);
				this.$Request
					.post('/app/bankcard/add', {
						cardNo: this.cardNo,
						cardHolder: this.cardHolder,
						bankName: this.bankName,
						branchName: this.branchName,
					})
					.then(res => {
						if (res.code==0) {
							this.$queue.showToast(this.$t('Added_successfully')
);
							uni.reLaunch({
								url: '../user/user',
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
				this.$Request
					.getT('/app/bankcard/info')
					.then(res => {
						console.log(res)
						if (res.code == 0) {
                            this.size = res.data.size;
                            if(res.data.size==1){
                                this.cardNo = res.data.bankcard.cardNo;
                                this.cardHolder = res.data.bankcard.cardHolder;
                                this.bankName = res.data.bankcard.bankName;
                                this.branchName= res.data.bankcard.branchName;
                            }
						} else {
							this.$queue.showToast(res.message);
						}
						uni.hideLoading();
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			save() {
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
				this.toSave();
			},
			update() {
				if (this.cardNo.length < 1) {
					this.$queue.showToast(this.$t('Please_enter_the_card_number'));
					return;
				}
				if (this.bankName.length < 1) {
					this.$queue.showToast(this.$t('Please_enter_the_bank_name'));
					return;
				}
				this.toSave();
			}
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
</style>