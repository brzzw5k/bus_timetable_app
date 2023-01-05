// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import Login from './components/Login'
import Register from './components/Register'
import Timetable from './components/Timetable'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    Login,
    Register,
    Timetable
  },
  template: '<App/>'

})
