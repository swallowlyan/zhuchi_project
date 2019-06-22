<template>
<div id="ind_div">
    <el-container>
    <!-- 头 -->
      <el-header style="height: 90px">
        <div class="top-header">
          <router-link :to="{path:'/homePage'}">
        <img src="../assets/common/logo_zhuchi.png" alt="logo" style="float: left;margin:10px;width: 150px">
          </router-link>
      <span id="welcomeTitle" class="managerArea">欢迎，Admin</span>
      <div class="division"></div>
      <div class="title"><h3>工业互联网平台</h3></div>
    <div class="bg_header">
      <el-row style="margin: 0px">
        <el-col :span="15" style="margin-top: 8px">
          <el-col :span="3" class="managerArea" v-for="(item) in menuList">
            <el-button  type="text" @click="toPage(item.name,item.id)">{{item.name}}</el-button></el-col>
        </el-col>
        <el-col :span="1" class="managerArea"  style="float: right;">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link" style="margin-right: 0px;font-size: 25px;color: #ffffff">
        <i class="el-icon-s-unfold"></i>
      </span>
            <el-dropdown-menu slot="dropdown" class="dropMenu">
              <el-dropdown-item icon="el-icon-circle-check-outline">资源库首页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">我的订单</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">
                <router-link  to="/homePage/personal-workbench">个人工作台</router-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">
                <router-link  to="/homePage/enterprise-workbench">企业工作台</router-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">设置中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check-outline">
                <router-link :to="{path:'/'}">
                  注销
                </router-link>
                </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
    </el-row>
      </div>
        </div>
      </el-header>
    <!-- 身体 -->
      <el-main style="padding: 0px 20px">
          <router-view :getIfPerson="getIfPerson" :menuName="menuName" :menuId_pro="menuId_pro"  ref="listPage"/>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: "Ind",
    components:{},
  data(){
      return{
        menuList:[],
        menuName:"",
        menuId_pro:"",
        ifPerson:true
      }
    },
    mounted(){
      this.getMenu();
},
    methods:{
     getMenu(){
       this.$axios.get('/menu/list-all').then((res)=>{
         if(res.data.data.length>0)this.menuList=res.data.data;
       }).catch((err)=>{
         console.log(err);
       });
     },
      toPage(name,id){
       this.menuName=name;this.menuId_pro=id;
       if(name==="首页")this.$router.push("/homePage");
       else {
         if(this.$route.path.indexOf("soft")>-1&&this.$route.path.indexOf("Detail")<0){
           this.$refs.listPage.initPage(id);
         }else{
           this.$router.push({path: '/homePage/soft'});
         }
       }
      },
      getIfPerson(val){
       this.ifPerson=val;
      }
    },
  }
</script>

<style scoped>
#ind_div{
  background-size: cover;
  height: 100%;
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
.bg_header>div{
  margin: 6px;
  text-align: center;
}
.bg_header button{
  color:#ffffff;
  padding:0px;
}
.dropMenu a{color: #606266}

</style>
