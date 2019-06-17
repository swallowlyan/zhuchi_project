import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GeneralUser from '../parent-components/GeneralUser'
import SeniorUser from '../parent-components/SeniorUser'
import Manager from '../parent-components/Manager'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/LoginPage'
import Login from '../parent-components/Login'
import FindPassword from '../parent-components/FindPassword'
import SignUp from '../parent-components/SignUp'
import PersonSign from '../child-components/user-operation/PersonSign'
import EnterpriseSign from '../child-components/user-operation/EnterpriseSign'
import GeneralUserManage from '../parent-components/GeneralUserManage'
import SoftwareList from '../child-components/software-use/SoftwareList'
import SoftwareManage from '../child-components/software-use/SoftwareManage'
import UseApplication from '../child-components/software-manage/UseApplication'
import SoftwareSearch from '../child-components/software-use/SoftwareSearch'
import PurchaseApplication from '../child-components/software-manage/PurchaseApplication'
import InfoCheckIn from '../child-components/software-manage/InfoCheckIn'
import Installation from '../child-components/software-manage/Installation'
import MaintainUpgrade from '../child-components/software-manage/MaintainUpgrade'
import ScrappedSuggest from '../child-components/software-manage/ScrappedSuggest'
import FileManagePanel from '../child-components/software-use/FileManagePanel'
import PersonInfo from '../child-components/user-operation/PersonInfo'
import UseRecord from '../child-components/user-operation/UseRecord'
import ModifyPassword from '../child-components/user-operation/ModifyPassword'
import UseApproval from '../child-components/software-manage/UseApproval'
import UseRegister from '../child-components/software-manage/UseRegister'
import ScrappedApplication from '../child-components/ScrappedApplication'
import UserManagePanel from '../child-components/user-manage/UserManagePanel'
import PersonInfoManage from '../parent-components/PersonInfoManage'
import SeniorUserManage from '../parent-components/SeniorUserManage'
import JoinApproval from '../child-components/JoinApproval'
import PermissionApproval from '../child-components/user-manage/PermissionApproval'
import CharacterDefine from '../child-components/user-manage/CharacterDefine'
import ScrappedApproval from '../child-components/software-manage/ScrappedApproval'
import ClassifyManage from '../child-components/software-manage/ClassifyManage'
import BookManage from '../child-components/software-manage/BookManage'
import FrequencyStatistics from '../child-components/software-analysis/FrequencyStatistics'
import TimeStatistics from '../child-components/software-analysis/TimeStatistics'
import SelfBook from '../child-components/software-manage/SelfBook'
import PurchaseBook from '../child-components/software-manage/PurchaseBook'
import UserClassify from '../child-components/user-manage/UserClassify'
import SignApproval from '../child-components/user-manage/SignApproval'
import UseRecordManage from '../child-components/software-analysis/UseRecordManage'
import TimeRecordManage from '../child-components/software-analysis/TimeRecordManage'
import RunningSoftware from '../child-components/software-use/RunningSoftware'
import PurchaseApproval from '../child-components/software-manage/PurchaseApproval'
import CommonlyUsed from '../child-components/software-use/CommonlyUsed'
import Ind from '../pages/ind'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Ind',
      component:Ind,
    },
    // {
    //   path:'/',
    //   name:'LoginPage',
    //   component:LoginPage,
    //   children:[
    //     {
    //       path:'/',
    //       name:'Login',
    //       component:Login //登录页面
    //     }
    //   ]
    // },
    {
      path:'/login-page',
      name:'LoginPage',
      component:LoginPage,
      children:[
        {
          path:'login',
          name:'Login',
          component:Login //登录页面
        },
        {
          path:'find-password',
          name:'FindPassword',
          component:FindPassword //找回密码
        },
        {
          path:'sign-up',
          name:'SignUp',
          component:SignUp,
          children:[
            {
              path:'person-sign',
              name:'PersonSign',
              component:PersonSign //个人注册
            },
            {
              path:'enterprise-sign',
              name:'EnterpriseSign',
              component:EnterpriseSign //企业注册
            }
          ]
        }
      ]
    },
    {
      path: '/main-page',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: 'general-user',
          name: 'GeneralUser',
          component: GeneralUser //普通用户首页
        },
        {
          path: 'senior-user',
          name: 'SeniorUser',
          component: SeniorUser //高级用户首页
        },
        {
          path:'general-user-manage',
          name:'GeneralUserManage',
          component:GeneralUserManage,
          children:[
            {
              path:'software-manage',
              name:'SoftwareManage',
              component:SoftwareManage //软件管理
            },
			{
              path:'commonly-used',
              name:'CommonlyUsed',
              component:CommonlyUsed //常用软件列表
            },
            {
              path:'software-list',
              name:'SoftwareList',
              component:SoftwareList //软件列表
            },
            {
              path:'running-software',
              name:'RunningSoftware',
              component: RunningSoftware //运行软件列表
            },
            {
              path:'software-search',
              name:'SoftwareSearch',
              component:SoftwareSearch //软件搜索列表
            },
            {
              path:'purchase-application',
              name:'PurchaseApplication',
              component:PurchaseApplication //软件购置申请
            },
            {
              path:'info-check-in',
              name:'InfoCheckIn',
              component:InfoCheckIn //软件信息录入
            },
            {
              path:'installation',
              name:'Installation',
              component:Installation //软件安装
            },
            {
              path:'maintain-upgrade',
              name:'MaintainUpgrade',
              component:MaintainUpgrade //更新维护
            },
            {
              path:'scrapped-suggest',
              name:'ScrappedSuggest',
              component:ScrappedSuggest //报废建议
            },
            {
              path:'file-manage-panel',
              name:'FileManagePanel',
              component:FileManagePanel //文档管理
            }
          ]
        },
        {
          path: 'person-info-manage',
          name:'PersonInfoManage',
          component:PersonInfoManage,
          children:[
            {
              path:'person-info',
              name:'PersonInfo',
              component:PersonInfo //个人信息
            },
            {
              path:'use-record',
              name:'UseRecord',
              component:UseRecord //使用记录
            },
            {
              path:'modify-password',
              name:'ModifyPassword',
              component:ModifyPassword //修改密码
            }
          ]
        },
        {
          path:'senior-user-manage',
          name:'SeniorUserManage',
          component:SeniorUserManage,
          children:[
            {
              path:'software-manage',
              name:'SoftwareManage',
              component:SoftwareManage //软件管理
            },
			{
              path:'commonly-used',
              name:'CommonlyUsed',
              component:CommonlyUsed //常用软件列表
            },
            {
              path:'software-list',
              name:'SoftwareList',
              component:SoftwareList //软件列表
            },
            {
              path:'running-software',
              name:'RunningSoftware',
              component:RunningSoftware //运行软件列表
            },
            {
              path:'software-search',
              name:'SoftwareSearch',
              component:SoftwareSearch //软件搜索
            },
            {
              path:'use-approval',
              name:'UseApproval',
              component:UseApproval //软件使用批准
            },
            {
              path:'purchase-approval',
              name:'PurchaseApproval',
              component:PurchaseApproval //软件购置审批
            },
            {
              path:'info-check-in',
              name:'InfoCheckIn',
              component:InfoCheckIn //软件信息录入
            },
            {
              path:'installation',
              name:'Installation',
              component:Installation //软件安装部署
            },
            {
              path:'maintain-upgrade',
              name:'MaintainUpgrade',
              component:MaintainUpgrade //更新维护
            },
            {
              path:'scrapped-suggest',
              name:'ScrappedSuggest',
              component:ScrappedSuggest //软件报废建议
            },
            {
              path:'file-manage-panel',
              name:'FileManagePanel',
              component:FileManagePanel //文档管理
            },
            {
              path:'user-manage-panel',
              name:'UserManagePanel',
              component:UserManagePanel //用户管理
            },
            {
              path:'permission-approval',
              name:'PermissionApproval',
              component:PermissionApproval //权限管理
            },
            {
              path:'user-classify',
              name:'CharacterDefine',
              component:UserClassify //用户分组
            }
          ]
        },
        {
          path: 'manager',
          name: 'Manager',
          component: Manager,
          children:[
            {
              path:'/',
              name:'UseApproval',
              component:UseApproval //软件使用审批
            },
            {
              path:'use-approval',
              name:'UseApproval',
              component:UseApproval //软件使用审批
            },
            {
              path:'use-register',
              name:'UseRegister',
              component:UseRegister//软件登记审批
            },
            {
              path:'purchase-approval',
              name:'PurchaseApproval',
              component:PurchaseApproval //软件购置审批
            },
            {
              path:'info-check-in',
              name:'InfoCheckIn',
              component:InfoCheckIn //软件信息录入
            },
            {
              path:'installation',
              name:'Installation',
              component:Installation //安装部署
            },
            {
              path:'maintain-upgrade',
              name:'MaintainUpgrade',
              component:MaintainUpgrade //更新维护
            },
            {
              path:'scrapped-approval',
              name:'ScrappedApproval',
              component:ScrappedApproval //软件报废审批
            },
            {
              path:'classify-manage',
              name:'ClassifyManage',
              component:ClassifyManage //分类管理
            },
            {
              path:'book-manage',
              name:'BookManage',
              component:BookManage //台账管理
            },
            {
              path:'character-define',
              name:'CharacterDefine',
              component:CharacterDefine //角色定义
            },
            {
              path:'permission-approval',
              name:'PermissionApproval',
              component:PermissionApproval //权限管理
            },
            {
              path:'frequency-statistics',
              name:'FrequencyStatistics',
              component:FrequencyStatistics //频率统计
            },
            {
              path:'time-statistics',
              name:'TimeStatistics',
              component:TimeStatistics //时长统计
            },
            {
              path:'self-book',
              name:'SelfBook',
              component:SelfBook //自研类台账
            },
            {
              path: 'purchase-book',
              name:'PurchaseBook',
              component:PurchaseBook //采购类台账
            },
            {
              path: 'user-classify',
              name: 'UserClassify',
              component: UserClassify //用户分组
            },
            {
              path: 'sign-approval',
              name:'SignApproval',
              component: SignApproval //企业注册审批
            },
            {
              path: 'use-record-manage',
              name:'UseRecordManage',
              component:UseRecordManage //使用记录统计
            },
            {
              path:'time-record-manage',
              name:'TimeRecordManage',
              component: TimeRecordManage //使用时长统计
            }
          ]
        },
      ]
    },
  ]
})
