
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Xerath from '@/components/Xerath'
import project from '@/components/project'
import home from '@/components/home'
import admin from '@/components/admin'
import component from '@/components/component'
import componentDetail from '@/components/componentDetail'
import technical from '@/components/technical'
import techDetail from '@/components/techDetail'
import tourism from '@/components/tourism'
import editTech from '@/components/Module/editTechModule'
import editComponent from '@/components/Module/editCPModule'

import noteMain from '@/components/Note/noteMain'
import noteEdit from '@/components/Note/noteEdit'
import noteDetail from '@/components/Note/noteDetail'


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
        {path: 'project', component: project},//项目
        {path: 'technical', component: technical},//技术点
        {path: 'techDetail', component: techDetail},//技术点详情
        {path: 'editTech', component: editTech},//编辑技术点
        {path: 'home', component: home},//主页
        {path: 'admin', component: admin},//开发人员
        {path: 'component', component: component},//组件
        {path: 'componentDetail', component: componentDetail},//组件详情
        {path: 'editComponent', component: editComponent},//编辑组件
        {path: 'tourism', component: tourism},//旅游
        {path: 'noteMain', component: noteMain},//笔记列表
        {path: 'noteEdit', component: noteEdit},//编辑笔记
        {path: 'noteDetail', component: noteDetail},//笔记详情
        {path: '*', redirect: 'home'}//其他路径都跳转到首页
      ]
    }
  ]
})
