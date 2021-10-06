<!--
 * @Author: your name
 * @Date: 2021-02-25 13:33:30
 * @LastEditTime: 2021-02-25 13:59:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \app\pages\user\fab.vue
-->
<template>
	<view class="uni-fab-box">
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction" @trigger="trigger" @fabClick="fabClick" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				directionStr: this.$t('vertical'),
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
				},
				content: [
				]
			}
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		methods: {
			trigger(e) {
			},
			fabClick() {
				uni.showToast({
					title: this.$t('Clicked_the_floating_button'),
					icon: 'none'
				})
			},
		}
	}
</script>

<style>
	.uni-fab-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

</style>