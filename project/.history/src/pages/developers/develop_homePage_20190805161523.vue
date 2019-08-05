<template>
  <div id="homePage">
    <!--轮播图-->
    <el-row>
      <el-col :span="24">
        <el-carousel :interval="5000"  indicator-position="none" arrow="always">
          <el-carousel-item v-for="(item,index) in dataImg" :key="index">
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
        <img src="../../assets/common/logo_zhuchi.png" style="margin: 20px">
      </el-col>
      <el-col :span="12" :offset="10" style="margin-bottom: 30px">
        <h2>行业领先工业互联网平台</h2>
      </el-col>
    </el-row>
    <el-row class="Introduction">
      <el-col :span="4" :offset="4">
        <el-row><h1><i class="el-icon-monitor"></i></h1></el-row>
        <el-row><h2>接入设备<span class="num">13009</span>台</h2></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h1><i class="fa fa-home"></i></h1></el-row>
        <el-row><h2>云化软件<span class="num">{{softCount}}</span>款</h2></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h1><i class="fa fa-share-alt"></i></h1></el-row>
        <el-row><div style="font-weight: normal;width: 90px;float: left;margin-left: 50px">机理模型及微服务组件</div><span class="num">{{serviceCount}}</span><span>个</span></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h1><i class="fa fa-buysellads"></i></h1></el-row>
        <el-row><h2>工业APP<span class="num">{{appCount}}</span>款</h2></el-row>
      </el-col>
    </el-row>
    <el-row class="Introduction">
      <el-col :span="4" :offset="4">
        <el-row><h1><i class="fa fa-users"></i></h1></el-row>
        <el-row><h2>用户<span class="num">{{userCount}}</span>人</h2></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h1><i class="fa fa-user-md"></i></h1></el-row>
        <el-row><h2>开发者<span class="num">{{developCount}}</span>名</h2></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h1><i class="fa fa-bar-chart"></i></h1></el-row>
        <el-row><h2>接入数据<span class="num">1.23</span>PB</h2></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h1><i class="fa fa-code"></i></h1></el-row>
        <el-row><h2>通用算法等<span class="num">{{algorithmCount}}</span>个</h2></el-row>
      </el-col>
    </el-row>
    <el-row>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "homePage",
      data(){
          return {
            softList: [],
            appList: [],
            resourceList: [],
            softCount: 0,
            serviceCount: 0,
            appCount: 0,
            userCount: 0,
            developCount: 0,
            algorithmCount: 0,
            dataImg: [{
              src: require("../../assets/carousel/carousel_1.jpg"),
              name: ""
            },
              {
                src: require("../../assets/carousel/carousel_2.jpg"),
                name: ""
              },
              {
                src: require("../../assets/carousel/carousel_3.jpg"),
                name: ""
              }]
          }
      },
      mounted(){
      },
      methods:{
      }
    }
</script>

<style scoped>
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
