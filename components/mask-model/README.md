### 组件开篇
<h4>可自定义按钮颜色，提示内容及字体颜色，支持微信小程序、app、H5，其他未测试，理论支持，</h4>
### 使用方法
```html
<template>
	<div>
		<view class="openModel" @click="showModel">打开弹窗</view>
		<mask-model ref="showMask" btnType="1" @confirm="confirm" @cancel="cancel" titleColoe="#666666" cancelColor="#666666" confirmColor="#007AFF" :maskTitle="maskTitle"></mask-model>
	</div>
</template>
```
```javascript
  <script>
  	import maskModel from '../../components/mask-model/mask-model.vue'
  	export default {
  		components:{
  			maskModel:maskModel,
  		},
  		data() {
  			return {
  				maskTitle:'提示语'
  			}
  		},
  		onLoad() {
  			
  		},
  		methods: {
			confirm:function(e){//确定按钮
				console.log('您点击了确定按钮');
			},
			cancel:function(){//取消按钮
				console.log('您点击了取消按钮');
			},
  			showModel:function(e){//打开询问弹窗
  				this.$refs.showMask.show();
  			}
  		}
  	}
  </script>
```


