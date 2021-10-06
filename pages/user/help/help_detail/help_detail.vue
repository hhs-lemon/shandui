<template>
	<view class="share">
		<commonHead background="url('/static/images/deep_nav_bg.png') no-repeat center!important" :backIcon="true"
			:rightService="true"></commonHead>
		<view class="ques-content">
			<view class="ques-item" v-for="(item,i) in list[listId][listIndex]">
				<view class="ques-title">
					<img src="static/images/bangzhuzx/question.png" alt="">
					<view class="title">{{item.title}}</view>
				</view>
				<view class="answer">
					<img src="static/images/bangzhuzx/answer.png" alt="">
					<view>
						<view class="desc-text" v-for="(v,indx) in item.detail" :key="indx">{{v}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';

	export default {
		data() {
			return {
				listId: 0,
				listIndex: 0,
				list: [
					[ //列表1
						[ //充值提现
							{
								title: this.$t('How_to_recharge'),
								detail: [
									this.$t('How_to_recharge1'), this.$t('How_to_recharge2'), this.$t(
										'How_to_recharge3'), this.$t('How_to_recharge4'), this.$t(
										'How_to_recharge5'), this.$t('How_to_recharge6'),
								]
							},
							{
								title: this.$t('How_to_withdraw'),
								detail: [
									this.$t('How_to_withdraw1'), this.$t('How_to_withdraw2'), this.$t(
										'How_to_withdraw3'), this.$t('How_to_withdraw4'), this.$t(
										'How_to_withdraw5'), this.$t('How_to_withdraw6'), this.$t(
										'How_to_withdraw7'),
								]
							},
							{
								title: this.$t('How_to_check_recharge'),
								detail: [
									this.$t('How_to_check_recharge1'), this.$t('How_to_check_recharge2'), this.$t(
										'How_to_check_recharge3'), this.$t('How_to_check_recharge4'), this.$t(
										'How_to_check_recharge5'), this.$t('How_to_check_recharge6'),
								]
							},

						],
						[ // 反波胆
							{
								title: this.$t('Anticorruptions'),
								detail: [
									this.$t('Anticorruption1'), this.$t('Anticorruption2'),
								]
							},
							{
								title: this.$t('Anticorruptions2'),
								detail: [
									this.$t('Anticorruption3'), this.$t('Anticorruption4'), this.$t(
										'Anticorruption5'),
								]
							},
							{
								title: this.$t('Anticorruption_half'),
								detail: [
									this.$t('Anticorruption_half1'), this.$t('Anticorruption_half2'), this.$t(
										'Anticorruption_half3'), this.$t('Anticorruption_half4'),
								]
							},
						],
						[ // 下单流程
							{
								title: this.$t('custom_order'),
								detail: [
									this.$t('custom_order1'), this.$t('custom_order2'), this.$t('custom_order3'),
									this.$t('custom_order4'), this.$t('custom_order5'), this.$t('custom_order6'),
								]
							},
							{
								title: this.$t('check_order_list'),
								detail: [
									this.$t('check_order_list1'), this.$t('check_order_list2'),
								]
							},
							{
								title: this.$t('game_res_check'),
								detail: [
									this.$t('game_res_check1'), this.$t('game_res_check2'), this.$t(
										'game_res_check3'),
								]
							}
						],
						[ // 注册流程
							{
								title: this.$t('registration_process'),
								detail: [
									this.$t('registration_process1'), this.$t('registration_process2'), this.$t(
										'registration_process3'), this.$t('registration_process4'), this.$t(
										'registration_process5'),
								]
							}
						]
					],
					[ //列表2
						[ //概述
							{
								title: this.$t('Overview1'),
								detail: [
									this.$t('Overview1_1'),
								]
							},
							{
								title: this.$t('Overview2'),
								detail: [
									this.$t('Overview2_1'), this.$t('Overview2_2'), this.$t('Overview2_3'), this
									.$t('Overview2_4'), this.$t('Overview2_5'), this.$t('Overview2_6'), this.$t(
										'Overview2_7'), this.$t('Overview2_8'), this.$t('Overview2_9'), this.$t(
										'Overview2_10'), this.$t('Overview2_11'), this.$t('Overview2_12'), this.$t(
										'Overview2_13'), this.$t('Overview2_14'), this.$t('Overview2_15'), this.$t(
										'Overview2_16'), this.$t('Overview2_17'),
								]
							},
							{
								title: this.$t('Overview3'),
								detail: [
									this.$t('Overview3_1'), this.$t('Overview3_2'), this.$t('Overview3_3'), this
									.$t('Overview3_4'),
								]
							},
							{
								title: this.$t('Overview4'),
								detail: [
									this.$t('Overview4_1'), this.$t('Overview4_2'),
								]
							},
							{
								title: this.$t('Overview5'),
								detail: [
									this.$t('Overview5_1'), this.$t('Overview5_2'), this.$t('Overview5_3')
								]
							},
							{
								title: this.$t('Overview6'),
								detail: [
									this.$t('Overview6_1'), this.$t('Overview6_2'), this.$t('Overview6_3'), this
									.$t('Overview6_4'),
								]
							},
							{
								title: this.$t('Overview7'),
								detail: [
									this.$t('Overview7_1'),
								]
							},

						],
						[ //规则与条款
							{
								title: this.$t('use_rule'),
								detail: [
									this.$t('use_rule1'), this.$t('use_rule2'),
								]
							},
							{
								title: this.$t('accese_rule'),
								detail: [
									this.$t('accese_rule1'), this.$t('accese_rule2'), this.$t('accese_rule3'), this
									.$t('accese_rule4'),
								]
							},
							{
								title: this.$t('Disclaimer'),
								detail: [
									this.$t('Disclaimer1'), this.$t('Disclaimer2'), this.$t('Disclaimer3'),
								]
							},

						]
					],
				]
			};
		},
		components: {
			commonHead,
		},
		methods: {
			onLoad(option) {
				this.listId = option.listId
				this.listIndex = option.listIndex
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ques-content {
		padding: 0 30rpx 0;

		.ques-item {
			margin: 42rpx 0;

			img {
				width: 42rpx;
				height: 42rpx;
				margin-right: 28rpx;
			}

			.ques-title {
				display: flex;
				color: #2D2C2C;
				font-size: 30rpx;
				margin-bottom: 26rpx;
				font-weight: bold;
			}

			.answer {
				display: flex;
				color: #2D2C2C;
				font-size: 26rpx;

				.desc-text {}
			}
		}
	}
</style>
