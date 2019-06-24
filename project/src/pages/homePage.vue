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
    <el-divider><h1>工业软件</h1></el-divider>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-carousel :interval="4000" type="card" indicator-position="outside" height="400px" arrow="always">
          <el-carousel-item v-for="(item,index) in soft1_img" :key="index">
            <div class="grid-content">
              <el-col :md="12" :offset="6">
                <div>
                  <img :src="item.src" width="100%" height="100%"/>
                </div>
              </el-col>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="2">
        <el-button type="text" @click="toPage('工业软件','1')"
                    style="margin-top: 300px;margin-left: 30px">查看更多</el-button>
      </el-col>
    </el-row>
    <el-divider><h1>工业APP</h1></el-divider>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-carousel :interval="4000" type="card" indicator-position="outside" height="400px" arrow="always">
          <el-carousel-item v-for="(item,index) in soft2_img" :key="index">
            <el-col :md="12" :offset="6">
              <div>
                <img :src="item.src" width="100%" height="100%"/>
              </div>
            </el-col>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="2">
        <el-button type="text" @click="toPage('工业APP','2')"
                   style="margin-top: 300px;margin-left: 30px">查看更多</el-button>
      </el-col>
    </el-row>
    <el-divider><h1>工业资源</h1></el-divider>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-carousel :interval="4000" type="card" indicator-position="outside" height="400px" arrow="always">
          <el-carousel-item v-for="(item,index) in soft2_img" :key="index">
            <el-col :md="12" :offset="6">
              <div>
                <img :src="item.src" width="100%" height="100%"/>
              </div>
            </el-col>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="2">
        <el-button type="text" @click="toPage('机理模型','3')"
                   style="margin-top: 300px;margin-left: 30px">查看更多</el-button>
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
              }],
            soft1_img:[
              {
                src:require("../assets/soft1_img/v2_ptbrfu.jpg"),
                name:""
              },
              {
                src:require("../assets/soft1_img/v2_ptdms6.jpg"),
                name:""
              },
              {
                src:require("../assets/soft1_img/v2_ptdmsa.jpg"),
                name:""
              },
              {
                src:require("../assets/soft1_img/v2_ptdmsr.jpg"),
                name:""
              },
              {
                src:require("../assets/soft1_img/v2_ptdmt8.jpg"),
                name:""
              }
            ],
            soft2_img:[{
              src:require("../assets/soft2_img/v2_pt674w.jpg"),
              name:""
            },
              {
                src:require("../assets/soft2_img/v2_pt675f.jpg"),
                name:""
              },
              {
                src:require("../assets/soft2_img/v2_pt675i.jpg"),
                name:""
              },
              {
                src:require("../assets/soft2_img/v2_pt675s.jpg"),
                name:""
              },
              {
                src:require("../assets/soft2_img/v2_pt677p.jpg"),
                name:""
              }],
            softCount:0,
            serviceCount:0,
            appCount:0,
            userCount:0,
            developCount:0,
            algorithmCount:0
          }
      },
      mounted(){
        this.getHomePageData();
      },
      methods:{
        getHomePageData(){
          this.$axios.get('/wc-index/index-moudles').then((res)=>{
            if(res.data.data.length>0){
              let service=0,mechanism=0;
              res.data.data.forEach((item) => {
                if(item.name==="工业软件")this.softCount=item.count;
                else if(item.name==="工业APP")this.appCount=item.count;
                else if(item.name==="算法模型")this.algorithmCount=item.count;
                else if(item.name==="用户")this.userCount=item.count;
                else if(item.name==="开发者")this.developCount=item.count;
                else if(item.name==="机理模型")mechanism=item.count;
                else if(item.name==="微服务组件")service=item.count;
              });
              this.serviceCount=service+mechanism;
            }
          }).catch((err)=>{
            console.log(err);
          });
        },
        toPage(name,id){
          sessionStorage.setItem('menuId',id);
          sessionStorage.setItem('menuName',name);
          this.$router.push({path: '/soft'});
        }
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
