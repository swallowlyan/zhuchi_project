<template>
    <div class="login-panel">
      <p>用户登录</p>
      <el-input class="login-input" placeholder="请输入账号" prefix-icon="el-icon-search" v-model="name"></el-input>
      <el-input class="login-input" placeholder="请输入密码" prefix-icon="el-icon-search" type="password" v-model="passwd" @keyup.enter.native="Login"></el-input>
      <el-row>
        <el-col :span="12"><el-checkbox class="remember-password" label="记住密码"></el-checkbox></el-col>
        <a href="javascript:void(0);" @click="$goRoute('')" class="forget-href"><span class="forget-pass">忘记密码</span></a>
      </el-row>
      <div>
        <el-button class="btn-login" @click="Login"><span class="login-text">登录</span></el-button>
      </div>
      <div>
        <el-button @click="$goRoute('/login-page/sign-up/person-sign')"><span class="sign-text">注册</span></el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "LoginPanel",
      data(){
          return{
            name:'',
            passwd:''
          }
      },
      methods:{
          Login(){

            this.$axios.post("login",{
              username:this.name,
              password:this.passwd
            }).then((response)=>{
              // console.log(response.data);
              if (response.data.code === 0){
                sessionStorage.setItem('username',response.data.data.username);
                sessionStorage.setItem('uid', response.data.data.id);
                sessionStorage.setItem('userToken',response.headers.authorization);
                sessionStorage.setItem('roleId',response.data.data.roleId);
                sessionStorage.setItem('nickname',response.data.data.nickname);
                // console.log(response.data);
                if (response.data.data.roleId === 1){
                  this.$router.push('/main-page/manager/');
                } else if (response.data.data.roleId === 2) {
                  this.$router.push('/main-page/senior-user/');
                } else {
                  this.$router.push('/main-page/general-user/');
                }
              } else{
                this.$message.error(response.data.message);
              }
            })
              .catch((err)=>{
                console.log(err);
              })
          }
      }
    }
</script>

<style scoped>
p{
  color: #000000;
  font-size: xx-large;
  padding: 5%;
  /*margin: 10% auto;*/
}

  .el-input{
    width: 80%;
    margin: 3% 10%;
  }

  .remember-password{
    /*margin-left: 20%;*/
    text-align: left;
  }

  /*.forget-href{*/
    /*!*color: #000000;*!*/
    /*margin-top: -5%;*/
  /*}*/

  .el-button{
    width: 80%;
    margin-top: 3%;
  }

  .btn-login{
    background: #3a8ee6;
  }

  .forget-pass{
    font-size: 90%;
    color: black;
  }

  .login-text{
    color: white;
  }

  .sign-text{
    color: black;
  }
</style>
<style>
  .remember-password .el-checkbox__label{
    color: black;
  }
</style>
