(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-list-order_list"],{"2c36":function(t,e,a){"use strict";var i=a("4ea4");a("99af"),a("c975"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var n=i(a("1da1")),o={data:function(){return{todayCnt:0,todayEarn:0,weekCnt:0,weekEarn:0,item_id:0,page:1,pageSize:20,toLoad:!0,eran:0,fee:0,ratio:0,loading_status:this.$t("Loading"),popup_show:!1,oddPercent:0,money:0,resEmpty:!1,list:[]}},onLoad:function(){var t=this;uni.setNavigationBarTitle({title:this.$t("Bet")}),this.$api.loading(!0),this.getRecord(),this.getData(),setTimeout((function(){t.$api.loading(!1)}),500)},onReachBottom:function(){this.toLoad&&(this.loading_status=this.$t("Loading"),this.page+=1,this.getRecord())},watch:{"$route.path":function(t,e){-1!=t.indexOf("/order_list")&&(this.resEmpty=!1,this.list=[],this.page=0,this.getRecord())}},methods:{getRecord:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$Request.post("/app/sports/order_item",{pageNum:t.page,pageSize:t.pageSize,isAsc:"desc",orderByColumn:"id"}).then((function(e){if(0==e.code){if(!e.rows.length)return t.toLoad=!1,void(0===t.list.length&&(t.resEmpty=!0));e.rows.length<t.pageSize&&(t.toLoad=!1),t.list=t.list.concat(e.rows),0===t.list.length?t.resEmpty=!0:t.resEmpty=!1,t.loading_status=t.$t("download_finished")}else t.$queue.showToast(e.message)})).catch((function(t){}));case 1:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;this.$Request.post("/app/sports/order_item_data",{}).then((function(e){console.log(e),0==e.code?(t.todayCnt=e.data.todayCnt,t.weekCnt=e.data.weekCnt,t.todayEarn=e.data.todayEarn,t.weekEarn=e.data.weekEarn):t.$queue.showToast(e.message)})).catch((function(t){}))},itemDetail:function(t){this.item_id=t.id,console.log("detail"),console.log(t.id),uni.navigateTo({url:"/pages/order/order_detail?id="+t.id})},onCancel:function(){this.popup_show=!1},onWithdraw:function(){var t=this;this.$Request.post("/app/sports/withdraw",{id:item.id}).then((function(e){0==e.code?t.$queue.showToast(t.$t("Revocation_successful")):t.$queue.showToast(e.message)})).catch((function(t){})),this.popup_show=!1}}};e.default=o},"331e":function(t,e,a){var i=a("7528");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("c1aea10e",i,!0,{sourceMap:!1,shadowMode:!1})},4674:function(t,e,a){"use strict";var i=a("331e"),n=a.n(i);n.a},7528:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.wallet[data-v-6a7ac2bc]{height:calc(100vh - %?100?%);padding:%?0?% 0;overflow-y:auto;position:relative;background:#eee}.wallet .header[data-v-6a7ac2bc]{position:fixed;width:100%;padding-bottom:%?10?%;background:#eee}.wallet-nav[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:%?0?% %?30?%;font-size:%?24?%;color:#4d4d4d}.wallet-nav > uni-view[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;color:#4d4d4d;font-size:%?30?%}.wallet-nav > uni-view[data-v-6a7ac2bc]:first-child{padding:%?20?% 0}.wallet-nav > uni-view[data-v-6a7ac2bc]:last-child{background:#fff;border-radius:%?17?%;line-height:%?60?%}.wallet-nav > uni-view > uni-view[data-v-6a7ac2bc]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center}.wallet-head[data-v-6a7ac2bc]{width:100%;height:%?72?%;background:-webkit-linear-gradient(right,#cedeff,#ffa7a7);background:linear-gradient(-90deg,#cedeff,#ffa7a7);box-shadow:0 2px 0 0 rgba(0,0,0,.3)}.wallet-list-title[data-v-6a7ac2bc]{position:relative;font-size:%?28?%;font-weight:700;text-align:center;color:#a89159;padding-bottom:%?14?%;margin-bottom:%?20?%}.wallet-list-title[data-v-6a7ac2bc]::after{width:4%;height:%?6?%;content:"";position:absolute;bottom:0;left:48%;border-radius:%?4?%;background:#a89159}.wallet-list[data-v-6a7ac2bc]{color:#333;font-size:%?18?%;margin:%?220?% %?30?% 0}.wallet-list-text[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;padding:%?10?% %?30?%;height:%?260?%;border-radius:%?17?%;margin-bottom:%?10?%;box-shadow:%?3?% %?5?% %?5?% 0 #bbb;background:#fff}.wallet-list-text .item-head[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?22?%;color:#4d4d4d}.wallet-list-text .item-head > uni-view[data-v-6a7ac2bc]:first-child{display:-webkit-box;display:-webkit-flex;display:flex}.wallet-list-text .item-head > uni-view:first-child .create-time[data-v-6a7ac2bc]{width:%?160?%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.wallet-list-text .item-head > uni-view:first-child .team-name[data-v-6a7ac2bc]{margin-left:%?20?%;width:%?280?%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.wallet-list-text .item-head .item-statu[data-v-6a7ac2bc]{font-size:%?26?%;min-width:%?130?%;text-align:center;background:#dc3e3e;border-radius:%?40?%;padding:%?5?% %?18?%}.wallet-list-text .item-head .item-statu1[data-v-6a7ac2bc]{font-size:%?26?%;background:#bbb}.wallet-list-text .team[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?26?%;color:#111113;padding:%?6?% 0}.wallet-list-text .team .lost-icon[data-v-6a7ac2bc]{width:%?25?%;height:%?25?%;background-image:-webkit-linear-gradient(bottom,#b3b3b3,#fff);background-image:linear-gradient(0deg,#b3b3b3,#fff);border-radius:50%;margin-right:%?20?%}.wallet-list-text .team .win-icon[data-v-6a7ac2bc]{width:%?25?%;height:%?25?%;background-image:-webkit-linear-gradient(bottom,#ef3e3e,#fff);background-image:linear-gradient(0deg,#ef3e3e,#fff);border-radius:50%;margin-right:%?20?%}.wallet-list-text .bet[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?34?%;color:#333}.wallet-list-text .bet .bet-title[data-v-6a7ac2bc]{padding:0 %?44?%}.wallet-list-text .win[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?34?%;color:#c53a3a}.wallet-list-text .win .win-lost[data-v-6a7ac2bc]{padding:0 %?44?%;margin-right:%?28?%}.wallet-list-head[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;color:#333;font-weight:400}.wallet-list-head > uni-view[data-v-6a7ac2bc]{-webkit-box-flex:2;-webkit-flex:2;flex:2;height:%?50?%;margin:auto;text-align:center;background:#c0e2fe;font-size:%?24?%;color:#333;line-height:%?50?%}.detail-popup[data-v-6a7ac2bc]{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.2)}.detail-popup-body[data-v-6a7ac2bc]{width:80%;margin-left:10%;margin-top:30%;padding:%?40?% %?20?%;background:#fff;border-radius:%?8?%}.detail-popup-body-top[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;border-radius:%?8?%;padding:%?10?% 0;background:#65a09d}.detail-popup-body-top uni-view[data-v-6a7ac2bc]{font-size:%?32?%;color:#fff;padding-bottom:%?2?%}.detail-popup-body-top uni-view[data-v-6a7ac2bc]:nth-child(2){font-size:%?48?%;padding:0 %?10?%;padding-bottom:0;font-weight:700;color:#7f614a}.detail-popup-body-title[data-v-6a7ac2bc]{padding:%?10?% 0;font-size:%?28?%;border-bottom:%?4?% solid #65a09d;text-align:center}.detail-popup-body-vs[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;padding:0 %?40?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.detail-popup-body-vs uni-view[data-v-6a7ac2bc]{font-size:%?32?%}.detail-popup-body-vs uni-view[data-v-6a7ac2bc]:first-child{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?32?%}.detail-popup-body-vs uni-image[data-v-6a7ac2bc]{width:%?34?%;height:%?34?%;margin-left:%?10?%}.detail-popup-body-balance[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;padding-bottom:%?10?%;margin:%?30?% 0 %?20?%;border-bottom:%?2?% dotted #c2c2c2}.detail-popup-body-balance uni-view:first-child uni-view[data-v-6a7ac2bc]:first-child{color:#a3a3a3;font-size:%?28?%}.detail-popup-body-balance uni-view:first-child uni-view[data-v-6a7ac2bc]:last-child{padding-left:0;color:#9d9d9d;font-size:%?42?%;background:#fff}.detail-popup-body-balance uni-view[data-v-6a7ac2bc]:last-child{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?52?%;padding:%?10?% %?20?%;font-size:%?32?%;border-radius:%?8?%;background:#292945}.detail-popup-body-balance uni-view:last-child uni-view[data-v-6a7ac2bc]:first-child{color:#fff;font-size:%?28?%}.detail-popup-body-balance uni-view:last-child uni-image[data-v-6a7ac2bc]{width:%?34?%;height:%?34?%;margin-left:%?10?%}.detail-popup-body-trading[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.detail-popup-body-trading uni-view[data-v-6a7ac2bc]{display:block;width:%?126?%;height:%?60?%;line-height:%?60?%;border-radius:%?6?%;margin:%?8?%;font-size:%?26?%;font-weight:700;text-align:center;background:#f6f6f6}.detail-popup-body-trading uni-view[data-v-6a7ac2bc]:nth-child(4n + 4){margin-right:0}.detail-popup-body-reward[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?40?%;font-size:%?32?%;color:#a1a1a1}.detail-popup-body-reward > uni-view[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;position:relative;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:46%;padding:%?18?%;display:flex;box-sizing:border-box;border:%?2?% solid #a1a1a1;border-radius:%?6?%}.detail-popup-body-reward uni-image[data-v-6a7ac2bc]{width:%?34?%;height:%?34?%;margin-left:%?10?%}.detail-popup-body-reward-top[data-v-6a7ac2bc]{position:absolute;top:%?-20?%;left:%?10?%;font-size:%?26?%;color:#a1a1a1;background:#fff}.detail-popup-body-reward-active[data-v-6a7ac2bc]{border:%?2?% solid #c24121!important}.detail-popup-body-reward-active uni-view:first-child uni-view[data-v-6a7ac2bc]{color:#b3614d;font-weight:500}.detail-popup-body-reward-active uni-view[data-v-6a7ac2bc]:last-child{color:#b3614d}.detail-popup-body-toast[data-v-6a7ac2bc]{margin-top:%?6?%;padding-left:%?20?%;font-size:%?26?%;visibility:hidden}.detail-popup-body-hidden[data-v-6a7ac2bc]{margin-top:%?6?%;padding-left:%?20?%;color:#b3614d;font-size:%?26?%;visibility:none}.detail-popup-body-btn[data-v-6a7ac2bc]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?30?%}.detail-popup-body-btn uni-view[data-v-6a7ac2bc]{width:46%;padding:%?20?% 0;text-align:center;background:#ccc;border-radius:%?6?%;font-size:%?32?%;font-weight:400}.detail-popup-body-btn-cannel[data-v-6a7ac2bc]{background:#f5f7f4;color:#000}.detail-popup-body-btn-onok[data-v-6a7ac2bc]{background:#e2e2e2;color:#ababab}.loading-status[data-v-6a7ac2bc]{width:100%;padding-bottom:%?20?%;font-size:%?28?%;color:#333;text-align:center}.empty-data[data-v-6a7ac2bc]{width:100%;margin-top:10vh}',""]),t.exports=e},b584:function(t,e,a){"use strict";a.r(e);var i=a("2c36"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},eb87:function(t,e,a){"use strict";a.r(e);var i=a("f4ae"),n=a("b584");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("4674");var d,s=a("f0c5"),l=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"6a7ac2bc",null,!1,i["a"],d);e["default"]=l.exports},f4ae:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"wallet"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"wallet-nav"},[a("v-uni-view",{staticClass:"nav-title"},[a("v-uni-view",[t._v(t._s(this.$t("Bet_today")))]),a("v-uni-view",[t._v(t._s(this.$t("Today_Earnings")))]),a("v-uni-view",[t._v(t._s(this.$t("Bet_this_week")))]),a("v-uni-view",[t._v(t._s(this.$t("This_Week_Earnings")))])],1),a("v-uni-view",{staticClass:"data"},[a("v-uni-view",[t._v(t._s(t.todayCnt))]),a("v-uni-view",[t._v(t._s(t.todayEarn)+t._s(t.$t("Money_symbol")))]),a("v-uni-view",[t._v(t._s(t.weekCnt))]),a("v-uni-view",[t._v(t._s(t.weekEarn)+t._s(t.$t("Money_symbol")))])],1)],1)],1),a("v-uni-view",{staticClass:"wallet-list"},[t._l(t.list,(function(e,i){return a("v-uni-view",{key:i,staticClass:"wallet-list-text",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.itemDetail(e)}}},[a("v-uni-view",{staticClass:"item-head"},[a("v-uni-view",[a("v-uni-view",{staticClass:"create-time"},[t._v(t._s(e.createTime))]),a("v-uni-view",{staticClass:"team-name"},[t._v(t._s(e.leagueName))])],1),0==e.status?a("v-uni-view",{staticClass:"item-statu",style:{color:"#fff"}},[t._v(t._s(t.$t("Betting")))]):t._e(),1==e.status?a("v-uni-view",{staticClass:"item-statu item-statu1",style:{color:"#333333"}},[t._v(t._s(t.$t("Settled")))]):t._e(),2==e.status?a("v-uni-view",{staticClass:"item-statu item-statu1",style:{color:"#333333"}},[t._v(t._s(t.$t("Revoked")))]):t._e()],1),a("v-uni-view",{staticClass:"team"},[a("v-uni-view",{staticClass:"lost-icon"}),a("v-uni-view",{staticClass:"lost-team"},[t._v(t._s(e.homeName))])],1),a("v-uni-view",{staticClass:"team"},[a("v-uni-view",{staticClass:"win-icon"}),a("v-uni-view",{staticClass:"win-team"},[t._v(t._s(e.awayName))])],1),a("v-uni-view",{staticClass:"bet"},[a("v-uni-view",{staticClass:"bet-title"},[t._v(t._s(t.$t("Bet")))]),a("v-uni-view",{staticClass:"bet-money"},[t._v(t._s(e.money/1)+t._s(t.$t("Money_symbol")))])],1),a("v-uni-view",{staticClass:"win"},[a("v-uni-view",{staticClass:"win-lost"},[t._v(t._s(t.$t("Earn")))]),a("v-uni-view",{staticClass:"win-lost-money"},[1==e.status?a("v-uni-view",[0==e.earn?a("v-uni-view",[t._v("0")]):t._e(),1==e.earn?a("v-uni-view",{style:{color:"#C53A3A"}},[t._v("+"+t._s(e.fee.toFixed(0))+t._s(t.$t("Money_symbol")))]):t._e(),-1==e.earn?a("v-uni-view",{style:{color:"#008e0d"}},[t._v("-"+t._s(e.money)+t._s(t.$t("Money_symbol")))]):t._e()],1):a("v-uni-view",[t._v("0")])],1)],1)],1)})),t.resEmpty?a("img",{staticClass:"empty-data",attrs:{src:"/static/images/empty-data.png",alt:""}}):t._e(),a("v-uni-view",{staticClass:"loading-status"},[t._v(t._s(t.loading_status))])],2)],1)},o=[]}}]);