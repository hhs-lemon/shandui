import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langZhCN from './zh'
import langEn from './en'
import langVi from './vi'

Vue.use(VueI18n)

let currentLang = uni.getStorageSync('CURRENT_LANG')
if (!currentLang) {
	// 获取设备信息
	// uni.getSystemInfo({
	// 	success: function (res) {
	// 		uni.setStorageSync('CURRENT_LANG', res.language)
	// 		currentLang = res.language
	// 	}
	// })
	// let currentLang = uni.getStorageSync('CURRENT_LANG')
	uni.setStorageSync('CURRENT_LANG', 'cn');
	currentLang = 'cn'
	
}
const i18n = new VueI18n({
	// 默认选择的语言
	locale: currentLang,
	messages: {
		'cn': langZhCN,
		'en': langEn,
		'vi': langVi
	}
})
export default i18n