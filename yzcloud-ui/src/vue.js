// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './entry/Vue'
import router from './router/vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import animated from 'animate.css' // npm install animate.css --save安装，再引入

Vue.use(animated)

Vue.use(WeVue)
Vue.use(ElementUI);


Vue.config.productionTip = false


/**
*注册全局过滤器
*/
import filters from './filters'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

/**
*引入状态管理，下面搭载到全局，跟路由搭载方式一样
*/
import store from './store'
Vue.config.productionTip = false
// 配置微信 config
// wx.config({
//   debug: true,
//   appId: APPID, // 必填，公众号的唯一标识
//   timestamp: Date.now(), // 必填，生成签名的时间戳
//   nonceStr: "Wm3WZYTPz0wzccnW", // 必填，生成签名的随机串
//   signature: "", // 必填，签名
//   jsApiList: ["getLocation"] // 必填，需要使用的JS接口列表
// });

// function saveCookie(cookieName, cookieValue, cookieDates) {
//   var d = new Date();
//   d.setDate(d.getDate() + cookieDates);
//   document.cookie = cookieName + "=" + cookieValue + ";expires=" + d.toGMTString();
// }
// // saveCookie('access_token', 'cfacdc1f-ae03-468b-be2a-3bdb1c6f628b', 1);
/**
*路由控制
*进入路由之后
*进入路由之前
*/
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
router.beforeEach((to, from, next) => {
  next()
  /*if (to.matched.some(m => m.meta.auth)) {
    if (store.state.loginState) {
      next()
    } else {
      next({path: '/login', query: {Rurl: to.fullPath}})
    }
  } else {
    next()
  }*/
});
/* eslint-disable no-new */
new Vue({
  el: '#vue',
  router,
  store,
  components: { App },
  template: '<App/>'
})
