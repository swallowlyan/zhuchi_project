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
    <el-row class="Introduction">
      <el-row>
        <h1>产品与服务</h1>
    </el-row>
    <el-row style="text-align:center;margin:20px">
        <span>为开发者提供多种开发环境，支持海量API接入</span>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="4">
        <el-row><h2><i class="el-icon-monitor"></i></h2></el-row>
        <el-row><h3>工业APP开发环境</h3></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h2><i class="fa fa-home"></i></h2></el-row>
        <el-row><h3>微服务组件开发环境</h3></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h2><i class="fa fa-share-alt"></i></h2></el-row>
        <el-row><h3>云API服务</h3></el-row>
      </el-col>
      <el-col :span="4">
        <el-row><h2><i class="fa fa-buysellads"></i></h2></el-row>
        <el-row><h3>工业APP运行工具</h3></el-row>
      </el-col>
    </el-row>
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
  .Introduction h1{
    font-size: 36px;
    text-align: center;
    font-weight: normal;
  }
  .Introduction h2{
    font-size: 50px;
    text-align: center;
    }
  .Introduction h3{font-weight: normal;text-align: center;}
</style>
