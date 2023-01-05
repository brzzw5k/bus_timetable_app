import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Logout from '@/components/Logout'
import Timetable from '@/components/Timetable'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/timetable',
      name: 'Timetable',
      component: Timetable
    },
    {
      path: '*',
      redirect: '/timetable'
    }
  ]
})
