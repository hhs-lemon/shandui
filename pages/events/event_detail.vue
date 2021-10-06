<template>
	<view class="wrap">
		<commonHead background="url('/static/images/deep_nav_bg.png') no-repeat center!important" :backIcon="true"
			:title="this.$t('Event_Details')"></commonHead>
		<image class="pic" src="https://cdn.uviewui.com/uview/common/logo.png" mode="widthFix"></image>
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';

  export default {
	  
		components: {
			commonHead
		},
    data() {
      return {}
    },
	onLoad() {
		uni.setNavigationBarTitle({
			title:this.$t('Event_Details')
		})

	},
    onReady() {
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
	.pic{
		width: 100%;
	}
</style>
