import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../pages/LoginPage'
import PersonalIndex from '../pages/PersonalIndex'
import PersonalWorkbench from '../pages/PersonalWorkbench'
import UploadService from '../pages/UploadService'
import SaasService from '../pages/SaasService'
import PurchasedServices from '../pages/PurchasedServices'
import HistoricalServices from '../pages/HistoricalServices'
import CollectionServices from '../pages/CollectionServices'
import CommonServices from '../pages/CommonServices'
import MyUpload from '../pages/MyUpload'
import homePage from '../components/homePage.vue'
import Ind from '../pages/ind'
import softCommon from '../components/soft/softCommon.vue'
import softList from '../components/soft/softList.vue'
import softDetail from '../components/soft/softDetail.vue'
import EnterpriseWorkbench from '../pages/EnterpriseWorkbench'
import EnterpriseIndex from '../pages/EnterpriseIndex'
import ServiceApproval from '../pages/ServiceApproval'
import AdministratorBackstage from '../pages/AdministratorBackstage'
import RegisterApproval from '../pages/RegisterApproval'
import ApprovalService from '../pages/ApprovalService'
import UserManagement from '../pages/UserManagement'
import DataStatistics from '../pages/DataStatistics'
import ComprehensiveStatistics from '../pages/ComprehensiveStatistics'
import CategoryConfiguration from '../pages/CategoryConfiguration'

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
    {
      path:'/login-page',
      name:'LoginPage',
      component:LoginPage,
      children:[]
    },
  ]
})
