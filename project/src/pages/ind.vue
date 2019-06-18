<template>

  <div id="ind_div">
    <el-container>
    <!-- 头 -->
      <el-header class="top-header">
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
      </el-header>
    <!-- 身体 -->
      <el-main>
      <!--轮播图-->
      <el-row>
        <el-col :span="24">
          <el-carousel :interval="5000"  indicator-position="none" arrow="always">
          <el-carousel-item v-for="item in dataImg" :key="item">
            <div class="grid-content">
              <el-row>
                <div>
                  <img :src="item.src">
                </div>
              </el-row>
            </div>
          </el-carousel-item>
        </el-carousel>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="12" :offset="10">
              <img src="../assets/common/logo_zhuchi.png"style="margin: 20px">
          </el-col>
          <el-col :span="12" :offset="10" style="margin-bottom: 30px">
            <h2>行业领先工业互联网平台</h2>
          </el-col>
        </el-row>
        <el-row class="Introduction">
          <el-col :span="4" :offset="4">
            <el-row><h1><i class="el-icon-monitor"></i></h1></el-row>
            <el-row><h2>接入设备<span class="num">3900</span>台</h2></el-row>
          </el-col>
          <el-col :span="4">
            <el-row><h1><i class="fa fa-home"></i></h1></el-row>
            <el-row><h2>云化软件<span class="num">39</span>款</h2></el-row>
          </el-col>
          <el-col :span="4">
            <el-row><h1><i class="fa fa-share-alt"></i></h1></el-row>
            <el-row><div style="font-weight: normal;width: 90px;float: left;margin-left: 50px">机理模型及微服务组件</div><span class="num">39</span><span>个</span></el-row>
          </el-col>
          <el-col :span="4">
            <el-row><h1><i class="fa fa-buysellads"></i></h1></el-row>
            <el-row><h2>工业APP<span class="num">139</span>款</h2></el-row>
          </el-col>
        </el-row>
        <el-row class="Introduction">
          <el-col :span="4" :offset="4">
            <el-row><h1><i class="fa fa-users"></i></h1></el-row>
            <el-row><h2>用户<span class="num">3900</span>人</h2></el-row>
          </el-col>
          <el-col :span="4">
            <el-row><h1><i class="fa fa-user-md"></i></h1></el-row>
            <el-row><h2>开发者<span class="num">39</span>名</h2></el-row>
          </el-col>
          <el-col :span="4">
            <el-row><h1><i class="fa fa-bar-chart"></i></h1></el-row>
            <el-row><h2>接入数据<span class="num">1.23</span>PB</h2></el-row>
          </el-col>
          <el-col :span="4">
            <el-row><h1><i class="fa fa-code"></i></h1></el-row>
            <el-row><h2>通用算法等<span class="num">139</span>个</h2></el-row>
          </el-col>
        </el-row>
      <el-row>
      </el-row>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  export default {
    name: "Ind",

    data(){
      return{
        dataImg:[{
          src:require("../assets/carousel/carousel_1.jpg"),
          name:""
        },
          {
            src:require("../assets/carousel/carousel_2.jpg"),
            name:""
          },
          {
            src:require("../assets/carousel/carousel_3.jpg"),
            name:""
          }]
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
  height:55px
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
.menu_header{
  color:#ffffff
}
.Introduction{margin: 50px 0px}
.Introduction h1{font-size: 50px}
.Introduction h1,.Introduction h2{
  text-align: center;
  font-weight: normal;
}
.Introduction .num{
  font-weight: bolder;
  font-size: 36px;
}
</style>
