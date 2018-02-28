// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//  全部引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
// //按需引入
// import { Button, Select, Table } from 'element-ui'

// Vue.prototype.$ELEMENT = { size: 'small' }
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Table)//按需引入
// import { Button, Select, Table } from 'element-ui'

// Vue.prototype.$ELEMENT = { size: 'small' }
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Table)

import  axios from 'axios';
axios.defaults.withCredentials = true;//跨域保存session有用
const $API_BASE = 'http://localhost:3333';
Vue.prototype.$API_BASE="http://localhost:3333";//打包的时候直接删掉，默认基础路径在这里配置
axios.defaults.baseURL = 'http://localhost:3333';
Vue.prototype.$http = axios;

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.err){
    alert(response.data.err);
    return Promise.reject(response);
  }else if(response.data.redirect){
    alert("请先登录..");
    window.location.href = "#/"; //跳转到登录页
    return Promise.reject(response);
  }else{
    //返回response继续执行后面的操作
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


import filter from './filter'
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));

Vue.config.productionTip = false;

// let socket  = io.connect($API_BASE);
// socket.on('news',function (data) {
//   console.log(data);
//   socket.emit('my other event',{my:'data'})
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
