<template>
	<view class="Homepage">
		<commonHead :backIcon="true" backColor="#000" :title="this.$t('Event_Results')" background="#eee"
			:titleStyle="{'color':'#000'}">
		</commonHead>
		<view class="time-search" @click="dateOpen">
			<img src="/static/images/shaixuan.png" alt="">
		</view>
		<view>
			<view class="example-body">
				<!-- <view class="search">
					<button class="search-btn" type="primary" @click="dateOpen">
						<icon type="search" size="30rpx"></icon>{{$t('Date_Search')}}
					</button>
				</view> -->
				<view class="select_group">
					<button class="tody-btn" :type="active===0?'primary':'default'"
						@click="today()">{{$t('Nowadays')}}</button>
					<button class="yestoday-btn" :type="active===1?'primary':'default'"
						@click="yesterday()">{{$t('yesterday')}}</button>
					<!-- <button class="mini-btn" :type="active===2?'warn':'primary'" size="mini"
						@click="week()">{{$t('Nearly_seven_days')}}</button> -->
				</view>
			</view>
		</view>

		<view class="hot-event">
			<eventCard v-for="(item, index) in eventInfo" :key="index" :eventInfo="item" />
			<view class="loading-status">{{loading_status}}</view>
			<u-back-top :customStyle="{'background':'#999'}" :iconStyle="{'color': '#fff','fontSize': '60rpx'}"
				:scroll-top="scrollTop"></u-back-top>
		</view>
		<uni-calendar ref="calendar" class="uni-calendar--hook" :clear-date="true" :date="info.date"
			:insert="info.insert" :lunar="false" :startDate="info.startDate" :endDate="info.endDate" :range="info.range"
			@confirm="confirm" @close="close" />
	</view>
</template>


