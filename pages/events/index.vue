<template>
	<view class="tabs">
		<commonHead :backIcon="true" :title="$t('Hint')"
			background="url('/static/images/deep_nav_bg.png') no-repeat center!important"></commonHead>
		<!-- <u-button :custom-style="customStyle" @click="btnClick" size="mini" type="default"> -->
		<u-button :custom-style="customStyle" size="mini" type="default">
			<!-- {{$t('All_offers')}}
			<img style="margin-left: 42rpx;" src="/static/images/events/down_more.png" alt="" width="12rpx"> -->
		</u-button>
		<!-- 活动列表 -->
		<view>
			<view class="item-warp">
				<view class="item" v-for="(item, index) in list" :key="index" @click="goTo(item.loadingUrl)">
					<u-lazy-load loadingImg="/static/images/events/loading.png" errorImg="/static/images/events/err.png" threshold="-450" height="400"
						img-mode="aspectFill" border-radius="10" :image="item.displayUrl" :index="index"
						@statusChange="statusChange" @clickImg="clickImg">
					</u-lazy-load>
				</view>
			</view>
			<view class="loading-status">{{status}}</view>
			<!-- <u-loadmore :status="status" @loadmore="getData"></u-loadmore> -->
		</view>
		<!-- 弹框 -->
		<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :closeable="false">
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view class="redio-item">{{item.name}}</view>
					</label>
				</radio-group>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import commonHead from '@/components/common/common_header.vue';

	export default {
		components: {
			commonHead,
		},
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 20,
				toLoad: true,
				status: this.$t('Loading'),
				data: [],
				customStyle: {
					width: '100%', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					fontSize: "30rpx",
					color: "#E074FE",
					height: "50rpx"
				},
				show: false,
				mode: 'center',
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '巴西'
					},
					{
						value: 'JPN',
						name: '日本'
					},
					{
						value: 'ENG',
						name: '英国'
					},
					{
						value: 'FRA',
						name: '法国'
					},
				],
				current: 0
			}
		},
		onLoad() {
			this.page = 1;
			this.toLoad = true;
			uni.setNavigationBarTitle({
				title: this.$t('Event_Hall')
			})
			this.getData();
		},
		onReachBottom() {
			if (this.toLoad) {
				this.status = this.$t('Loading');
				this.page += 1;
				this.getData();
			}
		},
		onReady() {},
		methods: {
			statusChange(status) {
				//console.log(status);
			},
			getData() {
				let index = 0;
				this.status = this.$t('Loading');
				this.$Request
					.post('/app/activity/activity_list', {
						"pageNum": this.page,
						"pageSize": this.pageSize,
						isAsc: 'desc',
						orderByColumn: 'createTime',
					})
					.then(res => {
						if (res.code == 0) {
							if (!res.rows.length) {
								this.status = this.$t('download_finished');
								this.toLoad = false;
								return;
							}
							if (res.rows.length < this.pageSize) {
								this.toLoad = false;
								this.status = this.$t('download_finished');
							}
							this.list = this.list.concat(res.rows)
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			btnClick() {
				this.show = true
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			goTo(path) {
				uni.navigateTo({
					url: path,
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.item-warp {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 10rpx 25rpx;
	}

	.item-warp .item {
		flex: 0 0 100%;
		height: 268rpx;
		margin-bottom: 20rpx;
		border-radius: 25rpx;
		box-shadow: 0 0 10rpx 0 #ccc;
		overflow: hidden;
	}

	/* 列表 */
	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-hover {
		background-color: #eee;
	}

	.uni-list-cell-pd {
		padding: 22rpx 30rpx;
	}

	.uni-list-cell-left {
		white-space: nowrap;
		font-size: 28rpx;
		padding: 0 30rpx;
	}

	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}

	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list .uni-list-cell:last-child::after {
		height: 0rpx;
	}

	.uni-list-cell-last.uni-list-cell::after {
		height: 0rpx;
	}

	.uni-list-cell-divider {
		position: relative;
		display: flex;
		color: #999;
		background-color: #f7f7f7;
		padding: 15rpx 20rpx;
	}

	.uni-list-cell-divider::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell-divider::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell-navigate {
		font-size: 30rpx;
		padding: 22rpx 30rpx;
		line-height: 48rpx;
		position: relative;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-navigate {
		padding-right: 36rpx;
	}

	.uni-navigate-badge {
		padding-right: 50rpx;
	}

	.uni-list-cell-navigate.uni-navigate-right:after {
		font-family: uniicons;
		content: '\e583';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-list-cell-navigate.uni-navigate-bottom:after {
		font-family: uniicons;
		content: '\e581';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-list-cell-navigate.uni-navigate-bottom.uni-active::after {
		font-family: uniicons;
		content: '\e580';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-collapse.uni-list-cell {
		flex-direction: column;
	}

	.uni-list-cell-navigate.uni-active {
		background: #eee;
	}

	.uni-list.uni-collapse {
		box-sizing: border-box;
		height: 0;
		overflow: hidden;
	}

	.uni-collapse .uni-list-cell {
		padding-left: 20rpx;
	}

	.uni-collapse .uni-list-cell::after {
		left: 52rpx;
	}

	.uni-list.uni-active {
		height: auto;
	}

	.uni-list-cell {
		justify-content: flex-start
	}

	.redio-item {
		margin-left: 10rpx;
	}

	.loading-status {
		width: 100%;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		color: #999;
		text-align: center;

	}
</style>
