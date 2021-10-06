<template>
	<view class="Homepage">
		<commonHead search="true" rightService="true" @change="searchChange" :searchValue="searchValue"></commonHead>
		<!-- 
		<view class="tui-flex-box">
			<tui-button class="btn" :type="active===0?'warning':'green'" height="60rpx" :size="30"
				@click="init()">{{$t('All')}}<span v-if="total">({{total}})</span>
			</tui-button>
			<tui-button :type="active===1?'warning':'green'" height="60rpx" :size="30"
				@click="detail(0)">{{$t('Nowadays')}} <span v-if="total">({{sumMoney}})</span>
			</tui-button>
			<tui-button :type="active===2?'warning':'green'" height="60rpx" :size="30"
				@click="detail(1)">{{$t('tomorrow')}} <span v-if="total">({{tomorrowSum}})</span>
			</tui-button>
			<tui-button :type="active===3?'warning':'green'" height="60rpx" :size="30"
				@click="getLeagueList">{{$t('alliance')}}
			</tui-button>
		</view> -->
		<view class="btns">
			<view class="btn" @click="init()" :class="active===0?'btn-active':''">{{$t('All')}}<span
					v-if="total">({{total}})</span></view>
			<view class="btn" @click="detail(0)" :class="active===1?'btn-active':''">{{$t('Nowadays')}} <span
					v-if="total">({{sumMoney}})</span></view>
			<view class="btn" @click="detail(1)" :class="active===2?'btn-active':''">{{$t('tomorrow')}} <span
					v-if="total">({{tomorrowSum}})</span></view>
			<view class="btn" @click="getLeagueList" :class="active===3?'btn-active':''">{{$t('alliance')}}</view>
		</view>

		<view class="hot-event">
			<eventCard v-for="(item, index) in eventInfo" :key="index" :eventInfo="item" />
			<!-- <img class="empty-data" src="/static/images/empty-data.png" alt="" v-if="resEmpty"> -->
			<view class="loading-status">{{loading_status}}</view>
		</view>
		<navigationPage :navigation_show="navigation_show" @navigationShow="navigationShow" />
		<!-- 联盟 -->
		<view>
			<u-popup class="select-pop" v-model="show" mode="bottom" height="1100">
				<view class="contents">
					<view class="common-content">
						<img src="/static/images/x.png" alt="" class="close-btn" @click="show = false">
						<view class="title">{{$t('Screening_Alliance')}}</view>
						<u-button class="type-btn1" size="default" @click="checkedAll(true)">{{$t('select_all')}}
						</u-button>
						<u-button class="type-btn1" @click="checkedAll(false)">{{$t('Unselect_all')}}</u-button>
						<u-button class="type-btn1" @click="converseSelect">{{$t('Reverse_election')}}</u-button>
						<u-button class="type-btn" @click="checkedConfirm">{{$t('determine')}}</u-button>
					</view>
					<scroll-view class="group" scroll-y="true">
						<u-checkbox-group style="height: 100%;" @change="checkboxGroupChange">
							<u-checkbox v-for="(item, index) in leagueInfo" v-model="item.checked" :key="index"
								@change="checkboxChange(index)" :name="item.leagueName">
								{{item.leagueName}}({{item.cnt}})
							</u-checkbox>
						</u-checkbox-group>
					</scroll-view>
				</view>
			</u-popup>
		</view>
	</view>
</template>


