
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import Xerath from '@/components/Xerath'
import home from '@/components/home'
import admin from '@/components/admin'

import tourism from '@/components/tourism/tourism'
import tourismDetail from '@/components/tourism/tourismDetail'

import pjList from '@/components/project/pjList'
import pjEdit from '@/components/project/pjEdit'
import pjDetail from '@/components/project/pjDetail'

import techList from '@/components/Tech/techList'
import techDetail from '@/components/Tech/techDetail'
import techEdit from '@/components/Tech/techEdit'

import cpEdit from '@/components/component/cpEdit'
import cpList from '@/components/component/cpList'
import cpDetail from '@/components/component/cpDetail'

import noteMain from '@/components/Note/noteMain'
import noteEdit from '@/components/Note/noteEdit'
import noteDetail from '@/components/Note/noteDetail'

import diaryList from '@/components/diary/diaryList'
import diaryEdit from '@/components/diary/diaryEdit'

import reportMain from  '@/components/report/reportMain'

import consigneeMain from  '@/components/consignee/consigneeMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/Xerath', //首页框架
      name: 'Xerath',
      component: Xerath,
      children:[
        {path: 'pjList', component: pjList},//项目
        {path: 'pjEdit', component: pjEdit},//项目
        {path: 'pjDetail', component: pjDetail},//项目

        {path: 'techList', component: techList},//技术点
        {path: 'techDetail', component: techDetail},//技术点详情
        {path: 'techEdit', component: techEdit},//编辑技术点

        {path: 'home', component: home},//主页
        {path: 'admin', component: admin},//开发人员

        {path: 'cpList', component: cpList},//组件
        {path: 'cpDetail', component: cpDetail},//组件详情
        {path: 'cpEdit', component: cpEdit},//编辑组件

        {path: 'tourism', component: tourism},//旅游
        {path: 'tourismDetail', component: tourismDetail},//旅游

        {path: 'noteMain', component: noteMain},//笔记列表
        {path: 'noteEdit', component: noteEdit},//编辑笔记
        {path: 'noteDetail', component: noteDetail},//笔记详情

        {path: 'diaryList', component: diaryList},//日记列表
        {path: 'diaryEdit', component: diaryEdit},//日记编辑

        {path: 'reportMain', component: reportMain},//报告列表

        {path: 'consigneeMain', component: consigneeMain},//邮箱

        {path: '*', redirect: 'home'}//其他路径都跳转到首页
      ]
    }
  ]
})
