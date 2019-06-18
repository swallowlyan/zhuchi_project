<template>
<div id="ind_div">
    <el-container>
    <!-- 头 -->
      <el-header style="height: 90px">
        <div class="top-header">
      <a href="javascript:;">
        <img src="../assets/common/logo_zhuchi.png" alt="logo" style="float: left;margin:10px;width: 150px">
      </a>
      <span id="welcomeTitle">欢迎，Admin</span>
      <div class="division"></div>
      <div class="title"><h3>工业互联网平台</h3></div>
    <div class="bg_header">
      <el-row class="menu_header">
        <el-col :span="2"><el-link :underline="false" href="www.baidu.com">首页</el-link></el-col>
        <el-col :span="2"  style="float: right;">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link" style="margin-right: 0px;font-size: 25px;color: #ffffff">
        <i class="el-icon-s-unfold"></i>
      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-circle-check-outline">资源库首页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">我的订单</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">个人工作台</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">设置中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
    </el-row>
      </div>
        </div>
      </el-header>
    <!-- 身体 -->
      <el-main style="padding: 0px 20px">
        <homepage></homepage>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import homepage from "../components/homePage.vue"
  import softList from "../components/soft/softList.vue"
  export default {
    name: "Ind",
    components:{homepage},
  data(){
      return{

      }
    },

    methods:{
      onIndex(){
        console.log('1111111111');
        this.$router.push('/login-page/login');
      },

      zhizao(){
        console.log('222222222');
        // window.open('http://www.baidu.com');
        window.location.href = 'http://127.0.0.1:8080'
      }
    },
  }
</script>

<style scoped>
#ind_div{
  background-size: cover;
  height: 1000px;
}
.division {
  float: left;
  width: 2px;
  height: 30px;
  background: #dedbdb;
  margin: 15px;
}
.top-header{
  background: url(../assets/head_bg.png) no-repeat right top;
  /*height:55px*/
}
.bg_header {
  background-color: #447EDF;
  height: 35px;
  border-bottom: none;
}
.title {
  width: 200px;
  height: 45px;
  margin-left: 150px;
  padding-top: 15px;
  color: black;
}
#welcomeTitle {
  float: right;
  margin-right: 10%;
  margin-top: 25px;
  color: gray;
  font-weight: bold;
}
.menu_header>div{
  margin: 6px;
  text-align: center;
}
.menu_header a{
  color:#ffffff
}

</style>
