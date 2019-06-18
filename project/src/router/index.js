import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../pages/LoginPage'
import PersonalWorkbench from '../pages/PersonalWorkbench'
import UploadService from '../pages/UploadService'
import MyUpload from '../pages/MyUpload'
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
          path:'personal-workbench',
          name:'PersonalWorkbench',
          component:PersonalWorkbench,
          children:[
            {
              path:'my-upload',
              name:'MyUpload',
              component:MyUpload
            },
            {
              path:'upload-service',
              name:'UploadService',
              component:UploadService
            },
          ]
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
