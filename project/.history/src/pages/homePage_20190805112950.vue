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
        <img src="../assets/common/logo_zhuchi.png" style="margin: 20px">
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
      <el-col :span=18  :offset="3">
        <el-row class="show_line">
      <el-col :span=6 class="application_bg">
        <h3>热门应用</h3>
        <h3>APPLICATION</h3>
      </el-col>
      <el-col :span=18 >
        <el-row>
           <el-col :span=4 v-for="(item, index) in demo_img" :key="index">
            <img :src=item.src height="80" width="80"/>
            <h4>CATIA</h4>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=4 v-for="(item, index) in demo_img" :key="index">
            <img :src=item.src height="80" width="80"/>
            <h4>CATIA</h4>
          </el-col>
        </el-row>
      </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--<el-divider><h1>工业软件</h1></el-divider>
     <el-row>
      <el-col :span="12" :offset="6">
        <swiper :options="swiperOption" v-if="soft2_img.length!=0">
          <swiper-slide v-for="(item,index) in soft2_img" :key="index">
            <el-col :md="24">
              <div :style="{background:'url('+item.src+') no-repeat'}"
                   style="cursor: pointer;height:400px" @click="toDetail(softList[index],'工业软件',1)">
                <div v-if="softList[index]!==undefined">
                  <div class="carousel_icon">
                    <img v-if="softList[index].softIcon===undefined||softList[index].softIcon===null||softList[index].softIcon===''"
                         src="../assets/common/logo_zhuchi.png" height="80" width="80">
                    <img v-if="softList[index].softIcon!==undefined&&softList[index].softIcon!==null&&softList[index].softIcon!==''"
                         :src="'data:image/jpg;base64,'+softList[index].softIcon" height="80" width="80">
                  </div>
                  <div class="carousel_title">
                    <h2>{{softList[index].softName}}</h2>
                  </div>
                </div>
              </div>
            </el-col>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </el-col>
      <el-col :span="2">
        <el-button type="text" @click="toPage('工业软件','1')"
                    style="margin-top: 300px;margin-left: 30px">查看更多</el-button>
      </el-col>
    </el-row>
    <el-divider><h1>工业APP</h1></el-divider>
    <el-row>
      <el-col :span="12" :offset="6">
        <swiper :options="swiperOption" v-if="soft2_img.length!=0">
          <swiper-slide v-for="(item,index) in soft2_img" :key="index">
            <el-col :md="24">
              <div :style="{background:'url('+item.src+') no-repeat'}"
                   style="cursor: pointer;height:400px" @click="toDetail(appList[index],'工业APP',2)">
                <div v-if="appList[index]!==undefined">
                  <div class="carousel_icon">
                    <img v-if="appList[index].softIcon===undefined||appList[index].softIcon===null||appList[index].softIcon===''"
                         src="../assets/common/logo_zhuchi.png" height="80" width="80">
                    <img v-if="appList[index].softIcon!==undefined&&appList[index].softIcon!==null&&appList[index].softIcon!==''"
                         :src="'data:image/jpg;base64,'+appList[index].softIcon" height="80" width="80">
                  </div>
                  <div class="carousel_title">
                    <h2>{{appList[index].softName}}</h2>
                  </div>
                </div>
              </div>
            </el-col>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </el-col>
      <el-col :span="2">
        <el-button type="text" @click="toPage('工业APP','2')"
                   style="margin-top: 300px;margin-left: 30px">查看更多</el-button>
      </el-col>
    </el-row>
    <el-divider><h1>工业资源</h1></el-divider>
    <el-row> 
      <el-col :span="12" :offset="6">
        <swiper :options="swiperOption" v-if="soft2_img.length!=0">
          <swiper-slide v-for="(item,index) in soft2_img" :key="index">
            <el-col :md="24">
              <div :style="{background:'url('+item.src+') no-repeat'}"
                   style="cursor: pointer;height:400px" @click="toDetail(resourceList[index],'机理模型',3)">
                <div v-if="resourceList[index]!==undefined">
                  <div class="carousel_icon">
                    <img v-if="resourceList[index].softIcon===undefined||resourceList[index].softIcon===null||resourceList[index].softIcon===''"
                         src="../assets/common/logo_zhuchi.png" height="80" width="80">
                    <img v-if="resourceList[index].softIcon!==undefined&&resourceList[index].softIcon!==null&&resourceList[index].softIcon!==''"
                         :src="'data:image/jpg;base64,'+resourceList[index].softIcon" height="80" width="80">
                  </div>
                  <div class="carousel_title">
                    <h2>{{resourceList[index].softName}}</h2>
                  </div>
                </div>
              </div>
            </el-col>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </el-col>
      <el-col :span="2">
        <el-button type="text" @click="toPage('机理模型','3')"
                   style="margin-top: 300px;margin-left: 30px">查看更多</el-button>
      </el-col>
    </el-row>-->
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
            dataImg: [{
              src: require("../assets/carousel/carousel_1.jpg"),
              name: ""
            },
              {
                src: require("../assets/carousel/carousel_2.jpg"),
                name: ""
              },
              {
                src: require("../assets/carousel/carousel_3.jpg"),
                name: ""
              }],
            soft1_img: [
              {
                src: require("../assets/soft1_img/v2_ptbrfu.jpg"),
                name: ""
              },
              {
                src: require("../assets/soft1_img/v2_ptdms6.jpg"),
                name: ""
              },
              {
                src: require("../assets/soft1_img/v2_ptdmsa.jpg"),
                name: ""
              },
              {
                src: require("../assets/soft1_img/v2_ptdmsr.jpg"),
                name: ""
              },
              {
                src: require("../assets/soft1_img/v2_ptdmt8.jpg"),
                name: ""
              }
            ],
            soft2_img: [{
              src: require("../assets/soft2_img/v2_pt674w.jpg"),
              name: ""
            },
              {
                src: require("../assets/soft2_img/v2_pt675f.jpg"),
                name: ""
              },
              {
                src: require("../assets/soft2_img/v2_pt675i.jpg"),
                name: ""
              },
              {
                src: require("../assets/soft2_img/v2_pt675s.jpg"),
                name: ""
              },
              {
                src: require("../assets/soft2_img/v2_pt677p.jpg"),
                name: ""
              }],
              demo_img:[
                {src: require("../assets/soft/soft_demo.jpg")},
                {src: require("../assets/soft/soft_demo.jpg")},
                {src: require("../assets/soft/soft_demo.jpg")},
                {src: require("../assets/soft/soft_demo.jpg")},
                {src: require("../assets/soft/soft_demo.jpg")},
                {src: require("../assets/soft/soft_demo.jpg")}
              ],
            softCount: 0,
            serviceCount: 0,
            appCount: 0,
            userCount: 0,
            developCount: 0,
            algorithmCount: 0,
            ///////////////////////////
            swiperOption: {
              slidesPerView: 3,
              spaceBetween: 30,
              freeMode: true,
              //loop: true,
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
              autoplay: {
                delay: 1500,
                disableOnInteraction: false
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              breakpoints: {
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10
                }
              }
            },
          }
      },
      mounted(){
        this.getHomePageData();
        this.getSoft();this.getAppSoft();this.getResourceSoft();
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
        },
        //查找软件
        getSoft(){
          this.$axios.post('/soft-detail/search-softs',{softMenu:1}).then((res)=>{
            this.softList=res.data.data.records;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getAppSoft(){
          this.$axios.post('/soft-detail/search-softs',{softMenu:2}).then((res)=>{
            this.appList=res.data.data.records;
          }).catch((err)=>{
            console.log(err);
          });
        },
        getResourceSoft(){
          this.$axios.post('/soft-detail/search-softs',{softMenu:3}).then((res)=>{
            this.resourceList=res.data.data.records;
          }).catch((err)=>{
            console.log(err);
          });
        },
        toDetail(obj,name,id){
          obj.nemuName=name;
          obj.nemuId=id;
          this.$emit('toDetail', obj);
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
  .carousel_icon{
    margin: 0 auto;
    width: 80px;
    padding-top: 80px;
    }
  .carousel_title{text-align: center;color: #ffffff}
  .application_bg{
    background-image: url("../assets/index/application_bg.jpg")
  }
  .show_line{min-height: 150px}
</style>
