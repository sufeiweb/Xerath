import Vue from 'vue'
import Router from 'vue-router'

// 移动端 
import VueRegisterView from '@/vue/Register';
import VueUserView from '@/vue/User';
import VueUserInfoView from '@/vue/Information';
import VueUserHisTaskView from '@/vue/TaskHistory';
import VueHomeTaskListView from '@/vue/TaskList';
import VueHomeTaskDetailView from '@/vue/TaskDetail';
import VueStartView from '@/vue/Login';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/vue/start', name: 'VueStartView', component: VueStartView },
    { path: '/vue/register/:openid?', name: 'VueRegisterView', component: VueRegisterView },
    { path: '/vue/user', name: 'VueUserView', component: VueUserView },
    { path: '/vue/user/info', name: 'VueUserInfoView', component: VueUserInfoView },
    { path: '/vue/user/historytask', name: 'VueUserHisTaskView', component: VueUserHisTaskView },
    { path: '/vue/home/tasklist', name: 'VueHomeTaskListView', component: VueHomeTaskListView },
    { path: '/vue/home/taskdetail/:id', name: 'VueHomeTaskDetailView', component: VueHomeTaskDetailView },
    { path: '/vue/home', redirect: { name: 'VueHomeTaskListView' } },
    { path: '/vue', redirect: { name: 'VueStartView' } },
    { path: '/', redirect: { name: 'VueStartView' } },
  ]
})
