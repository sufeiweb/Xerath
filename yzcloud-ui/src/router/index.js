import Vue from 'vue'
import Router from 'vue-router'
// pc 端 admin
import AdminLoginView from '@/admin/Login';
import AdminRegisterView from '@/admin/Register';
import AdminTaskListView from '@/admin/TaskList';
import AdminCompanyView from '@/admin/Company';
import AdminApplyTaskView from '@/admin/TaskCheck';
import AdminTaskEditView from '@/admin/TaskEdit';
import AdminSalaryView from '@/admin/Salary';
import AdminUserInfoView from '@/admin/UserInfo';
import AdminEmployeeView from '@/admin/EmployeeList';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/admin/register/:type?', name: 'AdminRegisterView', component: AdminRegisterView },
    { path: '/admin/task', name: 'AdminTaskListView', component: AdminTaskListView },
    { path: '/admin/login', name: 'AdminLoginView', component: AdminLoginView },
    { path: '/admin/apply/task/:id?', name: 'AdminApplyTaskView', component: AdminApplyTaskView },
    { path: '/admin/company', name: 'AdminCompanyView', component: AdminCompanyView },
    { path: '/admin/salary', name: 'AdminSalaryView', component: AdminSalaryView },
    { path: '/admin/userinfo', name: 'AdminUserInfoView', component: AdminUserInfoView },
    { path: '/admin/employee', name: 'AdminEmployeeView', component: AdminEmployeeView },
    { path: '/admin/edit/task/:type?/:id?', name: 'AdminTaskEditView', component: AdminTaskEditView },
    { path: '/admin', redirect: { name: 'AdminLoginView' } },
    { path: '/', redirect: { name: 'AdminLoginView' } },
  ]
})
