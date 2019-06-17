<template>
    <el-card class="login-header">
      <el-row type="flex" class="header-row">
        <el-col :span="5">
          <div class="logo-name">
            <img src="../assets/u149.png"/>
            <br/>
            <p>企业软件云统一管理平台</p>
          </div>
        </el-col>
        <el-col :span="19"><h1>欢迎登录</h1></el-col>
      </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "LoginHeader"
    }
</script>

<style scoped>
h1,p{
  color: #ffffff;
}
  h1{
    border-left: #ffffff 3px solid;
    padding: 2% 10%;
  }

  p{
    font-size: large;
    font-weight: bold;
  }

  .logo-name{
    text-align: center;
  }
</style>
