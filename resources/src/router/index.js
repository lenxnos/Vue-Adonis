import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
  	{ path: '/welcome', component: Welcome },
    { path: '*', component: Home }
  ]
})
