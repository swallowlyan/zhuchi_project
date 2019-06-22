<template>
  <div class="login-page">
    <el-row>
      <el-col :span="6" :offset="12" style="margin-top:50px;margin-bottom: 50px">
        <el-card class="box-card">
          <el-tabs v-model="activeName">
            <el-tab-pane label="个人用户登录" name="userLogin">
              <el-form :model="userForm" :rules="formRule" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="userForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                  <el-input v-model="userForm.verificationCode" placeholder="请输入验证码"></el-input>
                </el-form-item>
              </el-form>
              <el-row><el-col :span="13" :offset="5">
                <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
              </el-col>
              </el-row>
                <el-row><el-col :span="13" :offset="5">
                  <router-link  to="/register" ><el-button>立即注册</el-button></router-link>
                </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="企业用户登录" name="enterpriseLogin">
              <el-form :model="enterpriseForm" :rules="formRule" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="enterpriseForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="enterpriseForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                  <el-input v-model="enterpriseForm.verificationCode" placeholder="请输入验证码"></el-input>
                </el-form-item>
              </el-form>
              <el-row><el-col :span="13" :offset="5">
                <el-button type="primary" @click="submitForm('enterpriseForm')">登录</el-button>
              </el-col>
              </el-row>
              <el-row><el-col :span="13" :offset="5">
                <router-link  to="/register" ><el-button>立即注册</el-button></router-link>
              </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "LoginPage",
    data() {
      return {
        activeName: "userLogin",
        userForm: {
          username: "",
          password: "",
          verificationCode: ""
        },
        enterpriseForm: {
          username: "",
          password: "",
          verificationCode: ""
        },
        formRule: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          verificationCode: [{required: true, message: '请输入验证码', trigger: 'blur'}],
        }
      }
    },
    methods: {
      submitForm(form) {
            let param={};
            if(form==="userForm"){//用户登录
              param=this.userForm;
            }else{//企业
              param=this.enterpriseForm;
            }
            this.$axios.post("login", param).then((response) => {
              let ifPerson=true;
              if (response.data.code === 0) {
                //个人用户
                sessionStorage.setItem('username',param.username);
                if(response.data.data!==null){//企业用户
                  sessionStorage.setItem('roleId',response.data.data.roleId);
                  sessionStorage.setItem('enterpriseId',response.data.data.id);
                }
                this.$router.push('/homePage');
               /* if (response.data.data.roleId === 1) {
                  this.$router.push('/');
                } else if (response.data.data.roleId === 2) {
                  this.$router.push('/');
                } else {
                  this.$router.push('/homePage');
                }*/

              } else {
                this.$message.error(response.data.message);
              }
            })
              .catch((err) => {
                console.log(err);
              })

      }
    }
  }
</script>

<style scoped>
  .login-page{
    width:100%;
    height:100%;
    background-size:100% 100%;
    background: url("../assets/login_bg.jpg");
  }
  .box-card{background-color: #ffffff}
  .el-row button{width: 100%;margin: 10px 0px}
  .managerArea{display: none}
</style>
<style>

</style>
