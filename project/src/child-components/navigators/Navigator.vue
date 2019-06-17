<template>
    <el-card class="navigator">
      <!--<h2><a href="javascript:void (0)" @click="$goRoute()">软件管理</a></h2>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/use-approval')">软件使用审批</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/purchase-approval')">软件购置审批</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/info-check-in')">软件入库登记</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/installation')">软件安装部署</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/maintain-upgrade')">软件维护更新</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/scrapped-approval')">软件报废审批</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/classify-manage')">软件分类管理</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/book-manage')">软件台账管理</a></h4>-->
      <!--<h5><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/self-book')">自研类台账</a></h5>-->
      <!--<h5><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/purchase-book')">采购类台账</a></h5>-->

      <!--<h2><a href="javascript:void (0)" @click="$goRoute()">用户管理</a></h2>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/user-classify')">用户部门</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/character-define')">角色定义</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/permission-approval')">权限管理</a></h4>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/sign-approval')">企业注册审批</a></h4>-->

      <!--<h2><a href="javascript:void (0)" @click="$goRoute()">综合分析</a></h2>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute()">软件分析</a></h4>-->
      <!--<h5><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/frequency-statistics')">频率统计</a></h5>-->
      <!--<h5><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/time-statistics')">时长统计</a></h5>-->
      <!--<h4><a href="javascript:void (0)" @click="$goRoute()">用户分析</a></h4>-->
      <!--<h5><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/use-record-manage')">使用记录</a></h5>-->
      <!--<h5><a href="javascript:void (0)" @click="$goRoute('/main-page/manager/time-record-manage')">使用时长</a></h5>-->
      <el-tree :data="navData" :props="defaultProps" @node-click="jump" class="nav-tree menuTree" default-expand-all></el-tree>
    </el-card>
</template>

<script>
    import ManageItem from "../../base-component/ManageItem";
    export default {
        name: "Navigator",
      components: {ManageItem},

      data() {
        return {
          navData: [{
            label: '软件管理',to:'',
            children: [
                {label: '软件使用审批',to:'/main-page/manager/use-approval'},
                {label: '软件登记审批',to:'/main-page/manager/use-register'},
                {label: '软件购置审批',to:'/main-page/manager/purchase-approval'},
                {label: '软件入库登记',to:'/main-page/manager/info-check-in'},
                {label: '软件安装部署',to:'/main-page/manager/installation'},
                {label: '软件维护更新',to:'/main-page/manager/maintain-upgrade'},
                {label: '软件报废审批',to:'/main-page/manager/scrapped-approval'},
                {label: '软件分类管理',to:'/main-page/manager/classify-manage'},
                // {label: '软件台账管理',to:'/main-page/manager/book-manage',
                {label: '软件台账管理',to:'',
                  children:[
                    {label: '自研类台账',to:'/main-page/manager/self-book'},
                    {label: '采购类台账',to:'/main-page/manager/purchase-book'}
                  ]
                },
              ]
          }, {
            label: '用户管理',to:'',
            children: [
              {label: '用户部门',to:'/main-page/manager/user-classify'},
              {label: '权限管理',to:'/main-page/manager/permission-approval'},
              {label: '用户注册审批',to:'/main-page/manager/sign-approval'}
            ]
          }, {
            label: '综合分析',to:'',
            children: [
              {label: '软件分析',to:'',
                children:[
                  {label: '频率统计',to:'/main-page/manager/frequency-statistics'},
                  {label: '时长统计',to:'/main-page/manager/time-statistics'}
                ]
              },{label: '用户分析',to:'',
                children:[
                  {label: '使用记录',to:'/main-page/manager/use-record-manage'},
                  {label: '使用时长',to:'/main-page/manager/time-record-manage'}
                ]
              },
            ]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        };
      },
      methods: {
        jump(data) {
          this.$router.push(data.to)
        }
      }
    }
</script>

<style scoped>
  .navigator{
    height: 900px;
  }

 .nav-tree{
    background: #fff0;
    color: #ffffff;
  }
</style>
<style>
  .nav-tree .el-tree-node__content:hover,.typeTree .el-tree-node:focus>.el-tree-node__content{
    background-color:#2E5A63
  }
  .nav-tree .is-current .el-tree-node__content{
    background-color:#57838c !important;
  }
</style>
