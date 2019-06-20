<template>
<div id="ind_div">
    <el-container>
    <!-- 头 -->
      <el-header style="height: 90px">
        <div class="top-header">
      <a href="javascript:;">
        <img src="../assets/common/logo_zhuchi.png" alt="logo" style="float: left;margin:10px;width: 150px">
      </a>
      <span id="welcomeTitle" class="managerArea">欢迎，Admin</span>
      <div class="division"></div>
      <div class="title"><h3>工业互联网平台</h3></div>
    <div class="bg_header">
      <el-row class="menu_header">
        <el-col :span="15">
          <el-col :span="3" class="managerArea" v-for="(item) in menuList">
            <el-button  type="text" @click="toPage(item.name,item.id)">{{item.name}}</el-button></el-col>
          <!--<el-col :span="3" class="managerArea"><router-link  to="/soft" >工业软件</router-link></el-col>
          <el-col :span="3" class="managerArea"><router-link  to="/soft" >工业APP</router-link></el-col>
          <el-col :span="3" class="managerArea"><router-link  to="/soft" >机理模型</router-link></el-col>
          <el-col :span="3" class="managerArea"><router-link  to="/soft" >微服务组件</router-link></el-col>
          <el-col :span="3" class="managerArea"><router-link  to="/soft" >算法模型</router-link></el-col>
          <el-col :span="2" class="managerArea"><router-link  to="/soft" >设备</router-link></el-col>-->
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
                <router-link  to="/personal-workbench" >个人工作台</router-link></el-dropdown-item>
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
          <router-view/>
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
        menuList:[]
      }
    },
created(){
      this.getMenu();
},
    watch: {
      '$route' (to, from) {
        this.$router.go(0);
      }
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
       if(name==="首页")this.$router.push("");
       else this.$router.push({name: 'softList', params: {menuId: id,menuName:name}})
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
.menu_header>div{
  margin: 6px;
  text-align: center;
}
.menu_header button{
  color:#ffffff;
  padding:0px;
}
.dropMenu a{color: #606266}

</style>