<script>
	// import tabsPage from '@/components/common/tabsPage.vue';
	import commonHead from '@/components/common/common_header.vue';
	import eventCard from '@/components/common/event_all.vue';
	import navigationPage from '@/components/common/navigation-page.vue';
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components: {
			uniSearchBar,
			uniSection
		},
		data() {
			return {
				show: false,
				searchValue: '',
				page: 1,
				toLoad: true,
				curSelect: '',
				// startTime: '',
				// endTime: '',
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
				resEmpty: false,
				popup_show: false,
				leagueInfo: [],
				isleague: false,
				list: [{
						name: 'apple',
						disabled: false
					},
					{
						name: 'banner',
						disabled: false
					},
					{
						name: 'orange',
						disabled: false
					}
				],
				value: 'orange',
				active: 0,
				total: '',
				sumMoney: '',
				tomorrowSum: '',
			}
		},
		onLoad(option) {
			if (option.searchValue) {
				this.searchValue = ''
			}
			uni.setNavigationBarTitle({
				title: this.$t('Match')
			})
			this.username = this.$queue.getData('username');
			this.money = this.$queue.getData('wallet').money;
			this.$nextTick(function() {
				if (option.searchValue) {
					this.searchValue = option.searchValue;
				} else {
					this.init();
				}
			})
			setTimeout(() => {
				this.$api.loading(false);
			}, 500);
		},
		onReachBottom() {
			if (this.toLoad) {
				this.page += 1;
				if (!this.isleague) {
					this.getMatch(this.isleague);
				}
			}
		},
		components: {
			// tabsPage,
			eventCard,
			commonHead,
			navigationPage,
		},
		watch: {
			'$route.path': function(to, from) {
				if (to.indexOf('\/match_list') != -1) {
					this.resEmpty = false
					this.init();
				}
			}
		},
		mounted() {},
		methods: {
			init() {
				this.isleague = false
				this.page = 1;
				this.active = 0;
				this.toLoad = true;
				this.eventInfo = [];
				this.getMatch(false, true);
			},
			detail(day) {
				this.isleague = false
				if (day === 0) {
					this.active = 1;
					this.curSelect = 0
				} else {
					this.active = 2;
					this.curSelect = 1
				}
				// this.endTime = this.getDay(day, '-');
				// this.startTime = this.getDay(day, '-');
				this.page = 1;
				this.toLoad = true;
				this.eventInfo = [];
				this.getMatch(false);
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
			getMatch(isleague, searchAll) {
				if (isleague) {
					let searchVal = []
					this.leagueInfo.map((i) => {
						if (i.checked) {
							return searchVal.push(i.leagueName)
						}
					})
					this.$Request
						.post('/app/sports/league_search', {
							"league": searchVal.join(",")
						}).then(res => {
							if (res.code == 0) {
								this.total = res.total
								this.sumMoney = 0
								this.tomorrowSum = 0
								if (!res.data.length) {
									this.loading_status = this.$t('download_finished');
									this.toLoad = false;
									return;
								}
								this.toLoad = false;
								this.loading_status = this.$t('download_finished');
								this.eventInfo = res.data
								if (this.eventInfo.length === 0) {
									this.resEmpty = true
								} else {
									this.resEmpty = false
								}
							} else if (res.code == 401) {
								this.$queue.showToast(res.message);
								uni.reLaunch({
									url: '../login/login',
								});
							}
						})
						.catch(res => {});
				} else {
					this.$Request
						.post('/app/sports/search_sports_item', {
							"pageNum": this.page,
							"pageSize": this.pageSize,
							"orderByColumn": 'beginTime',
							"isAsc": "asc",
							"params[day]": this.curSelect,
							"searchValue": this.searchValue
						}).then(res => {
							console.log(66, res);
							if (res.code == 0) {
								if (searchAll || isleague) {
									this.total = res.total
									this.sumMoney = res.sumMoney
									this.tomorrowSum = res.total - res.sumMoney
								}
								if (!res.rows.length) {
									this.loading_status = this.$t('download_finished');
									this.toLoad = false;
									return;
								}
								if (res.rows.length < this.pageSize) {
									this.toLoad = false;
									this.loading_status = this.$t('download_finished');
								}
								for (var i = 0; i < res.rows.length; i++) {
									var btime = res.rows[i].beginTime;
									res.rows[i]['diffTime'] = this.timeTransform(res.rows[i].remark);
								}
								this.eventInfo = this.eventInfo.concat(res.rows);
								if (this.eventInfo.length === 0) {
									this.resEmpty = true
								} else {
									this.resEmpty = false
								}
							} else if (res.code == 401) {
								this.$queue.showToast(res.message);
								uni.reLaunch({
									url: '../login/login',
								});
							}
						})
						.catch(res => {});
				}
				this.show = false
			},
			navigationShow(val) {
				this.navigation_show = val;
			},
			serviceAuto() {
				this.$queue.showToast('客服...');

			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			searchChange(v) {
				console.log('hello searchChange');
				this.search({
					value: v
				})
			},
			search(res) { // isleague:是否是联盟查找
				this.eventInfo = [];
				this.page = 1;
				this.active = 0
				this.searchValue = ''
				this.searchValue = res.value;
				this.getMatch(false); // 跑search方法的，不是搜索框搜索就是联盟查找
				if (this.isleague) {
					this.isleague = false;
				}
			},
			cancel(res) {
				this.eventInfo = [];
				this.page = 1;
				this.searchValue = '';
				this.getMatch(false, true);
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
			},
			detailShow(val) {
				this.popup_show = val;
			},
			onCancel() {
				this.popup_show = false;
			},
			radioGroupChange(e) {
				// console.log(e);
			},
			getLeagueList() {
				this.$api.loading(true);
				this.active = 3;
				this.leagueInfo = []
				this.$Request
					.post('/app/sports/sports_league', {})
					.then(res => {
						if (res.code == 0) {
							res.data.map((i) => {
								i.checked = false
							})
							this.leagueInfo = res.data;
							this.show = true
						} else if (res.code = 401) {}
					})
					.catch(res => {});
				setTimeout(() => {
					this.$api.loading(false);
				}, 500);
			},
			timeTransform(a) { // a:秒数
				if (a < 0) {
					return null;
				}
				var hours = parseInt(a / 3600);
				var minutes = parseInt(a % 3600 / 60);
				//var seconds = parseInt(difftime%60);
				if (minutes === 0) { // 小于一分钟显示一分钟
					minutes = 1
				}
				if (hours > 0) {
					return hours + 'h' + minutes + 'm';
				}
				if (hours === 0 || hours < 0) {
					return minutes + 'm';
				}
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(index) {
				if (!this.leagueInfo[index].checked) {
					this.leagueInfo[index].checked = false;
				} else {
					this.leagueInfo[index].checked = true;
				}
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 全选
			checkedAll(bo) {
				this.leagueInfo.map(val => {
					val.checked = bo;
				})
			},
			//反选
			converseSelect() {
				this.leagueInfo.map(val => {
					val.checked = !(val.checked);
				})
			},
			checkedConfirm() {
				this.isleague = true;
				this.getMatch(true)
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
		.example-body {}

		.tui-flex-box {
			display: flex;
			flex-wrap: nowrap;

			.btn {
				background-color: red;

			}
		}

		.btns {
			display: flex;
			flex-wrap: nowrap;
			font-size: 24rpx;

			.btn {
				flex: 1;
				border: 1rpx solid rgba(0, 0, 0, 0);
				border-left: 1rpx solid #999;
				background-image: linear-gradient(to bottom, #FFFFFF, #E9E9E9);
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				color: #3B3B3B;
			}

			.btn:first-child {
				border-left: unset;
			}

			.btn-active {
				height: 63rpx;
				color: #FF5E5E;
				border-bottom: 1rpx solid #FF5E5E;
			}
		}

		.wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #f86c49;
			padding: 10rpx 30rpx;
			font-size: 28rpx;
			color: #fff;

			&-unfold {
				width: 40rpx;
				height: 40rpx;
			}

			&-letter {
				width: 40rpx;
				margin: 0 15rpx 0 15rpx;
				height: 40rpx;
			}

			&-body {
				flex: 1;
				display: flex;
				align-items: center;

				&-avatar {
					width: 80rpx;
					height: 80rpx;
					margin: 0 10rpx 0 40rpx;
					border-radius: 50%;

					&-user {
						height: 80rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}
				}
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
			padding: 17rpx 30rpx 0;

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

	.empty-data {
		width: 100%;
	}

	.loading-status {
		width: 100%;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		color: #999;
		text-align: center;

	}

	.u-radio-group {
		width: 100%;
		padding: 20rpx;
	}

	.u-radio {
		width: 100% !important;
	}

	/deep/.u-drawer__scroll-view {
		height: 1100rpx;
	}

	/deep/.u-checkbox__label {
		width: 560rpx;
		display: inline-block;
		white-space: wrap;
	}

	.select-pop {
		.contents {
			height: 1100rpx;
			padding: 0 30rpx;

			.common-content {
				font-size: 34rpx;
				height: 494rpx;
				display: flex;
				flex-direction: column;
				text-align: center;

				.close-btn {
					width: 42rpx;
					height: 42rpx;
					position: absolute;
					top: 30rpx;
				}

				.title {
					color: #333333;
					font-weight: 700;
					margin-top: 50rpx;
				}

				.type-btn1 {
					height: 64rpx;
					width: 540rpx;
					margin-top: 24rpx;
					color: #999;
				}

				.type-btn {
					height: 64rpx;
					width: 540rpx;
					margin-top: 24rpx;
					color: #fff;
					background: #111113;
					border-radius: 18rpx;
					overflow: hidden;
				}
			}

			.group {
				height: 606rpx;
			}
		}
	}

	/deep/.u-drawer-bottom {
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
	}

	/deep/.u-checkbox__icon-wrap--square {
		border-radius: 50% !important;
	}

	/deep/.u-checkbox__icon-wrap--checked {
		background-color: #C93E2D !important;
		border: #C93E2D !important;
	}

	/deep/.u-hairline-border::after {
		border-radius: 36rpx !important;
		overflow: hidden;
		border: none;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.28);
	}

	/deep/.u-checkbox__label {
		text-align: center;
		width: 610rpx;
		color: #111113;
	}
</style>
