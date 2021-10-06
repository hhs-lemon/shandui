<!--
 * @Author: your name
 * @Date: 2021-01-01 16:29:32
 * @LastEditTime: 2021-02-25 16:55:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\pages\list\wallet_list.vue
-->

<template>
	<view>
		<!-- #ifndef H5 -->
		<view class="ns">{{this.$t('My_Balance')}}</view>
		<!-- #endif -->
		<view class="flexView">
			<view class="scrollView">
				<view class="list-view">
					<view class="list-item" v-for="(item, index) in list" :key="index" hover-class="hover" :hover-stay-time="150" bindtap="detail">
						<view class="content-box">
							<view class="des-box">
								<view @click="copy(item.ipaddr)" class="tit">{{ 'IP:' + item.ipaddr}}</view>
								<view class="source" :style="{color:'#ff1e0f'}">
									{{$t('terminal')}}:{{item.os}}
								</view>
								<view class="time">{{$t('time')}}:{{ item.loginTime}}</view>
							</view>
						</view>
						<view class="money">{{item.loginLocation}}</view>
					</view>
				</view>
				<view class="loading-status">{{loading_status}}</view>
				<view class="tip">{{this.$t('Show_only_recent')}}</view>
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
			page: 0,
			pageSize: 20,
			loading_status: this.$t('Loading'),
			list: [],
			username: '-',
			money:0,
			id: '-',
			showModal: false,
			withdraw_num:0,
			withdraw_going:0,
			withdraw_amount:0,
			date: 'incomeMonth',
			currentTab: 0,
			tabs: [
				{
					name: this.$t('today')
				}, 
				{
					name: this.$t('This_week')
				},
				{
					name: this.$t('Two_weeks')
				},
				{
					name: this.$t('this_month')
				}
			]
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title:this.$t('Login_history')
		})
		this.$api.loading(true);
		this.page = 0;
		this.loadData();
		this.getRecord();
		setTimeout(() => {
			this.$api.loading(false);
		}, 500);
	},
	onReachBottom() {
		this.page += 1;
		// setTimeout(() => {
		this.getRecord();
		// }, 1000)
	},
	methods: {
		copy(value) {
			console.log(333,uni.setClipboardData() )
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
									console.log(44,err)
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
		getRecord(){
			this.$Request
				.post('/app/loginlog/history', {
					"pageNum": this.page,
					"pageSize":this.pageSize,
					isAsc:'desc',
					orderByColumn: 'id', 
				})
				.then(res => {
					console.log(res);
					if (res.code==0) {
						if (!res.rows.length) {
							this.loading_status = this.$t('download_finished');
							return;
						}
						if (res.rows.length < this.pageSize) {
							this.loading_status = this.$t('download_finished');
						}
						this.withdraw_num = res.total;
						this.withdraw_amount= res.sumMoney;
						this.list = this.list.concat(res.rows);
						var item = this.list[0];
						if(item.status==0){
							this.withdraw_going = item.amount;
						}
					} else {
						this.$queue.showToast(res.message);
					}
				})
				.catch(res => {
				});
		},
		async loadData() {
			this.id= this.$queue.getData('id');
			this.username = this.$queue.getData('username');
			this.money= this.$queue.getData('money');
			console.log('init...');
			//this.getRecord();
		},
		changeTab(e) {
			this.currentTab = e.index;
			this.getRecord();
			this.$api.loading(true);
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
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
	background-color: #fff;
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
	overflow: hidden;
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
	padding-left: 28rpx;
	box-sizing: border-box;
	vertical-align: top;
	color: #333;
	font-size: 24rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.tit {
	font-size: 32rpx;
	max-width: 420rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.source {
	margin: 12rpx 0;
}
.time {
	color: #888;
}

.money {
	font-size: 38rpx;
	font-weight: 500;
	color: #ff1e0f;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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
</style>
