/*
 * @Author: your name
 * @Date: 2021-01-25 20:29:25
 * @LastEditTime: 2021-02-27 22:55:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \app\main.js
 */
import Vue from 'vue'
import App from './App'
import HttpRequest from './common/httpRequest'
import queue from './common/queue'
import getCode from './components/get-code'
import uView from 'uview-ui';
import i18n from './lang/index'

import * as filters from './filters' // global filters

// 注册全局filters
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.prototype._i18n = i18n
Vue.use(uView);
Vue.config.productionTip = false
Vue.component('getCode', getCode);

Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;

const msg = (title, icon = 'none', duration = 1500, mask = false) => {
	// 全局统一提示
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const loading = (statu, title = 'Loading') => {
	// Loading
	if (Boolean(statu) === false) {
		uni.hideLoading();
	} else {
		uni.showLoading({
			title
		});
	}
}

const json = type => {
	// 模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}


Vue.prototype.$api = {
	msg,
	json,
	loading
}

App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})
app.$mount()
