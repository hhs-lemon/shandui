<!--
 * @Author: zhanchunlei
 * @Date: 2021-01-18 14:36:22
 * @LastEditors: zhanchunlei
 * @LastEditTime: 2021-01-18 15:12:07
 * @Description: 写下这个页面的描述
-->
<template>
	<view class="tabs">
		<view class="tabs-list">
			<text
				class="tabs-list-text"
				v-for="(it, index) in tabList"
				:key="it.name"
				:class="count==index ? 'tabs-list-active' : ''"
				@click="tabs(index)"
			>
				{{it.name}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			eventInfo: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
				count: 0,
				tabList: [{
					id: "tab01",
					name: '最新',
					newsid: 0
				}, {
					id: "tab02",
					name: '大公司',
					newsid: 23
				}, {
					id: "tab03",
					name: '内容',
					newsid: 223
				}, {
					id: "tab04",
					name: '消费',
					newsid: 221
				}, {
					id: "tab05",
					name: '娱乐',
					newsid: 225
				}, {
					id: "tab06",
					name: '区块链',
					newsid: 208
				}],	
			}
		},
		methods: {
			tabs(val) {
				this.count = val;
				this.$emit('tabObj', this.tabList[val]);
			},
		}
	}
</script>

<style lang="scss" scoped>
.tabs {
    width: 750rpx;
    height: 84rpx;
	display: flex;
    flex-direction: row;
    white-space: nowrap;
	border-bottom: 2rpx solid #ccc;
	&-list {
		display: flex;
		align-items: center;
		overflow-x: auto;
		height: 100%;
		&-text {
			display: flex;
			align-items: center;
			height: 100%;
			padding: 0 40rpx;
			color: #555;
    		font-size: 30rpx;
			border-bottom: 4rpx solid transparent;
		}
		&-active {
			color: #007AFF;
			border-bottom: 4rpx solid #007AFF;
		}
	}
}
</style>
