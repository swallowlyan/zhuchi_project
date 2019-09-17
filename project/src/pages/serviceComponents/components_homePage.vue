<template>
  <div id="develop_homePage">
    <!--轮播图-->
    <el-row>
      <el-col :span="24">
        <el-carousel :interval="5000" indicator-position="none" arrow="always">
          <el-carousel-item v-for="(item,index) in dataImg" :key="index">
            <div class="grid-content">
              <el-row>
                <div>
                  <img :src="item.src" style="width:100%;height:100%"/>
                </div>
              </el-row>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row class="Introduction">
      <el-row>
        <h1>微服务组件</h1>
      </el-row>
      <el-row style="margin-top:50px">
        <el-col :span="20" :offset="2">
          <el-row>
            <el-col :span="5" :offset="1" v-for="(item,index) in componentList" :key="index">
              <el-card class="box-card" v-if="index<8" :body-style="{height:'245px'}">
                <el-row>
                  <router-link :to="{name:'componentsDetail',params:{'detail':item}}">
                    <img v-if="item.softIcon===''||item.softIcon===null||item.softIcon===undefined"
                        src="../../assets/common/software_logo.png" height="80" width="80">
                      <img v-if="item.softIcon!==''&&item.softIcon!==null&&item.softIcon!==undefined"
                           :src="'data:image/jpg;base64,'+item.softIcon" height="80" width="80">
                  </router-link>
                  <!-- <el-button type="text" @click="toDetail(item)">
                      <img v-if="item.softIcon===''||item.softIcon===null||item.softIcon===undefined"
                        src="../../assets/common/software_logo.png" height="80" width="80">
                      <img v-if="item.softIcon!==''&&item.softIcon!==null&&item.softIcon!==undefined"
                           :src="'data:image/jpg;base64,'+item.softIcon" height="80" width="80">
                    </el-button> -->
                </el-row>
                <h4 v-if="item.auth!=='true'">{{item.softName}}</h4>
                <el-button v-if="item.auth==='true'"
                 type="text"
                 @click="componentsDetail(item.softFunDes)"
                 style="margin:20px 25%;"
                 >{{item.softName}}</el-button>
                <el-row>
                  <el-button
                    v-if="item.auth==='false'||item.auth===undefined"
                    @click="downComponents(item.id)"
                  >立即获取</el-button>
                  <el-button
                    v-if="item.auth==='true'"
                    disabled
                  >已获取</el-button>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="tabContent">
      <el-col :span="18" :offset="3">
        <el-tabs v-model="tabName" @tab-click="tabClick">
          <!-- 设备管理 -->
          <el-tab-pane name="equipmentManagement">
            <span slot="label">
              <h1>
                <i class="fa fa-cogs" aria-hidden="true"></i>
              </h1>
              <h4>设备管理</h4>
            </span>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="4" :offset="1" v-for="(item,index) in componentList" :key="index">
                    <el-card class="box-card" :body-style="{height:'140px',padding:'10px'}">
                      <el-row>
                        <el-button type="text" @click="toDetail(item)">
                        <img :src="'data:image/jpg;base64,'+item.softIcon" width="70" height="60" />
                        </el-button>
                      </el-row>
                      <h5>{{item.softName}}</h5>
                    </el-card>
                  </el-col>
                  <el-col :span="4" :offset="1">
                    <el-card class="box-card" :body-style="{height:'140px',padding:'10px'}">
                      <el-row>
                        <h1 style="margin: 20px 0px;">
                          <i class="el-icon-plus"></i>
                        </h1>
                      </el-row>
                      <h5>查看更多</h5>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 运行维护 -->
          <el-tab-pane name="maintenance">
            <span slot="label">
              <h1>
                <i class="fa fa-wrench" aria-hidden="true"></i>
              </h1>
              <h4>运行维护</h4>
            </span>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="4" :offset="1" v-for="(item,index) in componentList" :key="index">
                    <el-card class="box-card" :body-style="{height:'140px',padding:'10px'}">
                      <el-row>
                        <el-button type="text" @click="toDetail(item)">
                        <img :src="'data:image/jpg;base64,'+item.softIcon" width="70" height="60" />
                        </el-button>
                      </el-row>
                      <h5>{{item.softName}}</h5>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 仓储物流 -->
          <el-tab-pane name="logistics">
            <span slot="label">
              <h1>
                <i class="fa fa-cubes" aria-hidden="true"></i>
              </h1>
              <h4>仓储物流</h4>
            </span>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="4" :offset="1" v-for="(item,index) in componentList" :key="index">
                    <el-card class="box-card" :body-style="{height:'140px',padding:'10px'}">
                      <el-row>
                        <el-button type="text" @click="toDetail(item)">
                        <img :src="'data:image/jpg;base64,'+item.softIcon" width="70" height="60" />
                        </el-button>
                      </el-row>
                      <h5>{{item.softName}}</h5>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 客户服务 -->
          <el-tab-pane name="service">
            <span slot="label">
              <h1>
                <i class="fa fa-user-plus" aria-hidden="true"></i>
              </h1>
              <h4>客户服务</h4>
            </span>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="4" :offset="1" v-for="(item,index) in componentList" :key="index">
                    <el-card class="box-card" :body-style="{height:'140px',padding:'10px'}">
                      <el-row>
                        <el-button type="text" @click="toDetail(item)">
                        <img :src="'data:image/jpg;base64,'+item.softIcon" width="70" height="60" />
                        </el-button>
                      </el-row>
                      <h5>{{item.softName}}</h5>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 云端应用 -->
          <el-tab-pane>
            <span slot="label" name="application">
              <h1>
                <i class="fa fa-mixcloud" aria-hidden="true"></i>
              </h1>
              <h4>云端应用</h4>
            </span>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="4" :offset="1" v-for="(item,index) in componentList" :key="index">
                    <el-card class="box-card" :body-style="{height:'140px',padding:'10px'}">
                      <el-row>
                        <el-button type="text" @click="toDetail(item)">
                        <img :src="'data:image/jpg;base64,'+item.softIcon" width="70" height="60" />
                        </el-button>
                      </el-row>
                      <h5>{{item.softName}}</h5>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "componentsHomePage",
  data() {
    return {
      username: null,
      dataImg: [
        {
          src: require("../../assets/carousel/carousel_4.png"),
          name: ""
        },
        {
          src: require("../../assets/carousel/carousel_5.png"),
          name: ""
        },
        {
          src: require("../../assets/carousel/carousel_2.jpg"),
          name: ""
        }
      ],
      componentList: [],
      tabName: "equipmentManagement",
      param: {
        current: 1,
        size: 5,
        sort: "id",
        dir: "asc"
      }
    };
  },
  mounted() {
    this.getComponents();
  },
  methods: {
    //组件列表
    getComponents() {
      if (sessionStorage.getItem("username") !== null)
        this.param.username = sessionStorage.getItem("username");
      this.param.softMenu = sessionStorage.getItem("menuId");
      this.$axios
        .post("/soft-detail/search-softs", this.param)
        .then(res => {
          this.componentList = res.data.data.records;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //立即获取
        downComponents(softId){
          if(sessionStorage.getItem("username") === null){
            this.$message({
              message: "请登录用户,进行获取",
              type: 'warning'
            });
          }else{
            let param={
              username:sessionStorage.getItem('username'),
              softId:softId
            };
            this.$axios.get('/soft-auth/soft-order',{params:param}).then((res)=>{
              this.$message({
                message: '已成功获取该服务',
                type: 'success'
              });
              this.getComponents();
            }).catch((err)=>{
              console.log(err);
            });
          }
        },
        //组件详情
        toDetail(obj){
          // this.$emit('getObj', obj);
        },
    //打开组件
    componentsDetail(roleName) {
      window.open("http://10.50.200.208:8080/login?roleName=" + roleName);
      // this.$axios
      //   .post("http://10.50.200.208:8080/login", {
      //     username: roleName,
      //     password: "123456"
      //   })
      //   .then(res => {
      //     console.info(res);
      //     window.open("http://10.50.200.208:8080/admin");
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    tabClick(tab, event) {}
  }
};
</script>

<style scoped>
.el-card__body .el-row,
.el-card__body h4 {
  text-align: center;
}
.el-card__body h4 {
  margin: 20px 0px;
}
.Introduction {
  /* background: url("../../assets/development/develop_bg1.jpg") no-repeat;
    background-size: cover; */
  padding: 50px 0px;
}
.Introduction h1 {
  font-size: 36px;
  text-align: center;
}
.Introduction .el-col-5 {
  float: left;
  margin-bottom: 20px;
}
.tabContent .el-col-4 {
  margin: 30px 10px;
  float: left;
}
.tabContent img {
  margin: 10px;
}
.tabContent h1,
.tabContent h4,
.tabContent h5 {
  text-align: center;
}
.tabContent h1 {
  font-size: 48px;
}
.tabContent h5 {
  font-weight: normal;
}
.tabContent h5 {
  font-weight: normal;
}
</style>
<style>
.el-tabs__item {
  padding: 0 50px !important;
}
.el-tabs__nav {
  margin-bottom: 20px !important;
}
.el-tabs__active-bar {
  margin-bottom: -20px !important;
}
</style>
