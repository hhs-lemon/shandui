<template>
  <view class="wrap">
      <image v-if="!backIcon"
          @click="navigationShow(true)"
          class="wrap-unfold"
          mode="scaleToFill"
          src="/static/images/home/zhankai.png"
      ></image>
	  <u-icon v-else name="arrow-left" @click="navBack" size="60" color="black" style="width: 70rpx; height: 70rpx;"></u-icon>
      <view class="wrap-body">
        <image
            class="wrap-body-avatar"
            mode="aspectFill"
            src="/static/images/user/avatar.jpg"
            @click="navTo('../user/info')"
        ></image>
        <view class="wrap-body-avatar-user">
          <view @click="navTo('../user/info')" >{{username}}</view>
          <view @click="navTo('../list/wallet_list')">{{(money/1)|moneyFormat}}{{$t('Money_symbol')}}</view>
        </view>
      </view>
      <image
          class="wrap-letter"
          mode="scaleToFill"
          src="/static/images/home/recharge_icon.png"
          @click="navTo('../recharge/index')"
      ></image>
      <image
          class="wrap-letter"
          mode="scaleToFill"
          src="/static/images/home/withdraw_icon.png"
          @click="navTo('../withdraw/index')"
      ></image>
      <image
          class="wrap-letter"
          mode="scaleToFill"
          src="/static/images/home/service.png"
          @click="serviceAuto()"
      ></image>
    <!-- 左侧栏 -->
    <navigationPage  :navigation_show="navigation_show" @navigationShow="navigationShow"/>
    </view>
</template>


<script>
import navigationPage from '@/components/common/navigation-page.vue';

export default {
  components: {
    navigationPage,
  },
  data() {
    return {
      navigation_show: false,
      username: '-',
      money:0,
    }
  },
  props: {
  	backIcon: {
  		type: [Boolean, String],
  		default: false
  	},
  },
  watch: {
	  '$route.path': function (to, from) {
		  if(to !== from ) {
			  this.username = this.$queue.getData('user').username;
			  this.money = this.$queue.getData('wallet').money;
		  }
	  }
  },
  mounted() {
    this.username = this.$queue.getData('user').username;
	this.money = this.$queue.getData('wallet').money;
  },
  methods: {
	  navBack() {
	  	uni.navigateBack();
	  },
    serviceAuto(){
      this.$queue.showToast(this.$t('Customer_Service'));
    },
    navigationShow(val) {
      console.log(val);
      this.navigation_show = val;
    },
	onShow(){
	},
    navTo(url) {
      uni.navigateTo({
        url
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.Homepage {

  .wrap {
    position: fixed;
	height: 100rpx;
    left: 0;
    right:0;
    top:0;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f86c49;
    padding: 10rpx 30rpx;
    font-size: 28rpx;
    color: #fff;
    &-unfold{
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
}
</style>


