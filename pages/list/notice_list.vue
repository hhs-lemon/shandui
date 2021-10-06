<template>
	<view class="Homepage">
		<!-- <uni-nav-bar color="#FEFEFE" left-icon="back" backgroundColor="transparent" @clickLeft="goBack()"
			:title="this.$t('Message_center')"></uni-nav-bar> -->
		<commonHead :backIcon="true" :title="this.$t('Message_center')"></commonHead>
		<view class="details">
			<view class="details-tab">
				<view @click="tabs(3)" :class="tab==3 ? 'active': ''">{{$t('official')}}
					<view v-if="tab==3" class="border-line"></view>
				</view>
				<view @click="tabs(1)" :class="tab==1 ? 'active': ''">{{$t('Event')}}
					<view v-if="tab==1" class="border-line"></view>
				</view>
				<view @click="tabs(2)" :class="tab==2 ? 'active': ''">{{$t('Match')}}
					<view v-if="tab==2" class="border-line"></view>
				</view>
			</view>
		</view>
		<view class="notice-list">
			<eventCard v-for="(item, index) in eventInfo" :key="index" :eventInfo="item" />
		</view>
	</view>
</template>


<script>
	import eventCard from '@/pages/notice/notice_all.vue';
	import commonHead from '@/components/common/common_header.vue';
	export default {
		data() {
			return {
				notice: '-',
				page: 1,
				toLoad: true,
				pageSize: 20,
				loading_status: this.$t('Loading'),
				showModal: false,
				eventInfo: [],
				formData: {
					value: 3,
				},
				type: [{
						text: this.$t('official'),
						value: 3
					},
					{
						text: this.$t('Event'),
						value: 1
					},
					{
						text: this.$t('Match'),
						value: 2
					}
				],
				tab: 3
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$t('announcement')
			})
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
			this.init();
		},
		onReachBottom() {
			console.log('onReachBottom');
			if (this.toLoad) {
				console.log('onReachBottom add record');
				this.page += 1;
				this.getNotice();
			}
		},
		components: {
			eventCard,
			commonHead,
		},
		mounted() {},
		methods: {
			init() {
				this.page = 1;
				this.toLoad = false;
				this.eventInfo = [];
				//this.getMatch();
				this.getNotice();
			},
			tabs(index) {
				this.tab = index;
				this.page = 1;
				this.eventInfo = [];
				this.getNotice();
			},
			getNotice() {
				//公告
				this.$Request.post('/app/news/list', {
						"pageNum": this.page,
						"pageSize": 20,
						"orderByColumn": 'createTime',
						"isAsc": "desc",
						"type": this.tab
					}).then(res => {
						if (res.code == 0) {
							// this.eventInfo = [];
							this.eventInfo = this.eventInfo.concat(res.rows);
							if (res.rows.length < 20) {
								this.toLoad = false;
							} else {
								this.toLoad = true;
							}
						} else if (res.code == 401) {
							this.$queue.showToast(res.message);
							uni.reLaunch({
								url: '../login/login',
							});
						}
					})
					.catch(res => {});
			},
			serviceAuto() {
				this.$queue.showToast('客服...');

			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			search(res) {
				this.eventInfo = [];
				this.page = 1;
				this.searchValue = res.value;
				this.getMatch();
			},
			diffTime(a) {
				var new_date = new Date();
				var old_date = new Date(a);
				var difftime = (old_date - new_date) / 1000;
				//var difftime = (new_date- old_date)/1000;
				if (difftime <= 0) {
					return null;
				}
				var days = parseInt(difftime / 86400);
				var hours = parseInt(difftime / 3600) - 24 * days;
				var minutes = parseInt(difftime % 3600 / 60);
				//var seconds = parseInt(difftime%60);
				if (days > 0) {
					return days + 'd' + hours + 'h';
				}
				if (hours > 0) {
					return hours + 'h' + minutes + 'm';
				}
			},
			paging(val) {
				this.page = val;
				console.log(val);
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/style/index.css';

	page {
		background-color: #fff;
	}

	.Homepage {
		.notice-list {
			&-title {
				display: flex;
				justify-content: space-between;
				align-content: center;
			}

			&-body {
				font-size: 20rpx;
				border-radius: 20rpx;
				background: #f86c49;
				height: 120rpx;
				font-weight: bold;
			}
		}

		.details {
			height: 72rpx;
			border-bottom: 15rpx solid #f7f7f7;

			&-tab {
				margin: 15rpx 0rpx;
				display: flex;
				justify-content: space-between;
				color: #666666;

				uni-view {
					flex: 1;
					text-align: center;
					box-sizing: border-box;
					font-size: 30rpx;
					font-weight: 400;
					line-height: 50rpx;
				}

				.active {
					color: #325bff;
					position: relative;
				}

				.border-line {
					width: 35%;
					margin: auto;
					border-bottom: 4rpx solid #779DFF;
				}
			}
		}

	}

	.loading-status {
		width: 100%;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		color: #999;
		text-align: center;

	}
</style>
