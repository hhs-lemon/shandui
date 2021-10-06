<template>
	<view class="">
		<commonHead background="url('/static/images/deep_nav_bg.png') no-repeat center!important" :backIcon="true"
			:title="this.$t('proxy_rule')"></commonHead>
		<view style="width: 100vw;text-align: center;">
			<image mode="widthFix" src="/static/images/my/rule.jpg" style="width: 690rpx; border-radius: 20px;margin-top: 20rpx;"></image>
		</view>
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';

	export default {
		data() {
			return {
				qr_url: '/static/images/home/WechatIMG22.png',
				activeCode: '',
				invitation_url: 'http://58win.com/#/pages/login/register?code='
			};
		},
		components: {
			commonHead,
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('proxy_rule')
			})
		},
		methods: {
		},
	};
</script>

<style lang="scss" scoped>

</style>
