import Vue from 'vue'
import Router from 'vue-router'
import registerPage from '../pages/registerPage'
import LoginPage from '../pages/LoginPage'
import homePage from '../pages/homePage.vue'
import Ind from '../pages/ind'

import PersonalIndex from '../pages/personalWork/PersonalIndex'
import PersonalWorkbench from '../pages/personalWork/PersonalWorkbench'
import UploadService from '../pages/personalWork/UploadService'
import SaasService from '../pages/personalWork/SaasService'
import PurchasedServices from '../pages/personalWork/PurchasedServices'
import HistoricalServices from '../pages/personalWork/HistoricalServices'
import CollectionServices from '../pages/personalWork/CollectionServices'
import CommonServices from '../pages/personalWork/CommonServices'
import MyUpload from '../pages/personalWork/MyUpload'
import enterUpload from '../pages/enterpriseWork/MyUpload'
import MyBusiness from '../pages/personalWork/MyBusiness'

import softList from '../pages/soft/softList.vue'
import softCommon from '../pages/soft/softCommon.vue'
import softDetail from '../pages/soft/softDetail.vue'

import EnterpriseWorkbench from '../pages/enterpriseWork/EnterpriseWorkbench'
import EnterpriseIndex from '../pages/enterpriseWork/EnterpriseIndex'
import ServiceApproval from '../pages/enterpriseWork/ServiceApproval'
import enterprisePurchasedServices from '../pages/enterpriseWork/PurchasedServices'

import AdministratorBackstage from '../pages/administrator/AdministratorBackstage'
import RegisterApproval from '../pages/administrator/RegisterApproval'
import ApprovalService from '../pages/administrator/ApprovalService'
import UserManagement from '../pages/administrator/UserManagement'
import DataStatistics from '../pages/administrator/DataStatistics'
import ComprehensiveStatistics from '../pages/administrator/ComprehensiveStatistics'
import CategoryConfiguration from '../pages/administrator/CategoryConfiguration'

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
          name:'LoginPage',
          component:LoginPage,
          children:[]
        },
        {
          path:'/register',
          name:'registerPage',
          component:registerPage,
          children:[]
        },
        {
          path:'homePage',
          name:'homePage',
          component:homePage
        },

        {
          path:'personal-workbench',
          name:'PersonalWorkbench',
          component:PersonalWorkbench,
          children:[
            {
              path:'',
              name:'PersonalIndex',
              component:PersonalIndex
            },
            {
              path:'my-upload',
              name:'MyUpload',
              component:MyUpload
            },
            {
              path:'my-business',
              name:'MyBusiness',
              component:MyBusiness
            },
            {
              path:'upload-service',
              name:'UploadService',
              component:UploadService
            },
            {
              path:'saas-service',
              name:'SaasService',
              component:SaasService
            },
            {
              path:'purchased-services',
              name:'PurchasedServices',
              component:PurchasedServices
            },
            {
              path:'historical-services',
              name:'HistoricalServices',
              component:HistoricalServices
            },
            {
              path:'collection-services',
              name:'CollectionServices',
              component:CollectionServices
            },
            {
              path:'common-services',
              name:'CommonServices',
              component:CommonServices
            }
          ]
        },
        {
          path:'enterprise-workbench',
          name:'EnterpriseWorkbench',
          component:EnterpriseWorkbench,
          children:[
            {
              path:'index',
              name:'EnterpriseIndex',
              component:EnterpriseIndex
            },
            {
              path:'service-approval',
              name:'ServiceApproval',
              component:ServiceApproval
            },
            {
              path:'my-upload',
              name:'MyUpload',
              component:enterUpload
            },
            {
              path:'upload-service',
              name:'UploadService',
              component:UploadService
            },
            {
              path:'purchased-services',
              name:'PurchasedServices',
              component:enterprisePurchasedServices
            }

          ]
        },
        {
          path:'administrator-backstage',
          name:'AdministratorBackstage',
          component:AdministratorBackstage,
          children:[
            {
              path:'index',
              name:'RegisterApproval',
              component:RegisterApproval
            },
            {
              path:'approval-service',
              name:'ApprovalService',
              component:ApprovalService
            },
            {
              path:'data-statistics',
              name:'DataStatistics',
              component:DataStatistics
            },
            {
              path:'comprehensive-statistics',
              name:'ComprehensiveStatistics',
              component:ComprehensiveStatistics
            },
            {
              path:'user-management',
              name:'UserManagement',
              component:UserManagement
            },
            {
              path:'category-configuration',
              name:'CategoryConfiguration',
              component:CategoryConfiguration
            },
          ]
        },
        {
          path:'soft',
          name:'soft',
          component:softCommon,
          children:[
            {
              path:'',
              name:'softList',
              component:softList
            },
            {
              path:'softDetail',
              name:'softDetail',
              component:softDetail
            }
          ]
        }
      ]
    },

  ]
})
