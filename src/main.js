import Vue from 'vue';
import Vant from 'vant';
import echarts from 'echarts';
import moment from 'moment';
import 'vant/lib/vant-css/index.css';
import '@/styles/index.scss';
// import OWSDK from 'OWSDK';
import App from './App.vue';
import './assets/normalize.css';
import router from './router/router';
import './router/guard';
import store from './store/';
import './icons/';

// 绑定 js-bridge-sdk 到 Vue 原型
// Vue.prototype.$overWatch = OWSDK;
Vue.prototype.$echarts = echarts;
// 绑定 js-bridge-sdk 到 window 对象
// window.overWatch = OWSDK;

// store.dispatch('system/getUserInfo', {
//   // account: 'sxjtaccount',
//   // password: 'sxjtaccount2018.!',
//   // password: 'Aa12345678',
//   // account: '20039046',
//   // password: 'Wang0869',
//   // account: '20161102109', // 学生 于雪莲
//   // account: '20181102115', // 学生 李莎莎
//   // account: '20161402129', // 学生 张伟
//   // account: '20030452', // 院系
//   // account: '20030505', // 学生处   辅导员   王锦华
//   // password: '12345678',
// });

Vue.config.productionTip = false;
Vue.use(echarts);
Vue.use(Vant);

Object.defineProperty(Vue.prototype, '$moment', { value: moment });

console.log(process.env.VUE_APP_BRIDGE);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
