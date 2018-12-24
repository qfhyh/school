import Vue from 'vue';
import Router from 'vue-router';
// import Home from '@/views/home/index.vue';
import routerMeta from './routerMeta';

const { webview } = routerMeta;

Vue.use(Router);

/**
 * meta
 *   webview 默认为false
 *     - ture 使用native的webview打开
 *     - false 单页面内打开
 *   tabBar 默认为false
 *     - ture tabBar 显示
 *     - false tabBar 隐藏
 */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: 'login' */ '@/views/login/login.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
      meta: { webview, tabBar: true },
    },
    {
      path: '/forgotNew',
      name: 'forgotNew',
      component: () =>
        import(/* webpackChunkName: 'forgot' */ '@/views/login/forgotNew_account.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/forgotNew_mq/:account',
      name: 'forgotNew_mq',
      component: () =>
        import(/* webpackChunkName: 'forgot' */ '@/views/login/forgotNew_sq.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/forgotNew_upwd/:loginId/:account',
      name: 'forgotNew_upwd',
      component: () =>
        import(/* webpackChunkName: 'forgot' */ '@/views/login/forgotNew_upwd.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ '@/views/about/index.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/me',
      name: 'me',
      component: () =>
        import(/* webpackChunkName: 'mine' */ '@/views/mine/me.vue'),
      meta: { webview, tabBar: true },
    },
    {
      path: '/mine',
      name: 'mine',
      component: () =>
        import(/* webpackChunkName: 'mine' */ '@/views/mine/mine.vue'),
      meta: { webview, tabBar: true },
    },
    {
      path: '/personal',
      name: 'personal',
      component: () =>
        import(/* webpackChunkName: 'personal' */ '@/views/mine/personal.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/setting',
      name: 'setting',
      component: () =>
        import(/* webpackChunkName: 'setting' */ '@/views/mine/setting/setting.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () =>
        import(/* webpackChunkName: 'setting' */ '@/views/mine/feedback/feedback.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/mysq',
      name: 'mysq',
      component: () =>
        import(/* webpackChunkName: 'setting' */ '@/views/mine/setting/mysq.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/accountSafe',
      name: 'accountSafe',
      component: () =>
        import(/* webpackChunkName: 'accountSafe' */ '@/views/mine/accountSafe/accountSafe.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: () =>
        import(/* webpackChunkName: 'aboutUs' */ '@/views/mine/aboutUs/aboutUs.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/baseCompInfoStu',
      name: 'baseCompInfoStu',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/mine/compInfo/baseCompInfoStu.vue'),
      meta: { webview, tabBar: true },
    },
    {
      path: '/baseCompInfoTea',
      name: 'baseCompInfoTea',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/mine/compInfo/baseCompInfoTea.vue'),
      meta: { webview, tabBar: true },
    },
    {
      path: '/curriculum',
      name: 'curriculum',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/curriculum/schedule.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/newsDetail/:id',
      name: 'newsDetail',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/home/noticeDetails.vue'),
      meta: { webview, tabBar: true },
    },
    {
      path: '/noticeList/:type',
      name: 'noticeList',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/home/noticeList.vue'),
      meta: { webview, tabBar: true },
    },
    {
      path: '/baseContact',
      name: 'baseContact',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/mine/contact/contact.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/examStu',
      name: 'examStu',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/application/exam/examStu.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/examTea',
      name: 'examTea',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/application/exam/examTea.vue'),
      meta: { webview, tabBar: false },
    },
    {
      path: '/examTeaResult',
      name: 'examTeaResult',
      component: () =>
        import(/* webpackChunkName: 'data' */ '@/views/application/exam/examTeaResult.vue'),
      meta: { webview, tabBar: false },
    },
  ],
});
