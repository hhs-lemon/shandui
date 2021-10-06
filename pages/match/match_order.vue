<template>
	<view style="background-color:#FFFFFF;height: 100vh;">
		<uni-nav-bar color="#FEFEFE" left-icon="back" backgroundColor="transparent" :title="this.$t('Order_detail')"
			@clickLeft="goBack()"></uni-nav-bar>
		<view style="background-color:#FFFFFF;height: 100%;">
			<view >
				<view class="detail-popup-body-top">
					<view>{{$t('You_are_now')}}{{$t('Against')}}
					</view>
					<view><span style="color: #666666;">{{$t('Correctness')}}</span>{{this.matchInfo.cut_line}} 
					</view>
				</view>
				<view class="topArea">
				<view >{{this.matchInfo.league_name}}</view>
				<view class="topAreaContent">
					<view style="flex: 5;">{{this.matchInfo.home_name}}</view>
					<view class="teamVS">vs</view>
					<view style="flex: 5;">{{this.matchInfo.away_name}}</view>
				</view>
				</view>
				<view class="centerArea">
					<view class="centerHead">
						<view style="padding-left: 10%;">{{$t('Transaction_amount')}}</view>
						<view>{{$t('Rate_of_Return')}}</view>
						<view style="padding-right: 5%;">{{$t('Estimated_Profit')}}</view>
					</view>
					<view class="centerSubHead">
						<input style="margin-left: 40rpx;" class="centerSubHead-round" type='number' v-model="trading" :placeholder="this.$t('please_enter')" />
						<view class="centerSubHead-content">×  {{this.matchInfo.earn_rate}}% =</view>
						<view class="centerSubHead-round" style="margin-right: 40rpx;" >{{(this.trading * this.matchInfo.earn_rate / 100 * (100 - this.matchInfo.sports_ratio) / 100 - this.matchInfo.sports_fee).toFixed(0)}}</view>
					</view>
					<view style="width: 100%;height: 80rpx;">
						<view style="font-size: 30rpx; color:#FF7979; text-align:right; margin-right:20rpx">-{{(this.matchInfo.sports_fee + this.trading * this.matchInfo.sports_ratio / 100 * this.matchInfo.earn_rate / 100).toFixed(0)}}{{$t('Money_symbol')}}</view>
						<view style="font-size: 24rpx; color:#FF7979; text-align:right; margin-right:30rpx" >{{$t('Handling_Fee')}}</view>
					</view>
					<view class="detail-popup-body-trading">
						<view @click="transaction(it, idx)" v-for="(it, idx) in this.trading_list.slice(0, 8)" :key="it">
							{{idx === 7 ? $t('All'): it | tradHandle}}
						</view>

						<view @click="goRecharge">{{this.$t('Recharge')}}</view>
					</view>
					<view class="detail-popup-body-balance">
							<image src="/static/images/icon/balance.png" style="width:27rpx;height: 27rpx;position: absolute;left:7%;margin-top:13rpx;"/>
							<view style="position:relative; left: 7%;">{{$t('Available_Balance')}}</view>
							<view style="position:relative; right: 10%;">{{$t('Money_symbol')}}{{balance}}</view>
					</view>
				</view>
				<view class="detail-popup-body-btn">
					<view class="detail-popup-body-btn-cancel" @click="onCancel">{{$t('cancel')}}
					</view>
					<view @click="onOk"
						:class="this.balance >= this.trading &&this.trading>=this.matchInfo.sports_min? 'detail-popup-body-btn-ok': 'detail-popup-body-btn-ok'">
						{{$t('Confirm_transaction')}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import friendlyDate from '@/common/util.js';
	export default {
		created() {},
		watch: {},
		data() {
			return {
				matchInfo: this.$queue.getData('matchInfo'),
				trading_list: this.$queue.getData('matchInfo').trading_list,
				trading:0,
				balance:0,
			}
		},
		filters: {
			tradHandle(val) {
				if (val >= 1000) {
					return val / 1000 + 'K';
				}
				if (val >= 1000) {
					return val
				}
				return val;
			}
		},
		onLoad() {
			this.getUserInfo();
			uni.setNavigationBarTitle({
				title:this.$t('Order_detail')
			});
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			onCancel() {
				this.goBack();
			},
			getUserInfo() {
				this.$Request
					.post('/app/user/info', {})
					.then(res => {
						console.log(res)
						if (res.code == 0) {
							this.balance = res.data.wallet.money;
							
						} else {
							this.$queue.showToast(res.message);
						}
						uni.hideLoading();
					})
					.catch(res => {
						uni.hideLoading();
					});
			},
			goRecharge() {
				uni.navigateTo({
					url: '../../pages/recharge/index',
				});
			},
			transaction(val, idx) {
				if (idx == 7) {
					this.trading = this.balance;
					return;
				}
				this.trading =parseInt(this.trading);
				this.trading += val;
			},
			onOk() {
				console.log('this.trading  this.balance',this.trading,this.balance,);
				if(this.trading >this.balance)
				{
					this.$queue.showToast(this.$t('balance_not_enough'));
					return;
				}
				
				if( this.trading < this.matchInfo.sports_min)
				{
					this.$queue.showToast(this.$t('min_bet_num')+this.matchInfo.sports_min);
					return;
				}
				this.$Request
					.post('/app/sports/submit', {
						orderId: this.matchInfo.orderId,
						money: this.trading
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Successful_bet'));
							this.goBack();
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {
						uni.hideLoading();
					});
			
			},
		}
	}
</script>

<style lang="scss" scoped>
	.detail-popup {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		&-body {
			width: 100%;
			height: 100%;
			margin-left: 0%;
			margin-top: 0%;
			background: #fff;
			border-radius: 8rpx;

			&-top {
				padding: 30rpx 20rpx;
				text-align: center;
				font-size: 24rpx;
				color: #666666;
				view:nth-child(2) {
					font-size: 30rpx;
					color: #FF6666;
				}

			}
			&-title {
				padding: 10rpx 0;
				font-size: 28rpx;
				border-bottom: 4rpx solid #65a09d;
				text-align: center;
			}

			&-vs {
				display: flex;
				padding: 0 40rpx;
				justify-content: space-between;

				view {
					font-size: 32rpx;
				}

				view:first-child {
					display: flex;
					align-items: center;
					font-size: 32rpx;
				}

				image {
					width: 34rpx;
					height: 34rpx;
					margin-left: 10rpx;
				}
			}

			&-balance {
				display: flex;
				justify-content: space-between;
				margin: auto;
				margin-top: 60rpx;
				width: 90%;
				height: 55rpx;
				font-size: 24rpx;
				background: #9CD4FF;
				border-radius: 20px;
				color: #FFFFFF;
				line-height: 55rpx;
			}

			&-trading {
				display: flex;
				flex-wrap: wrap;
				margin-top: 5rpx;
				view {
					display: block;
					width: 120rpx;
					height: 43rpx;
					line-height: 43rpx;
					border-radius: 6rpx;
					margin: 10rpx;
					font-size: 26rpx;
					font-weight: bold;
					text-align: center;
					background: linear-gradient(0deg, #D2DDFC, #FFFFFF);
					box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.39);
					border-radius: 20px;
					

				}
				view:nth-child(8) {
					margin-right: 0;
					width: 220rpx;
					height: 43rpx;
					color: #FFFEFE;
					background: linear-gradient(-90deg, #87A4F6, #A967F2);
					border-radius: 20px;
					line-height: 43rpx;
				}
				view:nth-child(9) {
					margin-right: 0;
					color: #FFFEFE;
					background: linear-gradient(-90deg, #87A4F6, #A967F2);
					border-radius: 20px;
					line-height: 43rpx;
				}
				
			}

			&-reward {
				display: flex;
				justify-content: space-between;
				margin-top: 40rpx;
				font-size: 32rpx;
				color: #a1a1a1;

				>view {
					display: flex;
					position: relative;
					justify-content: space-between;
					align-items: center;
					width: 46%;
					padding: 18rpx;
					display: flex;
					box-sizing: border-box;
					border: 2rpx solid #a1a1a1;
					// border: 4rpx solid #a04732;
					border-radius: 6rpx;
				}

				image {
					width: 34rpx;
					height: 34rpx;
					margin-left: 10rpx;
				}

				&-hot {
					position: absolute;
					top: -20rpx;
					left: 10rpx;
					font-size: 26rpx;
					font-weight: bold;
					color: #c24121;
					background: #fff;
				}

				&-top {
					position: absolute;
					top: -20rpx;
					left: 10rpx;
					font-size: 26rpx;
					color: #a1a1a1;
					background: #fff;
				}

				&-active {
					border: 2rpx solid #c24121 !important;

					view:first-child {
						view {
							color: #b3614d;
							font-weight: 500;
						}
					}

					view:last-child {
						color: #b3614d;
					}
				}
			}

			&-toast {
				margin-top: 6rpx;
				padding-left: 20rpx;
				font-size: 26rpx;
				visibility: hidden;
			}

			&-hidden {
				margin-top: 6rpx;
				padding-left: 20rpx;
				color: #b3614d;
				font-size: 26rpx;
				visibility: none;
			}

			&-btn {
				margin-top: 100rpx;
				display: flex;
				justify-content: space-between;
				padding: 0 74rpx;
				text-align: center;
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				&-cancel {
					width: 280rpx;
					background: #FFFFFF;
					border: 1px solid #A0A0A0;
					border-radius: 20px;
				}
				&-ok {
					width: 280rpx;
					color: #fff;
					background: linear-gradient(-90deg, #87A4F6, #A967F2);
					border-radius: 20px;
				}
			}
		}
	}

	.topArea	
	{
		text-align: center;
		padding: 57rpx 0rpx;
		width: 100%;
		height: 239rpx;
		background: #FFFFFF;
		border-radius: 20px;
		border: 1px solid #C2C2C2;
	}
	.topAreaContent
	{
		display: flex;
		padding: 30rpx 40rpx;
		text-align: center;
	}
	.teamVS {
		margin: auto;
		width: 80rpx;
		height: 40rpx;
		flex:2;
		text-align: center;
		background: linear-gradient(0deg, #366FFF, #C0C3FE);
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		line-height: 40rpx;
	}
	.centerArea
	{
		width: 100%;
		height: 455rpx;
		margin-top: 20rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		border: 1px solid #C2C2C2;
	}
	.centerHead
	{
		width: 100%;
		height: 60rpx;
		padding-top: 10rpx;
		background: #E3F2FF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		display: flex;
		font-size:28rpx;
		font-weight: normal;
		color: #333333;
		text-align: center;
		justify-content: space-between;
	}
	.centerSubHead
	{
		display: flex;
		justify-content: space-between;
		padding-top: 10rpx;
		&-round
		{
			width: 207rpx;
			height: 44rpx;
			background: #FFFFFF;
			border: 1px solid #C2C2C2;
			border-radius: 20rpx;
			text-align: center;
			font-size: 30rpx;
			font-weight: normal;
			color: #666666
		}
		&-content
		{
			font-size: 30rpx;
			font-weight: normal;
			color: #666666;
			text-align: center;
		}
	}
</style>
