import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../pages/LoginPage'
import UploadService from '../pages/UploadService'
import homePage from '../components/homePage.vue'
import Ind from '../pages/ind'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Ind',
      component:Ind,
      children:[
        {
          path:'',
          name:'homePage',
          component:homePage
        },
        
        {
          path:'upload-service',
          name:'UploadService',
          component:UploadService
        },
      ]
    },
    {
      path:'/login-page',
      name:'LoginPage',
      component:LoginPage,
      children:[
      ]
    },
  ]
})
