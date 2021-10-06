<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="recharge">
							<view class="recharge-top">
								<view v-for="(v, i) in data" @click="payTab(i)"
									:style="pay_tab === i ? { color: '#ff00ff', background: '#e9f5f8', }:{}" :key="i">
									{{v.title}}
								</view>
							</view>
							<view class="recharge-info">
								<view v-if="type==-1">
									<view>{{$t('No_recharge_channels_available')}}
									</view>
								</view>
								<view v-if="type==-1">
									<view>{{$t('No_recharge_channels_available')}}
									</view>
								</view>
								<view v-if="type==0">
									<view @click="copy(content.cardNo)">{{$t('Bank_card_number')}}
										:{{content.cardNo}}({{$t('Click_to_copy')}}
										) </view>
									<view @click="copy(content.bankName)">{{$t('Bank_Name')}}
										:{{content.bankName}}({{$t('Click_to_copy')}}
										)</view>
									<view @click="copy(content.cardHolder)">{{$t('Cardholder_Name')}}
										:{{content.cardHolder}}({{$t('Click_to_copy')}}
										)</view>
									<view @click="copy(content.branchName)">{{$t('Branch_Name')}}
										:{{content.branchName}}({{$t('Click_to_copy')}}
										)</view>
								</view>
								<view v-if="type==1">
									<view @click="copy(content.account)">{{$t('Alipay_account')}}
										:{{content.account}}({{$t('Click_to_copy')}}
										)</view>
									<view @click="copy(content.realName)">{{$t('Name')}}
										:{{content.realName}}({{$t('Click_to_copy')}}
										) </view>
								</view>
								<view @click="copy(content.receiptAddress)" v-if="type==3">
									<view>USDT{{$t('address')}}
										: {{content.receiptAddress}}({{$t('Click_to_copy')}}
										)</view>
									<view>{{$t('Chain_name')}}
										: {{content.usdtType}}</view>
								</view>
							</view>

							<view class="recharge-input">
								<view>{{$t('Recharge_amount')}}
									{{$t('Money_symbol')}}({{$t('least')}}
									{{minAmount/100}})
								</view>
								<input type='number' v-model="recharge" :placeholder="this.$t('please_enter')" />
								<view @click="rechargeClear">X</view>
							</view>
							<view>{{$t('Rechargeable_unit')}}
								：{{minAmount/100}}～{{maxAmount/100}}</view>
							<view>
								<view @click="rechargeChange(100)">+100</view>
								<view @click="rechargeChange(500)">+500</view>
								<view @click="rechargeChange(1000)">+1K</view>
								<view @click="rechargeChange(5000)">+5K</view>
							</view>
							<view>
								<view @click="rechargeChange(10000)">+10000</view>
								<view @click="rechargeChange(20000)">+20000</view>
								<view @click="rechargeMin()">{{$t('least')}}
								</view>
								<view @click="rechargeMax()">{{$t('most')}}
								</view>
							</view>
							<view class="recharge-footer">
								<view>{{$t('pay_attention')}}
									：</view>
								<view>
									<view>0.</view>
									<view>{{$t('Please_note_the_user_name_for_recharge')}}</view>
								</view>
								<view>
									<view>1.</view>
									<view>
										{{$t('Every_time_you_recharge_please_log_in_to_the_platform_to_check_the_latest_recharge_information')}}
									</view>
								</view>
								<view>
									<view>2.</view>
									<view>{{$t('If_submitted')}}</view>
								</view>
								<view>
									<view>3.</view>
									<view>
										{{$t('Pay_according_to_the_single_minimum_recharge_amount_and_the_single_maximum_recharge_amount_provided_on_the_platform')}}
									</view>
								</view>
								<view>
									<view>4.</view>
									<view>{{$t('If_any_money_laundering_fraud_is_discovered_using_this_platform')}}
									</view>
								</view>
								<view @click="rechargeSubmit">{{$t('Recharge_Submit')}}</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="withdraw">
							<view class="withdraw-head">
								<view class="withdraw-head-to">{{$t('Account_Channel')}}</view>
								<view class="withdraw-head-way">
									<view class="withdraw-head-way-1" @tap="bankList">
										<image class="way-icon" src="/static/images/money.png"></image>
										<text class="way-text">{{bankNo}}</text>
									</view>
									<view class="withdraw-head-way-2">{{$t('Only_supports_integers')}}</view>
								</view>
							</view>
							<view class="withdraw-body">
								<text>{{$t('Withdrawal_Amount')}}</text>
								<view class="input-money">
									<text class="rmb">{{$t('Money_symbol')}}</text>
									<input v-model.number="extract" type="number" @focus.prevent="stopKeyborad"
										class="t-input" />
								</view>
								<view class="info-money">
									<view v-if="is_code">
										<text class="info-money-num" style="color: #ff1e0f;">
											{{$t('Current_remaining_coding_amount')}}{{ (this.code).toFixed(0) }}{{this.$t('yuan')}}，{{$t('Unwithdrawable')}}</text>
									</view>
									<view v-else-if="is_out">
										<text class="info-money-num"
											style="color: #ff1e0f;">{{$t('The_amount_entered_exceeds_the_withdrawal_balance')}}，{{this.$t('Account_Balance')}}{{ pool }}{{this.$t('yuan')}}</text>
									</view>
									<view v-else-if="is_lowest">
										<text class="info-money-num"
											style="color: #ff1e0f;">{{$t('lowest')}}{{ lowest }}{{$t('Yuanqi_Withdrawal')}}，{{this.$t('Account_Balance')}}{{ pool }}{{this.$t('yuan')}}</text>
									</view>
									<view v-else>
										<text
											class="info-money-num">{{$t('Current_withdrawal_balance')}}{{ pool }}{{this.$t('yuan')}}，</text>
										<text class="info-money-all" @click="getAll">{{$t('Withdraw_all')}}</text>
									</view>
								</view>
								<view :class="'tx' + (is_post ? '-active' : '')"><button
										@click="handleShowModel">{{this.$t('withdraw')}}</button></view>
							</view>

							<view :class="['keyboard', keyboradShow ? '' : 'active', isIphoneX ? 'isIphone' : '']">
								<block v-for="(item, index) in 9" :key="index">
									<view class="keyboard-item" @tap="keyboradKey(index + 1)">{{ index + 1 }}</view>
								</block>
								<view class="keyboard-item hide"></view>
								<view class="keyboard-item" @tap="keyboradKey(0)"><text>0</text></view>
								<view class="keyboard-item delte" @tap="keyboradDel()">
									<image class="img" src="/static/images/del.png" mode="aspectFill" :lazy-load="true">
									</image>
								</view>
							</view>

							<view class="cu-modal" :class="showModal ? 'show' : ''">
								<view class="cu-dialog">
									<view class="cu-bar bg-white justify-end">
										<view class="content">{{$t('Withdraw_Confirmation')}}</view>
									</view>
									<view class="padding-xl" style="text-align: left;">
										<view>
											<text>{{$t('Withdrawal_Amount')}}：</text>
											<text class="text-red fee">
												{{ money }}
												<em>{{this.$t('yuan')}}</em>
											</text>
										</view>
										<view class="margin-top-sm">
											<text>{{$t('Actual_arrival')}}</text>
											<text class="text-red fee">
												{{ real_money }}
												<em>{{this.$t('yuan')}}</em>
											</text>
										</view>
										<view class="margin-top-sm">
											<text>{{$t('Service_Fee')}}：</text>
											<text class="text-red fee">
												{{ service_fee }}
												<em>{{this.$t('yuan')}}</em>
											</text>
										</view>
										<view class="margin-top-sm">
											<text>{{$t('Withdrawal_Fee_Rate')}}：</text>
											<text class="text-red">{{ ratio}}%</text>
										</view>
										<view v-if="sys_free_num>0" class="margin-top-sm">
											<text>{{$t('Daily_free_handling_fee')}}：</text>
											<text class="text-red">{{ sys_free_num}}次 </text>
											<text>{{$t('Number_of_hands_free_remaining')}}：</text>
											<text class="text-red">{{ sys_free_num_left}}次</text>
										</view>

									</view>
									<tui-keyboard :radius="radius" :show="show" @close="closeKeyboard"
										@click="keyboardClick">
										<view class="tui-digital-box">
											<view class="tui-keyboard-tips">
												{{this.$t('Please_enter_the_security_password') }}
											</view>
											<tui-keyboard-input :inputvalue="pwdArr"></tui-keyboard-input>
										</view>
									</tui-keyboard>
									<view class="cu-bar bg-white justify-end">
										<view class="action">
											<button class="cu-btn margin-left" @tap="showModal = false">{{$t('cancel')}}
											</button>
											<!--
											<button class="cu-btn bg-green margin-left" @tap="getMoney">{{$t('Confirm_withdrawal')}}</button>
											-->
											<tui-button class="cu-btn bg-green margin-left" @tap='switchKeyboard(6)'>
												{{$t('Confirm_withdrawal')}}
											</tui-button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<!-- 下拉 -->
						<view class="u-m-p-50">
							<view class="u-demo-area u-flex u-row-center">
								<u-dropdown ref="uDropdown">
									<u-dropdown-item :title="$t('Hint')">
										<view class="slot-content">
											<view class="item-box">
												<view class="item" :class="[item.active ? 'active' : '']" @tap="tagClick(index)" v-for="(item, index) in list3" :key="index">
													{{item.label}}
												</view>
											</view>
											<hr>
											<view class="item-box">
												<view class="item" :class="[item.active ? 'active' : '']" @tap="tagClick(index)" v-for="(item, index) in list3" :key="index">
													{{item.label}}
												</view>
											</view>
											<u-button type="primary" @click="closeDropdown">确定</u-button>
										</view>
									</u-dropdown-item>
								</u-dropdown>
							</view>
						</view>
						<!-- 账变明细 -->
						<view class="flexView">
							<view class="scrollView">
								<view class="list-view">
									<view class="list-item" v-for="(item, index) in transactionList" :key="index" hover-class="hover" :hover-stay-time="150" bindtap="detail">
										<view class="content-box">
											<view class="des-box">
												<view @click="copy(item.serialId)" class="tit">{{$t('order_number')}}:{{item.serialId }}</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==1">
													{{$t('Recharge')}}+
												</view>
												<view class="source" :style="{color:'#4caf50'}" v-if="item.type==2">
													{{$t('withdraw')}}-
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==3">
													{{$t('proxy')}}+
												</view>
												<view class="source" :style="{color:'#4caf50'}" v-if="item.type==4">
													{{$t('Bet')}}-
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==5">
													{{$t('Cancellation_of_return')}}+
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==6">
													{{$t('Registered_Jackpot')}}+
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==7">
													{{$t('Recharge_Jackpot')}}+
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==8">
													{{$t('Subordinate_Registration_Jackpot')}}+
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==9">
													{{$t('Lower_Level_Recharge_Jackpot')}}+
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==10">
													{{$t('Manual_recharge')}}+
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==11">
													{{$t('Bet_income')}}+
												</view>
												<view class="source" :style="{color:'#ff1e0f'}" v-if="item.type==12">
													{{$t('Manual_withdrawal')}}-
												</view>
												<view class="time">{{ item.createTime }}</view>
											</view>
										</view>
										<view class="money">{{ (item.amount/100).toFixed(0)}}{{$t('Money_symbol')}}</view>
									</view>
								</view>
								<view class="loading-status">{{loading_status}}</view>
								<view class="tip">{{$t('Only_display_the_records_in_the_last_month')}}</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [
					[],
					[],
					[],
					[]
				],
				dataList: [{
						id: 1,
						store: '夏日流星限定贩卖',
						deal: '交易成功',
						goodsList: [{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								type: '灰色;M',
								deliveryTime: '付款后30天内发货',
								price: '348.58',
								number: 2
							},
							{
								goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
								title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
								type: '45cm;S',
								deliveryTime: '付款后30天内发货',
								price: '135.00',
								number: 1
							}
						]
					},
					{
						id: 2,
						store: '江南皮革厂',
						deal: '交易失败',
						goodsList: [{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '粉色;M',
							deliveryTime: '付款后7天内发货',
							price: '128.05',
							number: 1
						}]
					},
					{
						id: 3,
						store: '三星旗舰店',
						deal: '交易失败',
						goodsList: [{
								goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
								title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
								type: '4K，广色域',
								deliveryTime: '保质5年',
								price: '1998',
								number: 3
							},
							{
								goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
								title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
								type: '容量大，速冻',
								deliveryTime: '保质5年',
								price: '2354',
								number: 1
							}
						]
					},
					{
						id: 4,
						store: '三星旗舰店',
						deal: '交易失败',
						goodsList: [{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
								title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
								type: '4K，广色域',
								deliveryTime: '珍藏10年好酒',
								price: '1543',
								number: 3
							},
							{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
								title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
								type: '一打',
								deliveryTime: '口感好',
								price: '120',
								number: 1
							}
						]
					},
					{
						id: 5,
						store: '三星旗舰店',
						deal: '交易成功',
						goodsList: [{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
							title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
							type: '识别效率高',
							deliveryTime: '使用方便',
							price: '451',
							number: 9
						}]
					}
				],
				list: [{
						name: '充值'
					},
					{
						name: '提现'
					},
					{
						name: '交易'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				// 充值
				pay_tab: 0,
				content: {},
				button_enable: true,
				type: -1,
				recharge: 0,
				extract: '',
				lowest: 100,
				minAmount: 0,
				maxAmount: 0,
				data: [],
				// 提现
				show: false,
				numberArr: [],
				pwdArr: ["", "", "", "", "", ""],
				temp: ["", "", "", "", "", ""],
				radius: false,
				pwd: '',

				buttonRect: {},
				pool: 0,
				extract: '',
				service_fee: 0.0,
				high: 0,
				code: 0,
				bankNo: '-',
				banks: [],
				itemList: [],
				showModal: false,
				//是否超过总额
				is_out: false,
				is_lowest: false,
				//是否还需要打码
				is_code: true,
				//是否显示
				is_post: false,
				lowest: 100,
				sys_free_num: 0,
				sys_free_num_left: 0,
				ratio: 0,
				money: '',
				real_money: '',
				keyboradShow: false,
				isIphoneX: false,
				isRefuse: false,
				// 交易记录
				value1: '',
				value2: '2',
				mask: true,
				list3: [{
						label: '琪花瑶草',
						active: true,
					},
					{
						label: '清词丽句',
						active: false,
					},
					{
						label: '宛转蛾眉',
						active: false,
					},
					{
						label: '煦色韶光',
						active: false,
					},
					{
						label: '鱼沉雁落',
						active: false,
					},
					{
						label: '章台杨柳',
						active: false,
					},
					{
						label: '霞光万道',
						active: false,
					}
				],
				// 账变明细
				page: 1,
				pageSize: 20,
				toLoad:true,
				loading_status: this.$t('Loading'),
				transactionList: [],
				username: '-',
				id: '-',
				withdraw_num:0,
				withdraw_going:0,
				withdraw_amount:0,
				currentTab: 0,
				tabs: [
					{
						name: this.$t('today')
					}, {
						name: this.$t('This_week')
					}, {
						name: this.$t('Two_weeks')
					}, {
						name: this.$t('this_month')
					}
				]
			};
		},
		watch: {
			extract(oldVal, newVal) {}
		},
		onLoad() {
			this.getOrderList(0);
			this.getOrderList(1);
			this.getOrderList(3);
			
			var token = this.$queue.getData('token');
			//没有token就去登录页面
			if (!token) {
				uni.reLaunch({
					url: '../login/login',
				});
			
			}
			//充值
			this.init();
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		methods: {
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
			// 页面数据
			getOrderList(idx) {
				for (let i = 0; i < 5; i++) {
					let index = this.$u.random(0, this.dataList.length - 1);
					let data = JSON.parse(JSON.stringify(this.dataList[index]));
					data.id = this.$u.guid();
					this.orderList[idx].push(data);
				}
				this.loadStatus.splice(this.current, 1, "loadmore")
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(0);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
				// 提现
				if(index===1){
					this.$api.loading(true);
					this.loadData();
					this.init2();
					setTimeout(() => {
						this.$api.loading(false);
					}, 500);
				}else if(index===2){
					this.getRecord();
					this.$api.loading(true);
					setTimeout(() => {
						this.$api.loading(false);
					}, 500);
				}
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},

			//充值
			payTab(val) {
				this.pay_tab = val;
				this.content = JSON.parse(this.data[this.pay_tab].content);
				this.type = this.data[this.pay_tab].type;
				this.recharge = 0;
				this.minAmount = this.data[this.pay_tab].minAmount;
				this.maxAmount = this.data[this.pay_tab].maxAmount;
			},
			init() {
				this.$Request
					.get('/app/recharge/setting', {})
					.then(res => {
						if (res.code == 0) {
							console.log('--0-');
							for (var i = 0; i < res.data.length; i++) {
								var method_recharge = {
									id: res.data[i].id,
									title: res.data[i].title,
									orderNum: res.data[i].orderNum,
									content: res.data[i].content,
									type: res.data[i].type,
									minAmount: res.data[i].minAmount,
									maxAmount: res.data[i].maxAmount,
								};
								this.data.push(method_recharge);
							}
							if (res.data.length == 0) {
								this.type = -1;
							} else {
								//todo: 有可能没有充值渠道
								this.data.sort(this.cmp);
								this.payTab(0);
							}
						} else if (res.code == 401) {
							this.$queue.showToast(res.message);
							uni.reLaunch({
								url: '../login/login',
							});
						} else if (res.code == 500) {
							this.$queue.showToast(res.message);
							setTimeout(() => {
								uni.reLaunch({
									url: '../user/user'
								});
							}, 3000);
							return;
						}
					})
					.catch(res => {});
			},
			cmp(a, b) {
				//按orderNum排序的
				return a.orderNum - b.orderNum;
			},
			rechargeChange(val) {
				this.recharge += val;
			},
			rechargeMin() {
				this.recharge = this.minAmount;
			},
			rechargeMax() {
				this.recharge = this.maxAmount / 100;
			},
			copy(value) {
				console.log(333, uni.setClipboardData())
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: this.$t('Copy_content'),
					success: () => { //点击复制内容的后调函数
						//uni.setClipboardData方法就是讲内容复制到粘贴板
						// API `setClipboardData` is not yet implemented
						//意思是H5端没有这个接口！！！
						if (document.execCommand) {
							let oInput = document.createElement('input');
							oInput.value = value;
							document.body.appendChild(oInput);
							oInput.select(); // 选择对象;
							document.execCommand("Copy"); // 执行浏览器复制命令
							// 复制成功提示;
							uni.showToast({
								title: this.$t('Copy_successful'),
								icon: 'none',
								duration: 2000
							});
							oInput.remove()
						} else {
							uni.setClipboardData({
								data: value, //要被复制的内容
								success: function() {
									//在success中加入uni.hideToast()可以解决
									uni.hideToast({
										title: this.$t('Copy_successful'),
										duration: 2000,
										icon: 'none'
									});
									//以下就可自定义操作了~
								},
								fail: function(err) {
									console.log(44, err)
									uni.showToast({
										title: this.$t('Copy_failed'),
										duration: 2000,
										icon: 'none'
									});
								}
							});
						}
					}
				});
			},
			rechargeSubmit() {
				if (this.type == 3) {
					if (this.recharge > this.maxAmount || this.recharge < this.minAmount) {
						this.$queue.showToast(this.$t('The_recharge_unit_range_is') + this.minAmount + '~' + this
							.maxAmount + this.$t('Please_fill_in_again')
						);
						return;
					}
				} else {
					if (this.recharge > this.maxAmount / 100 || this.recharge < this.minAmount / 100) {
						this.$queue.showToast(this.$t('The_recharge_unit_range_is') +
							this.minAmount / 100 + '~' + this.maxAmount / 100 + this.$t('Please_fill_in_again')
						);
						return;
					}
				}
				if (this.button_enable) {
					this.button_enable = false;
				} else {
					return;
				}
				this.$Request
					.post('/app/recharge/submit', {
						amount: this.recharge,
						method_id: this.data[this.pay_tab].id
					})
					.then(res => {
						if (res.code == 0) {
							this.$queue.showToast(this.$t('Successful_application'));
							setTimeout(() => {
								uni.navigateBack();
							}, 2000);
							return;
						} else if (res.code = 401) {
							this.$queue.showToast(res.message);
							setTimeout(() => {
								uni.reLaunch({
									url: '../user/user'
								});
							}, 3000);
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			rechargeClear() {
				this.recharge = 0;
			},
			// 提现
			init2() {
				this.$Request
					.get('/app/withdraw/info', {})
					.then(res => {
						if (res.code == 0) {
							if (res.data.bank == 0) {
								uni.navigateTo({
									url: '../user/bankcard_add'
								});
								return;
							}
							if (res.data.withdraw == 1) {
								this.$queue.showToast(this.$t('Withdrawals_are_being_processed'));
								// setTimeout(() => {
								// 	uni.reLaunch({
								// 		url: '../user/user'
								// 	});
								// }, 2000);
								this.change(0)
								return;
							}
							this.pool = res.data.wallet.money ;
							this.service_fee = res.data.fee / 100;
							this.ratio = res.data.ratio;
							this.lowest = res.data.lowest / 100;
							this.high = res.data.high / 100;
							this.sys_free_num = res.data.sys_free_num;
							this.sys_free_num_left = res.data.sys_free_num_left;
							this.code = res.data.wallet.code / 100;
							this.banks = res.data.banks;
							this.sumbmit_card_id = res.data.banks[0].id;
							this.bankNo = this.banks[0].bankName + '/****' + this.banks[0].cardNo.substring(this.banks[
								0].cardNo.length - 4);
							for (var i = 0; i < res.data.banks.length; i++) {
								var cardNoTail = res.data.banks[i].cardNo;
								this.itemList.push(res.data.banks[i].bankName + '/****' + cardNoTail.substring(
									cardNoTail.length - 4));
							}
							//是否需要打码
							if (this.code <= 0) {
								this.is_code = false;
							}
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {});
			},
			async loadData() {
				this.$nextTick(() => {
					this.keyboradShow = true;
				});
			},
			stopKeyborad() {
				uni.hideKeyboard();
			},
			keyboradKey(key) {
				this.extract = this.extract * 10 + key;
				this.checkMoney();
			},
			keyboradDel() {
				if (this.extract && this.extract > 0) {
					let val = parseInt(this.extract / 10);
					if (val == 0) val = '';
					this.extract = val;
					this.checkMoney();
				}
			},
			getAll() {
				this.extract = parseInt(this.pool);
				this.checkMoney();
			},
			checkMoney() {
				if (this.is_code) {

				} else if (!this.extract || this.extract < this.lowest) {
					this.is_lowest = true;
					this.is_post = false;
				} else if (this.extract > this.pool) {
					this.is_out = true;
					this.is_lowest = false;
					this.is_post = false;
				} else {
					this.is_out = false;
					this.is_lowest = false;
					this.is_post = true;
				}
				if (parseFloat(this.extract).toString() == 'NaN') {
					this.is_post = false;
					this.$api.msg(this.$t('The_amount_entered_is_illegal'));
				}
			},
			handleShowModel() {
				if (this.isRefuse) return;
				this.checkMoney();
				if (!this.is_post) return;
				this.money = this.extract;
				//this.service_fee = Number((this.extract * (this.fee / 100)).toString().match(/^\d+(?:\.\d{0,2})?/));
				this.real_money = Number((this.extract - this.ratio * this.extract / 100 - this.service_fee).toString()
					.match(/^\d+(?:\.\d{0,2})?/));
				this.showModal = true;
			},
			bankList() {
				const that = this
				uni.showActionSheet({
					title: this.$t('Withdraw_to'),
					itemList: this.itemList,
					popover: {
						top: that.buttonRect.top * 2 + that.buttonRect.height,
						left: that.buttonRect.left + that.buttonRect.width / 2
					},
					success: (e) => {
						//this.bankNo = this.banks[e.tapIndex].bankName + '/' + this.banks[e.tapIndex].cardNo;
						this.bankNo = this.banks[e.tapIndex].bankName + '/****' + this.banks[e.tapIndex].cardNo
							.substring(this.banks[e.tapIndex].cardNo.length - 4);
						this.sumbmit_card_id = this.banks[e.tapIndex].id;
					}
				})
			},

			//提现提交
			getMoney() {
				this.showModal = false;
				if (this.isRefuse) return;
				this.isRefuse = true;
				this.$Request
					.post('/app/withdraw/submit', {
						amount: this.money,
						pwd: this.pwd,
						id: this.sumbmit_card_id
					})
					.then(res => {
						console.log(res);
						if (res.code == 0) {
							setTimeout(() => {
								this.$api.msg(this.$t('Withdrawal_application_has_been_submitted'));
							}, 1000);
							uni.reLaunch({
								url: '../user/user'
							});
						} else {
							this.closeKeyboard();
							setTimeout(() => {
								this.$api.msg(res.message);
							}, 1000);
						}
						this.isRefuse = false;
					})
					.catch(res => {});
			},
			switchKeyboard(index) {
				let length = index; //e.currentTarget.dataset.length;
				let arr = ["", "", "", "", "", ""]
				let radius = false
				this.pwdArr = arr;
				this.temp = arr;
				this.numberArr = [];
				this.radius = radius;
				this.show = true
			},
			closeKeyboard: function() {
				this.show = false;
				this.numberArr = [];
				this.pwdArr = this.temp
			},
			getPwd: function() {
				//判断并取出密码
				if (this.numberArr.length === this.pwdArr.length) {
					let pwd = this.numberArr.join('')
					this.pwd = pwd;
					console.log(pwd)
					this.closeKeyboard();
					this.showModal = false;
					this.getMoney();
				}
			},
			keyboardClick: function(e) {
				let numberArr = this.numberArr;
				let pwdArr = this.pwdArr;
				let index = e.index;
				if (numberArr.length === pwdArr.length || index == undefined) {
					return;
				}
				if (index == 9) { //取消键
					this.closeKeyboard();
					return;
				} else if (index == 11) {
					//退格键
					let len = numberArr.length;
					if (len) {
						pwdArr.splice(len - 1, 1, "");
					} else {
						pwdArr = this.temp;
					}
					numberArr.pop()
				} else if (index == 10) {
					numberArr.push(0);
					pwdArr.splice(numberArr.length - 1, 1, "●");
				} else {
					numberArr.push(index + 1);
					pwdArr.splice(numberArr.length - 1, 1, "●");
				}
				console.log('111 提现');
				this.numberArr = numberArr;
				this.pwdArr = pwdArr;
				this.getPwd();
			},
			//交易记录
			closeDropdown() {
				this.$refs.uDropdown.close();
			},
			tagClick(index) {
				this.list3[index].active = !this.list3[index].active;
			},
			getRecord(){
				this.$Request
					.post('/app/walletrecord/list', {
						"pageNum": this.page,
						"pageSize":this.pageSize,
						isAsc:'desc',
						orderByColumn: 'id', 
					})
					.then(res => {
						console.log(res);
						if (res.code==0) {
							if (!res.rows.length) {
								this.loading_status = this.$t('download_finished');
								this.toLoad = false;
								return;
							}
							if (res.rows.length < this.pageSize) {
								this.toLoad = false;
								this.loading_status = this.$t('download_finished');
							}
							this.withdraw_num = res.total;
							this.withdraw_amount= res.sumMoney;
							this.transactionList = this.transactionList.concat(res.rows);
							var item = this.transactionList[0];
							if(item.status==0){
								this.withdraw_going = item.amount;
							}
						} else {
							this.$queue.showToast(res.message);
						}
					})
					.catch(res => {
					});
			},
			changeTab(e) {
				this.currentTab = e.index;
				this.getRecord();
				this.$api.loading(true);
				setTimeout(() => {
					this.$api.loading(false);
				}, 500);
			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			}
		},
		onPullDownRefresh() {
			this.loadData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	//
	.recharge {
		padding: 40rpx 20rpx 20rpx;
		background: #fff;

		&-top {
			display: flex;
			align-items: center;

			view {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 50rpx;
				background: #e0e0e0;
				padding: 0 20rpx;
				border-radius: 25rpx;
				margin-right: 20rpx;
				font-size: 24rpx;
			}
		}

		&-info {
			padding: 20rpx;
			margin-top: 40rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 8rpx solid #00a5a5;
			border-radius: 20rpx;
			font-size: 30rpx;
		}

		&-input {
			padding: 20rpx;
			margin-top: 40rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 8rpx solid #00a5a5;
			border-radius: 20rpx;
			font-size: 50rpx;

			view:first-child {
				position: absolute;
				top: -26%;
				left: 20rpx;
				background: #fff;
				font-size: 30rpx;
				color: #ff8252;
			}
		}

		>view:nth-child(3) {
			padding-left: 20rpx;
			margin-bottom: 20rpx;
			font-size: 30rpx;
			color: #828282;
		}

		>view:nth-child(4) {
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				flex: 1;
				padding: 16rpx 0;
				margin-right: 16rpx;
				background: #f6f6f6;
				text-align: center;
				border-radius: 8rpx;
				font-weight: 500;
				box-shadow: 2rpx 2rpx 2rpx #a5a5a5;
			}

			view:last-child {
				margin-right: 0;
			}
		}

		>view:nth-child(5) {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 10rpx;
			border-bottom: 1rpx solid #e8e8e8;

			view {
				flex: 1;
				padding: 16rpx 0;
				margin-right: 16rpx;
				margin-top: 20rpx;
				background: #f6f6f6;
				text-align: center;
				border-radius: 8rpx;
				font-weight: 400;
				box-shadow: 2rpx 2rpx 2rpx #a5a5a5;
			}

			view:last-child {
				margin-right: 0;
			}
		}

		>view:nth-child(6) {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 10rpx;
			border-bottom: 1rpx solid #e8e8e8;

			view {
				flex: 1;
				padding: 16rpx 0;
				margin-right: 16rpx;
				margin-top: 20rpx;
				background: #f6f6f6;
				text-align: center;
				border-radius: 8rpx;
				font-weight: 400;
				box-shadow: 2rpx 2rpx 2rpx #a5a5a5;
			}

			view:last-child {
				margin-right: 0;
			}
		}

		&-balance {
			padding: 10rpx;
			border-bottom: 2rpx dotted #a5a5a5;

			view:first-child {
				font-size: 24rpx;
				color: #979996;
			}

			view:last-child {
				font-size: 32rpx;
				color: #9c9c9c;
				margin-top: 10rpx;
			}
		}

		&-footer {
			padding: 30rpx 20rpx 20rpx;
			margin-top: 20rpx;
			border-radius: 8rpx;
			box-shadow: 0 0 4rpx #a5a5a5;

			>view:first-child {
				font-size: 24rpx;
				font-weight: 500;
			}

			>view:nth-child(n + 2) {
				display: flex;
				color: #f66;
				margin: 5rpx;

				>view:first-child {
					width: 35rpx;
				}

				>view:last-child {
					flex: 1;
				}
			}

			>view:last-child {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 20rpx;
				margin-top: 30rpx;
				border-radius: 8rpx;
				background: #51a39e;
				color: #fff;
				font-weight: block;
			}
		}
	}

	// 提现
	.withdraw {
		padding: 20px;

		&-head {
			background-color: #f7f7f7;
			display: flex;
			align-content: center;
			padding: 20px 30px;
			font-size: 15px;

			&-way {
				display: flex;
				flex-direction: column;
				align-content: center;
				margin-left: 20px;

				&-1 {
					color: #576b95;
					margin-bottom: 10px;

					.way-icon {
						width: 16px;
						height: 16px;
						margin-right: 5px;
						top: 2px;
					}
				}

				&-2 {
					color: #acacac;
					font-size: 12px;
				}
			}
		}

		&-body {
			background-color: #fff;
			padding: 20px 30px;
			font-size: 14px;

			.input-money {
				display: flex;
				align-content: center;
				font-weight: 600;
				border-bottom: 0.5px solid #eaeef1;

				.rmb {
					font-size: 2em;
					top: 10px;
					position: relative;
				}

				.t-input {
					height: 1.9em;
					font-size: 2.5em;
					border: none;
					position: relative;
					left: 3.5%;
					outline: none;
				}
			}

			.info-money {
				margin-top: 10px;
				font-size: 12px;
				margin-bottom: 20px;

				&-num {
					color: #b2b2b2;
				}

				&-all {
					color: #576b95;
				}
			}

			.tx {
				button {
					color: #b2b2b2;
				}
			}

			.tx-active {
				button {
					color: #fff;
					background: #07c160;
				}
			}
		}

		.keyboard {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #ebebeb;
			display: flex;
			justify-content: center;
			z-index: 2;
			flex-wrap: wrap;
			transition: all 0.2s ease-in 0.2s;
		}

		.active {
			bottom: -400rpx;
		}

		.keyboard-item {
			box-sizing: border-box;
			width: 250rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: #fff;
			font-size: 40rpx;
			color: #333;
			height: 99rpx;
			border: 1rpx solid #ebebeb;
			border-top: none;
			border-left: none;
		}

		.hide {
			opacity: 0;
		}

		.delte {
			background: none;
			box-shadow: none;
		}

		.delte image {
			width: 60rpx;
			height: 60rpx;
		}

		.isIphone {
			padding-bottom: 68rpx !important;
		}

		.fee {
			em {
				font-size: 0.5rem;
				font-style: normal;
			}
		}
	}
	// 交易记录
	.u-config-wrap {
		padding: 40rpx;
	}
	
	.slot-content {
		background-color: #FFFFFF;
		padding: 24rpx;
		
		.item-box {
			margin-bottom: 50rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.item {
				border: 1px solid $u-type-primary;
				color: $u-type-primary;
				padding: 8rpx 40rpx;
				border-radius: 100rpx;
				margin-top: 30rpx;
			}
			
			.active {
				color: #FFFFFF;
				background-color: $u-type-primary;
			}
		}
	}
	.flexView {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		.scrollView {
			width: 100%;
			height: 100%;
			flex: 1;
			overflow-y: auto;
			overflow-x: hidden;
			position: relative;
			padding-bottom: 116rpx;
			.head-read {
				background: linear-gradient(to right, #ff8440, #ff1e0f);
				background-color: #ff8440;
				padding-bottom: 100rpx;
				.flex {
					display: flex;
					align-items: center;
					padding: 50rpx;
					position: relative;
					.read-img {
						width: 120rpx;
						height: 120rpx;
						border-radius: 100%;
						overflow: hidden;
						margin-right: 20rpx;
						border: 4rpx solid rgba(255, 255, 255, 0.3);
					}
					.flex-box {
						flex: 1;
						min-width: 0;
						font-size: 26rpx;
						color: #333;
						&-text {
							margin: 10rpx 0;
							color: #f5f5f5;
							font-weight: normal;
						}
					}
					.arrow {
						position: relative;
						padding-right: 30rpx;
						span {
							font-size: 28rpx;
							color: white;
						}
						&:after {
							content: ' ';
							display: inline-block;
							height: 12rpx;
							width: 12rpx;
							border-width: 4rpx 4rpx 0 0;
							border-color: #848484;
							border-style: solid;
							transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
							position: relative;
							top: -4rpx;
							position: absolute;
							top: 50%;
							margin-top: -8rpx;
							right: 4rpx;
							border-radius: 2rpx;
						}
					}
					.arrow-one:after {
						border-color: white;
						margin-top: -6rpx;
					}
				}
			}
			.white-box {
				width: 94%;
				background: white;
				border-radius: 10rpx;
				margin: -120rpx auto 20rpx;
				box-shadow: 0 6rpx 20rpx #e7e7e7;
				.tx {
					padding-top: 26rpx;
					overflow: hidden;
					display: flex;
					justify-content: space-between;
					align-content: center;
					&-grid {
						box-sizing: border-box;
						&:first-child {
							margin-left: 40rpx;
						}
						&-comm-sign {
							display: block;
							border-radius: 40rpx 0 0 40rpx;
							font-size: 26rpx;
							padding: 16rpx 44rpx;
							background: linear-gradient(to right, #fef082, #ffc551);
							background-color: #fef082;
							color: #cf4400;
						}
						&-text {
							display: block;
							color: #333;
							font-size: 26rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							.title {
								font-size: 26rpx;
								font-weight: normal;
								color: #ff6423;
							}
							.money {
								font-size: 60rpx;
								color: #ff6423;
								letter-spacing: 2rpx;
								margin-bottom: 10rpx;
								&-b {
									font-size: 28rpx;
								}
							}
						}
					}
				}
				.palace {
					padding-bottom: 20rpx;
					overflow: hidden;
					display: flex;
					justify-content: center;
					&-grid {
						flex: 1;
						position: relative;
						box-sizing: border-box;
						&:not(:last-child) {
							&:after {
								width: 1rpx;
								height: 80rpx;
								background: #fddece;
								content: ' ';
								display: inline-block;
								position: absolute;
								top: 0;
								right: 0;
							}
						}
						&-text {
							display: block;
							text-align: center;
							color: #333;
							font-size: 32rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							&-name {
								font-size: 26rpx;
								font-weight: normal;
								color: #ff8a4a;
							}
							&-data {
								font-size: 32rpx;
								color: #ff8a4a;
								letter-spacing: 2rpx;
								margin-bottom: 5rpx;
								&-b {
									font-size: 20rpx;
								}
							}
						}
					}
				}
			}
		}
	}
	.list-view {
		position: relative;
		width: 100%;
		overflow: hidden;
	}
	
	.list-item {
		width: 100%;
		padding: 30rpx 28rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		border-bottom: 1rpx solid #eaeef1;
	}
	
	.item-last::after {
		left: 0 !important;
	}
	
	.content-box {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	
	.des-box {
		min-height: 80rpx;
		padding-left: 28rpx;
		box-sizing: border-box;
		vertical-align: top;
		color: #333;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.tit {
		font-size: 32rpx;
		max-width: 420rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.source {
		margin: 12rpx 0;
	}
	.time {
		color: #888;
	}
	
	.money {
		font-size: 38rpx;
		font-weight: 500;
		color: #ff1e0f;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-left: 20rpx;
	}
	
	.less {
		color: #4caf50 !important;
	}
	.tip {
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
		align-content: center;
		font-size: 24rpx;
		color: #888;
	}
	.loading-status {
		width: 100%;
		padding: 20rpx 0;
		font-size: 28rpx;
		color: #999;
		text-align: center;
	
	}
</style>
