<template>
    <el-card class="person-info-nav">
      <!--<h2><a href="javascript:void (0)" @click="$goRoute('/main-page/person-info-manage/person-info')">个人信息</a></h2>-->
      <!--<h2><a href="javascript:void (0)" @click="$goRoute('/main-page/person-info-manage/use-record')">使用记录</a></h2>-->
      <!--<h2><a href="javascript:void (0)" @click="$goRoute('/main-page/person-info-manage/modify-password')">修改密码</a></h2>-->
      <el-tree :data="navData" :props="defaultProps" @node-click="jump" class="nav-tree menuTree"></el-tree>
    </el-card>
</template>

<script>
    export default {
        name: "PersonInfoNav",

      data(){
          return{
            navData:[],

            defaultProps: {
              children: 'children',
              label: 'label'
            },

            roleId:'',
          }
      },

      created(){
        this.roleId = sessionStorage.getItem('roleId');
        if(this.roleId == 1){
          this.navData = [
            {label:'个人信息',to:'/main-page/person-info-manage/person-info'},
            {label:'修改密码',to:'/main-page/person-info-manage/modify-password'},
          ];
        }else {
          this.navData = [
            {label:'个人信息',to:'/main-page/person-info-manage/person-info'},
            {label:'使用记录',to:'/main-page/person-info-manage/use-record'},
            {label:'修改密码',to:'/main-page/person-info-manage/modify-password'},
          ];
        }
      },

      methods:{
        jump(data){
          this.$router.push(data.to);
        },
      },
    }
</script>

<style scoped>
  .nav-tree{
    background: #fff0;
    color: #ffffff;
  }

  .person-info-nav{
    height: 900px;
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
