<template>
    <div class="sign-up" style="min-height: 900px">
      <!--<el-tabs v-model="signTab" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户注册" name="user">用户注册</el-tab-pane>
        <el-tab-pane label="企业注册" name="enterprise">配置管理</el-tab-pane>
      </el-tabs>-->
      <ul class="tab">
        <li><a class="choice" href="javascript:void(0);" @click="$goRoute('/login-page/sign-up/person-sign')">个人注册</a></li>
        <li><a class="choice" id="second" href="javascript:void(0);" @click="$goRoute('/login-page/sign-up/enterprise-sign')">企业注册</a></li>
      </ul>
      <router-view/>
    </div>
</template>

<script>
    export default {
        name: "SignUp",
      data(){
          return{
            signTab:"user"
          }
      }
    }
</script>

<style scoped>
  li{
    display: inline-block;
    background-color: #ffffff;
    padding: 1% 2%;
  }

  .tab{
    margin-left: 25%;
    margin-top: 10%;
  }

  .choice{
    color: #000000;
  }

  .sign-up{
    height: 100%;
    padding-bottom: 3%;
  }
</style>