<script>
	import eventCard from '@/components/common/event_result.vue';
	import commonHead from '@/components/common/common_header.vue';
	export default {
		data() {
			return {
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				searchValue: '',
				page: 1,
				toLoad: true,
				pageSize: 20,
				navigation_show: false,
				indicatorDots: true, //指示点
				autoplay: true, //自动播放
				is_withdraw: false,
				loading_status: this.$t('Loading'),
				list: [],
				username: '-',
				money: 0,
				id: '-',
				showModal: false,
				currentTab: 0,
				eventInfo: [],
				startTime: '0',
				endTime: '0',
				active: 0,
				scrollTop: 0
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$t('Race_result_query')
			})
			this.username = this.$queue.getData('username');
			this.money = this.$queue.getData('wallet').money;
			if (option.searchValue) {
				this.searchValue = option.searchValue;
			}
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
			this.init();
		},
		onReachBottom() {
			if (this.toLoad) {
				this.page += 1;
				this.getMatch(this.startTime, this.endTime);
			}
		},
		components: {
			eventCard,
			commonHead,
		},
		mounted() {},
		methods: {
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			init() {
				this.page = 1;
				this.toLoad = true;
				this.eventInfo = [];
				this.today();
			},
			goHome() {
				console.log('---');
				uni.reLaunch({
					url: '../home/index',
				});
			},
			dateOpen() {
				this.open();
			},
			open() {
				this.$refs.calendar.open()
			},
			close() {},
			today() {
				this.active = 0
				var endTime = this.getDay(0, '-');
				var startTime = this.getDay(0, '-');
				this.page = 1;
				this.toLoad = true;
				this.eventInfo = [];
				this.getMatch(startTime, endTime);

			},
			yesterday() {
				this.active = 1
				var endTime = this.getDay(-1, '-');
				var startTime = this.getDay(-1, '-');
				this.page = 1;
				this.toLoad = true;
				this.eventInfo = [];
				this.getMatch(startTime, endTime);

			},
			week() {
				this.active = 2
				var endTime = this.getDay(0, '-');
				var startTime = this.getDay(-7, '-');
				this.page = 1;
				this.toLoad = true;
				this.eventInfo = [];
				this.getMatch(startTime, endTime);
			},
			confirm(e) {
				var startTime = e.range.before;
				var endTime = e.range.after;
				this.page = 1;
				this.toLoad = true;
				this.eventInfo = [];
				this.getMatch(startTime, endTime);
			},
			getMatch(startTime, endTime) {
				console.log(startTime);
				console.log(endTime);
				this.startTime = startTime;
				this.endTime = endTime;
				this.$Request.post('/app/sports/search_sports_item_result', {
						"pageNum": this.page,
						"pageSize": this.pageSize,
						"status": 1,
						"orderByColumn": 'beginTime',
						"isAsc": "asc",
						"params[beginTime]": startTime,
						"params[endTime]": endTime
					}).then(res => {
						if (res.code == 0) {
							if (!res.rows.length) {
								this.loading_status = this.$t('download_finished');
								this.toLoad = false;
								return;
							}
							if (res.rows.length < this.pageSize) {
								this.toLoad = false;
								this.loading_status = this.$t('download_finished');
							}
							/*
							for(var i=0;i<res.rows.length;i++){
								var btime = res.rows[i].beginTime;
								res.rows[i]['diffTime'] =  this.diffTime(btime);
							}
							*/
							this.eventInfo = this.eventInfo.concat(res.rows);
						} else if (res.code = 401) {
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
			getDay(num, str) {
				var today = new Date();
				var nowTime = today.getTime();
				var ms = 24 * 3600 * 1000 * num;
				today.setTime(parseInt(nowTime + ms));
				var oYear = today.getFullYear();
				var oMoth = (today.getMonth() + 1).toString();
				if (oMoth.length <= 1) oMoth = '0' + oMoth;
				var oDay = today.getDate().toString();
				if (oDay.length <= 1) oDay = '0' + oDay;
				return oYear + str + oMoth + str + oDay;
			},
			diffTime(a) {
				var new_date = new Date();
				var old_date = new Date(a);
				var difftime = (new_date - old_date) / 1000;
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
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/style/index.css';

	page {
		background-color: #eee;
	}

	.Homepage {
		.search {
			padding: 5rpx 70rpx;
			background: #F0EDF1;
			height: 60rpx;

			.search-btn {
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #999;
				background: #fff;
				border-radius: 40rpx;
				color: #7C7C7C;
				font-size: 24rpx;
			}
		}

		.message-notice {
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			font-size: 28rpx;
			background: #f86c49;
			color: #fff;

			&-icon {
				width: 28rpx;
				height: 28rpx;
				margin-left: 60rpx;
			}
		}

		.order-status {
			display: flex;
			justify-content: flex-end;
			padding: 20rpx;
			background: #fff;

			.status-item {
				display: flex;
				align-items: center;
				padding: 8rpx 30rpx;
				margin-left: 10rpx;
				border-radius: 4rpx;
				background: #f86c49;
				color: #ffffff;
			}
		}

		.hot-event {
			&-title {
				display: flex;
				justify-content: space-between;
				align-content: center;
			}

			&-body {
				font-size: 20rpx;
				border-radius: 20rpx;
				background: #f86c49;
				font-weight: bold;
			}
		}
	}

	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}

	.loading-status {
		width: 100%;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		color: #999;
		text-align: center;

	}

	.select_group {
		text-align: center;

		button {
			width: 240rpx;
			height: 56rpx;
			line-height: 56rpx;
			display: inline-block;
			font-size: 26rpx;
		}

		uni-button {
			border-radius: unset;
			border: 1rpx solid #3B79FF;
		}

		uni-button[type='default'] {
			color: #3B79FF;
		}

		.tody-btn {
			border-top-left-radius: 50rpx !important;
			border-bottom-left-radius: 50rpx !important;
		}

		.yestoday-btn {
			border-top-right-radius: 50rpx !important;
			border-bottom-right-radius: 50rpx !important;
		}


	}

	.time-search {
		position: fixed;
		z-index: 1000;
		right: 30rpx;
		top: 20rpx;

		img {
			width: 40rpx;
		}
	}
</style>
