import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../pages/LoginPage'

import Ind from '../pages/ind'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Ind',
      component:Ind,
    },
    {
      path:'/login-page',
      name:'LoginPage',
      component:LoginPage,
      children:[
      ]
    }
  ]
})
