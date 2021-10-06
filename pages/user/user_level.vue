<!--
 * @Author: your name
 * @Date: 2021-02-07 18:05:19
 * @LastEditTime: 2021-03-04 21:01:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\pages\user\user_level.vue
-->
<template>
	<view>
		<uni-section :title="this.$t('Level_Growth_Route')" type="line"></uni-section>
		<view class="example-body">
			<uni-steps :options="list1" active-color="#007AFF" :active="active" />
		</view>
		<uni-section :title="this.$t('Level_Conditions')" type="line"></uni-section>
		<view class="example-body">
			<uni-steps :options="list2" active-color="#007AFF" :active="active" direction="column"/>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				active: 0,
				list1: [
				],
				list2: [
				]
			}
		},
		onLoad(){
			uni.setNavigationBarTitle({
				title:this.$t('membership_level')
			})
			this.init();
		},
		methods: {
			orderNumCmp(a, b){
				return a.orderNum - b.orderNum;
			},
			init(){
				var token = this.$queue.getData('token');
				//没有token就去登录页面
				if(!token){
					uni.reLaunch({
						url: '../login/login',
					});

				}
				this.$Request
					.post('/app/userlevel/info', {
					})
					.then(res => {
						if (res.code==0) {
							this.active = res.data.level - 1 ;
							console.log(this.active);
							var data = res.data.levels;
							data.sort(this.orderNumCmp);
							for(var i=0;i<res.data.levels.length;i++){
								var row1 = {
									title: res.data.levels[i].levelName,
								}
								this.list1.push(row1);
								var row2 = {
									title: res.data.levels[i].levelName,
									desc: this.$t('Recharge_amount_reached') + res.data.levels[i].rechargeAmount/100+ this.$t('yuan')+this.$t('Level_Reward') + res.data.levels[i].bonus/100 + this.$t('yuan'),
								}
								this.list2.push(row2);
							}
						} else if(res.code=401){
							this.$queue.showToast(res.message);
							uni.reLaunch({
								url: '../login/login',
							});
						}
					})
					.catch(res => {
					});
			}

		}
	}
</script>

<style>
	@charset "UTF-8";

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}

	/* #endif */
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.status-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 92rpx;
		margin: 30rpx;
		background-color: #007AFF;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		flex-direction: row;
	}
</style>